import { auth } from '@/config/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { clearAuthCookies } from '@/lib/cookies';
import { authService } from '@/services/authService';
import { LoginRequest, SignupRequest, VerifyEmailRequest, ResendVerificationRequest, GoogleSigninRequest, User, AuthResponse } from '@/types/api';
import { setUserToken, setRefreshToken, getRefreshToken, isAuthenticatedSync } from '@/lib/authToken';
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

export const loginWithEmail = createAsyncThunk<User, LoginRequest, { rejectValue: string }>(
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
      return mapAuthUserToUser(response.data.user);
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);


export const signupWithEmail = createAsyncThunk<User, SignupRequest, { rejectValue: string }>(
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
      if (!response.success) {
        throw new Error(response.message || 'Signup failed');
      }

      setUserToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      return mapAuthUserToUser(response.data.user);
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
      if (!response.success) {
        throw new Error(response.message || 'Google sign-in failed');
      }

      setUserToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      return mapAuthUserToUser(response.data.user);
    } catch (error: any) {
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

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (apiError) {
      console.warn('API logout failed, continuing with local cleanup:', apiError);
    }

    try {
      setUserToken(null);
      setRefreshToken(null);
      await clearAuthCookies();
    } catch (error: any) {
      return rejectWithValue('Failed to clear authentication data');
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

export const restoreAuthState = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/restoreAuthState',
  async (_, { rejectWithValue }) => {
    try {
      const hasApiToken = isAuthenticatedSync();
      if (!hasApiToken) {
        throw new Error('No valid tokens found');
      }
      // Assume auth state is restored in Redux via token presence
    } catch (error: any) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

export const verifyEmail = createAsyncThunk<void, VerifyEmailRequest, { rejectValue: string }>(
  'auth/verifyEmail',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail({ email, otp });
      if (!response.success) {
        throw new Error(response.message || 'Email verification failed');
      }
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