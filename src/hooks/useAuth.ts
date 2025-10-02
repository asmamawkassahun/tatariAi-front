import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { restoreAuthState } from '../store/feature/auth/authThunks';
import { useTypedSelector } from './useTypedSelector';
import { getUserToken, isAuthenticatedSync } from '../lib/authToken';

// Global flag to prevent multiple auth checks
let authInitialized = false;

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useTypedSelector((state) => state.auth);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run auth check once globally, not per component
    if (authInitialized || hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;
    authInitialized = true;

    // Check for API authentication on mount
    const checkApiAuth = async () => {
      try {
        const hasApiToken = isAuthenticatedSync();
        const apiToken = await getUserToken();

        console.log('🔐 Checking API auth on mount:', { hasApiToken, hasToken: !!apiToken });

        if (hasApiToken && apiToken) {
          console.log('🔐 API token found. This is an API login session.');
        }
      } catch (error) {
        console.warn('Error checking API auth:', error);
      }
    };

    checkApiAuth();

    // Restore auth state from stored tokens
    dispatch(restoreAuthState() as any);
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
  };
};
