import { auth } from '@/config/firebaseConfig';
import { FirebaseError, LoginCredentials, SerializableUser } from '@/types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
} from 'firebase/auth';
import { SignupCredentials } from '@/types/auth';
import { setAuthCookies, clearAuthCookies } from '@/lib/cookies';
import { serializeUser } from '@/lib/userSerializer';
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

export const loginWithEmail = createAsyncThunk<SerializableUser, LoginCredentials, { rejectValue: string }>(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Sanitize inputs
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      
      // Get the access token and set cookies
      const accessToken = await userCredential.user.getIdToken();
      await setAuthCookies(userCredential.user, accessToken);
      
      return serializeUser(userCredential.user);
    } catch (error: any) {
      return rejectWithValue(mapFirebaseError(error));
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
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      // Get the access token and set cookies
      const accessToken = await userCredential.user.getIdToken();
      await setAuthCookies(userCredential.user, accessToken);
      
      return serializeUser(userCredential.user);
    } catch (error: any) {
      return rejectWithValue(mapFirebaseError(error));
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
      
      return serializeUser(userCredential.user);
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
      
      return serializeUser(userCredential.user);
    } catch (error: any) {
      return rejectWithValue(mapFirebaseError(error));
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      await clearAuthCookies();
    } catch (error: any) {
      return rejectWithValue(mapFirebaseError(error));
    }
  }
);