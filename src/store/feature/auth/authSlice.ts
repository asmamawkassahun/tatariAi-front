import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { loginWithEmail, signupWithEmail, loginWithGoogle, loginWithGithub, logout } from './authThunks';
import { AuthState, SerializableUser } from '@/types/auth';
import { serializeUser } from '@/lib/userSerializer';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload ? serializeUser(action.payload) : null;
      state.isAuthenticated = action.payload !== null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Common reducer logic for pending, fulfilled, and rejected states
    const handlePending = (state: AuthState) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state: AuthState, action: PayloadAction<SerializableUser>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    };

    const handleRejected = (state: AuthState, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload || 'An unexpected error occurred.';
    };

    // Login with email
    builder
      .addCase(loginWithEmail.pending, handlePending)
      .addCase(loginWithEmail.fulfilled, handleFulfilled)
      .addCase(loginWithEmail.rejected, handleRejected);

    // Signup with email
    builder
      .addCase(signupWithEmail.pending, handlePending)
      .addCase(signupWithEmail.fulfilled, handleFulfilled)
      .addCase(signupWithEmail.rejected, handleRejected);

    // Login with Google
    builder
      .addCase(loginWithGoogle.pending, handlePending)
      .addCase(loginWithGoogle.fulfilled, handleFulfilled)
      .addCase(loginWithGoogle.rejected, handleRejected);

    // Login with Github
    builder
      .addCase(loginWithGithub.pending, handlePending)
      .addCase(loginWithGithub.fulfilled, handleFulfilled)
      .addCase(loginWithGithub.rejected, handleRejected);

    // Logout
    builder
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, handleRejected);
  },
});

export const { setUser, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;