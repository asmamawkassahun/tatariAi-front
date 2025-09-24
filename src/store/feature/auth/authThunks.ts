import { auth } from '@/config/firebaseConfig';
import { FirebaseError, LoginCredentials, SerializableUser } from '@/types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
} from 'firebase/auth';
import { SignupCredentials } from '@/types/auth';
import { setAuthCookies, clearAuthCookies } from '@/lib/cookies';
import { setAuthMethod } from './authSlice';
import { serializeUser } from '@/lib/userSerializer';
import { authService } from '@/services/authService';
import { LoginRequest, SignupRequest, AuthResponse, User as ApiUser, VerifyEmailRequest, ResendVerificationRequest } from '@/types/api';
import { setUserToken, setRefreshToken, getUserToken, isAuthenticatedSync } from '@/lib/authToken';
// Helper function to map Firebase errors to user-friendly messages
const mapFirebaseError = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'Invalid email format.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

// Helper function to map API errors to user-friendly messages
const mapApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred.';
};

// Helper function to convert API user to SerializableUser
const convertApiUserToSerializableUser = (apiUser: any): SerializableUser => {
  return {
    uid: apiUser.id,
    email: apiUser.email,
    displayName: apiUser.username || `${apiUser.firstName || ''} ${apiUser.lastName || ''}`.trim() || apiUser.email,
    photoURL: apiUser.photoUrl || null,
    emailVerified: true, // Assuming verified if they can login
    isAnonymous: false,
    metadata: {
      creationTime: apiUser.createdAt,
      lastSignInTime: apiUser.authDate || apiUser.updatedAt,
    },
  };
};

export const loginWithEmail = createAsyncThunk<SerializableUser, LoginCredentials, { rejectValue: string }>(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Sanitize inputs
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      const loginData: LoginRequest = {
        email: email.trim(),
        password,
      };

      const response = await authService.signin(loginData);
      
      // Store the tokens
      if (response.accessToken) {
        setUserToken(response.accessToken);
      }
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }
      
      const serializableUser = convertApiUserToSerializableUser(response.user);
      // Mark this as API authentication
      (serializableUser as any).authMethod = 'api';
      
      console.log('🔐 API Login successful:', {
        user: serializableUser,
        authMethod: 'api',
        hasTokens: {
          accessToken: !!response.accessToken,
          refreshToken: !!response.refreshToken
        }
      });
      
      return serializableUser;
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const signupWithEmail = createAsyncThunk<SerializableUser, SignupCredentials, { rejectValue: string }>(
  'auth/signupWithEmail',
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      const signupData: SignupRequest = {
        email: email.trim(),
        password,
        firstName: 'User', // Default values - you might want to add these to the form
        lastName: 'Name',
      };

      const response = await authService.signup(signupData);
      
      // Store the tokens
      if (response.accessToken) {
        setUserToken(response.accessToken);
      }
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }
      
      const serializableUser = convertApiUserToSerializableUser(response.user);
      // Mark this as API authentication
      (serializableUser as any).authMethod = 'api';
      return serializableUser;
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const loginWithGoogle = createAsyncThunk<SerializableUser, void, { rejectValue: string }>(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Get the access token and set cookies
      const accessToken = await userCredential.user.getIdToken();
      await setAuthCookies(userCredential.user, accessToken);
      
      const serializableUser = serializeUser(userCredential.user);
      // Mark this as Firebase authentication
      (serializableUser as any).authMethod = 'firebase';
      return serializableUser;
    } catch (error: any) {
      return rejectWithValue(mapFirebaseError(error));
    }
  }
);

export const loginWithGithub = createAsyncThunk<SerializableUser, void, { rejectValue: string }>(
  'auth/loginWithGithub',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Get the access token and set cookies
      const accessToken = await userCredential.user.getIdToken();
      await setAuthCookies(userCredential.user, accessToken);
      
      const serializableUser = serializeUser(userCredential.user);
      // Mark this as Firebase authentication
      (serializableUser as any).authMethod = 'firebase';
      return serializableUser;
    } catch (error: any) {
      return rejectWithValue(mapFirebaseError(error));
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get current state to determine auth method
      const state = getState() as any;
      const currentUser = state.auth?.user;
      const authMethod = state.auth?.authMethod;
      
      console.log('🔐 Logout initiated. Auth method:', authMethod);
      console.log('🔐 Current user:', currentUser);

      // Determine logout method based on auth method or token presence
      const hasApiToken = typeof window !== 'undefined' && (
        localStorage.getItem('authToken') || 
        document.cookie.includes('authToken=')
      );

      if (authMethod === 'firebase' || (currentUser?.uid && !hasApiToken)) {
        // Firebase authentication - use Firebase logout
        console.log('🔐 Logging out via Firebase');
        try {
          await signOut(auth);
          console.log('✅ Firebase logout successful');
        } catch (firebaseError) {
          console.warn('Firebase logout failed:', firebaseError);
        }
        await clearAuthCookies();
        
      } else if (authMethod === 'api' || hasApiToken) {
        // Email/Password authentication - use API logout
        console.log('🔐 Logging out via API');
        try {
          await authService.logout();
          console.log('✅ API logout successful');
        } catch (apiError) {
          console.warn('API logout failed, but continuing with local cleanup:', apiError);
        }
        
        // Clear local tokens and cookies
        setUserToken(null);
        await clearAuthCookies();
        
      } else {
        // Fallback - just clear local data
        console.log('🔐 Clearing local auth data (fallback)');
        setUserToken(null);
        await clearAuthCookies();
      }
      
      console.log('✅ Logout completed successfully');
      
    } catch (error: any) {
      console.error('❌ Logout error:', error);
      
      // Always clear local tokens even if logout fails
      setUserToken(null);
      await clearAuthCookies();
      
      // Only return error if it's a critical failure that prevents logout
      if (error.code === 'auth/network-request-failed') {
        return rejectWithValue('Network error during logout. Please try again.');
      }
      
      // For other errors, we still want to clear local data
      // but don't show error to user since logout should succeed
      console.log('⚠️ Logout completed with errors, but local data cleared');
    }
  }
);

// Thunk to restore auth state from stored tokens
export const restoreAuthState = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/restoreAuthState',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const hasApiToken = isAuthenticatedSync();
      
      if (hasApiToken) {
        console.log('🔐 Restoring API auth state from stored tokens');
        // Set auth method to API
        dispatch(setAuthMethod('api'));
      } else {
        console.log('🔐 No API tokens found, auth state will be handled by Firebase');
      }
    } catch (error: any) {
      console.warn('Error restoring auth state:', error);
      return rejectWithValue('Failed to restore auth state');
    }
  }
);

// Email verification thunks
export const verifyEmail = createAsyncThunk<void, VerifyEmailRequest, { rejectValue: string }>(
  'auth/verifyEmail',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
     const res= await authService.verifyEmail({ email, otp });
     console.log('✅ Email verified successfully', res);
      console.log('✅ Email verified successfully');
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const resendVerification = createAsyncThunk<void, ResendVerificationRequest, { rejectValue: string }>(
  'auth/resendVerification',
  async ({ email }, { rejectWithValue }) => {
    try {
      await authService.resendVerification({ email });
      console.log('✅ Verification email resent successfully');
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);