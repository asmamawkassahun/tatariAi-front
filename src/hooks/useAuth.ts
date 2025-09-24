import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { setUser, setLoading } from '../store/feature/auth/authSlice';
import { restoreAuthState } from '../store/feature/auth/authThunks';
import { useTypedSelector } from './useTypedSelector';
import { getUserToken, isAuthenticatedSync } from '../lib/authToken';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated, authMethod } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔐 Firebase auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
      
      // Only update Firebase auth if we don't have an API auth session
      const hasApiToken = isAuthenticatedSync();
      if (!hasApiToken) {
        dispatch(setUser(firebaseUser));
        dispatch(setLoading(false));
      } else {
        console.log('🔐 API auth session detected, not overriding with Firebase state');
      }
    });

    // Also check for API authentication on mount
    const checkApiAuth = async () => {
      try {
        const hasApiToken = isAuthenticatedSync();
        const apiToken = await getUserToken();
        
        console.log('🔐 Checking API auth on mount:', { hasApiToken, hasToken: !!apiToken });
        
        // If we have an API token but no Firebase user, we need to restore the auth state
        if (hasApiToken && apiToken) {
          console.log('🔐 API token found. This might be an API login session.');
          // Don't dispatch setUser here as it would clear the API auth state
          // The auth state should already be set by the login thunk
        }
      } catch (error) {
        console.warn('Error checking API auth:', error);
      }
    };

    checkApiAuth();
    
    // Restore auth state from stored tokens
    dispatch(restoreAuthState() as any);

    return () => unsubscribe();
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    authMethod,
  };
};
