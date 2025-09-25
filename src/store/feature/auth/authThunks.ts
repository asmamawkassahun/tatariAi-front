import { auth } from '@/config/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { clearAuthCookies } from '@/lib/cookies';
import { authService } from '@/services/authService';
import { LoginRequest, SignupRequest, VerifyEmailRequest, ResendVerificationRequest, GoogleSigninRequest, User, AuthResponse, emailPasswordSignUpResponse } from '@/types/api';
import { setUserToken, setRefreshToken, getRefreshToken, isAuthenticatedSync, clearAllUserData } from '@/lib/authToken';
import { getUserData, validateStoredUserData, clearUserData as clearStoredUserData, storeUserData } from '@/lib/userStorage';

// Type definitions
interface LogoutStep {
  name: string;
  action: () => Promise<void>;
  required: boolean;
}

interface LogoutResult {
  step: string;
  success: boolean;
  error: string | null;
}

// Helper function to map Firebase errors to user-friendly messages

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

// Helper to map AuthResponse user to User type
const mapAuthUserToUser = (authUser: AuthResponse['data']['user']): User => ({
  id: authUser.id,
  email: authUser.email,
  firstName: authUser.firstName,
  lastName: authUser.lastName,
  photoUrl: authUser.photoUrl,
  createdAt: authUser?.createdAt || '',
  updatedAt: authUser?.updatedAt || '',
});

// Helper function to perform comprehensive logout cleanup
const performLogoutCleanup = async (): Promise<void> => {
  const cleanupSteps: LogoutStep[] = [
    {
      name: 'Firebase signOut',
      action: async () => {
        await firebaseSignOut(auth);
      },
      required: false
    },
    {
      name: 'Clear authentication tokens',
      action: async () => {
        setUserToken(null);
        setRefreshToken(null);
      },
      required: true
    },
    {
      name: 'Clear cookies',
      action: async () => {
        await clearAuthCookies();
      },
      required: true
    },
    {
      name: 'Clear all user data',
      action: async () => {
        clearAllUserData(); // Clear tokens and cookies
        clearStoredUserData(); // Clear secure user data storage
      },
      required: true
    }
  ];

  const results: LogoutResult[] = [];

  for (const step of cleanupSteps) {
    try {
      await step.action();
      console.log(`✅ ${step.name} successful`);
      results.push({ step: step.name, success: true, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`⚠️ ${step.name} failed:`, errorMessage);
      results.push({ step: step.name, success: false, error: errorMessage });

      if (step.required) {
        throw new Error(`Critical logout step failed: ${step.name} - ${errorMessage}`);
      }
    }
  }

  // Log summary of logout process
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`🎉 Logout process completed: ${successful} successful, ${failed} failed`);
};

export const loginWithEmail = createAsyncThunk<{ user: User; message: string }, LoginRequest, { rejectValue: string }>(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      const loginData: LoginRequest = {
        email: email.trim(),
        password,
      };

      const response = await authService.signin(loginData);
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      setUserToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);

      // Return both user data and API message
      return {
        user: mapAuthUserToUser(response.data.user),
        message: response.message
      };
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);


export const signupWithEmail = createAsyncThunk<emailPasswordSignUpResponse, SignupRequest, { rejectValue: string }>(
  'auth/signupWithEmail',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      if (!email || !password || !firstName || !lastName) {
        throw new Error('Email, password, first name, and last name are required.');
      }

      const signupData: SignupRequest = {
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };

      const response = await authService.signup(signupData);

      // For email/password signup, we expect an OTP response, not user authentication
      if (!response.success) {
        throw new Error(response.message || 'Signup failed');
      }

      // Return the OTP response for email verification
      return {
        success: response.success,
        message: response.message,
        data: {
          message: response.data.message,
          otp: response.data.otp,
          email: email.trim() // Include email for verification step
        }
      };
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const loginWithGoogle = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      const googleSigninData: GoogleSigninRequest = {
        idToken,
        userType: 'client',
      };

      const response = await authService.googleSignin(googleSigninData);
      console.log("Google sign-in response", JSON.stringify(response, null, 2));

      if (!response.success) {
        throw new Error(response.message || 'Google sign-in failed');
      }

      setUserToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      return mapAuthUserToUser(response.data.user);
    } catch (error: any) {
      console.error("google sign-in failed", error);
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const loginWithGithub = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/loginWithGithub',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      const response = await authService.socialLogin('github', idToken);
      if (!response.success) {
        throw new Error(response.message || 'GitHub sign-in failed');
      }

      setUserToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      return mapAuthUserToUser(response.data.user);
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const logout = createAsyncThunk<{ message: string }, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🚪 Starting logout process...');

      // STEP 1: Call server logout API FIRST (before clearing any user data)
      console.log('📡 Calling server logout API...');
      const response = await authService.logout();
      const logoutMessage = response.message || 'Logged out successfully';
      console.log('✅ Server logout successful:', logoutMessage);

      // STEP 2: Now clear all local user data after successful server logout
      console.log('🧹 Clearing local user data...');
      await performLogoutCleanup();

      console.log('🎉 Logout process completed successfully');
      return { message: logoutMessage };
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete logout process';
      console.error('❌ Logout failed:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const refreshAuthToken = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/refreshAuthToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken(refreshToken);
      if (!response.success) {
        throw new Error(response.message || 'Token refresh failed');
      }

      setUserToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      return mapAuthUserToUser(response.data.user);
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const restoreAuthState = createAsyncThunk<User | null, void, { rejectValue: string }>(
  'auth/restoreAuthState',
  async (_, { rejectWithValue }) => {
    try {
      const hasApiToken = isAuthenticatedSync();

      if (!hasApiToken) {
        // No tokens found - this is normal for unauthenticated users
        // Don't throw an error, just return (user is not logged in)
        console.log('🔐 No authentication tokens found - user not logged in');
        return null;
      }

      // If we have tokens, try to restore user data from secure storage
      console.log('🔐 Authentication tokens found - attempting to restore user data');

      // Validate stored user data
      if (!validateStoredUserData()) {
        console.log('🔐 Stored user data is invalid or corrupted');
        return null;
      }

      // Get user data from secure storage
      const storedUserData = getUserData();
      if (!storedUserData) {
        console.log('🔐 No valid user data found in storage');
        return null;
      }

      // Convert SafeUserData back to User type for Redux
      const restoredUser: User = {
        id: storedUserData.id,
        email: storedUserData.email,
        firstName: storedUserData.firstName,
        lastName: storedUserData.lastName,
        photoUrl: storedUserData.photoUrl,
        createdAt: storedUserData.createdAt,
        updatedAt: storedUserData.updatedAt,
      };

      console.log('✅ User data restored successfully from storage');
      return restoredUser;

    } catch (error: any) {
      console.warn('Failed to restore auth state:', error);
      // Don't reject for restore failures - just log and continue
      // This prevents the app from breaking if there are token issues
      return null;
    }
  }
);

export const verifyEmail = createAsyncThunk<{ user: User; message: string }, VerifyEmailRequest, { rejectValue: string }>(
  'auth/verifyEmail',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail({ email, otp });
      if (!response.success) {
        throw new Error(response.message || 'Email verification failed');
      }

      // Email verification successful - user is automatically authenticated
      console.log('✅ Email verification successful - user authenticated');

      // Return both user data and API message
      return {
        user: mapAuthUserToUser(response.data.user),
        message: response.message
      };

    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const resendVerification = createAsyncThunk<void, ResendVerificationRequest, { rejectValue: string }>(
  'auth/resendVerification',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await authService.resendVerification({ email });
      if (!response.success) {
        throw new Error(response.message || 'Resend verification failed');
      }
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);