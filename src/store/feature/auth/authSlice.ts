import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginWithEmail, signupWithEmail, loginWithGoogle, loginWithGithub, logout, refreshAuthToken, verifyEmail, resendVerification, restoreAuthState } from './authThunks';
import { AuthState, User } from '@/types/api';
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
      state.user = action.payload ? action.payload : null;
      state.isAuthenticated = action.payload !== null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },

  },
  extraReducers: (builder) => {
    // Common reducer logic for pending, fulfilled, and rejected states
    const handlePending = (state: AuthState) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state: AuthState, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    };

    const handleVoidFulfilled = (state: AuthState) => {
      state.loading = false;
      state.error = null;
    };

    const handleRejected = (state: AuthState, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload || 'An unexpected error occurred.';
    };

    // Login with email
    builder
      .addCase(loginWithEmail.pending, handlePending)
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        console.log('✅ Login successful');
      })
      .addCase(loginWithEmail.rejected, handleRejected);

    // Signup with email
    builder
      .addCase(signupWithEmail.pending, handlePending)
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // For signup, we don't set user or isAuthenticated since it's just OTP verification
        // The OTP response is handled by the component
        console.log('✅ Signup successful - OTP sent');
      })
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
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        console.log('✅ Logout successful:', action.payload.message);
      })
      .addCase(logout.rejected, handleRejected);

    // Refresh token
    builder
      .addCase(refreshAuthToken.pending, handlePending)
      .addCase(refreshAuthToken.fulfilled, handleFulfilled)
      .addCase(refreshAuthToken.rejected, handleRejected);

    // Email verification
    builder
      .addCase(verifyEmail.pending, handlePending)
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        console.log('✅ Email verification successful - user authenticated');
      })
      .addCase(verifyEmail.rejected, handleRejected)
      .addCase(resendVerification.pending, handlePending)
      .addCase(resendVerification.fulfilled, handleVoidFulfilled)
      .addCase(resendVerification.rejected, handleRejected);

    // Restore auth state
    builder
      .addCase(restoreAuthState.pending, handlePending)
      .addCase(restoreAuthState.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // User data was successfully restored
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
          console.log('✅ Auth state restored successfully');
        } else {
          // No user data to restore (user not logged in)
          state.user = null;
          state.isAuthenticated = false;
          state.error = null;
          console.log('🔐 No auth state to restore');
        }
      })
      .addCase(restoreAuthState.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || 'Failed to restore auth state';
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;