/**
 * Authentication token management utilities
 * Handles API tokens only - Firebase auth is managed by Firebase itself
 */

/**
 * Get user token from multiple sources in order of preference:
 * 1. Cookies
 * 2. Local storage (fallback)
 * 
 * Note: Firebase tokens are handled by Firebase auth state, not stored manually
 */
export const getUserToken = async (): Promise<string | null> => {
  // Try to get token from cookies (server-side and client-side)
  if (typeof document !== 'undefined') {
    try {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];

      if (cookieValue) {
        return decodeURIComponent(cookieValue);
      }
    } catch (error) {
      console.warn('Failed to get token from cookies:', error);
    }
  }

  // Fallback to localStorage (client-side only)
  if (typeof window !== 'undefined') {
    try {
      const localToken = localStorage.getItem('authToken');
      if (localToken) {
        return localToken;
      }
    } catch (error) {
      console.warn('Failed to get token from localStorage:', error);
    }
  }

  return null;
};

/**
 * Set user token in multiple storage locations
 */
export const setUserToken = (token: string | null) => {
  if (!token) {
    // Clear token from all locations
    clearUserToken();
    return;
  }

  // Set in localStorage (client-side)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.warn('Failed to set token in localStorage:', error);
    }
  }

  // Set in cookies (client-side)
  if (typeof document !== 'undefined') {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
      document.cookie = `authToken=${encodeURIComponent(token)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    } catch (error) {
      console.warn('Failed to set token in cookies:', error);
    }
  }
};

/**
 * Set refresh token in localStorage
 */
export const setRefreshToken = (refreshToken: string | null) => {
  if (!refreshToken) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('refreshToken');
      } catch (error) {
        console.warn('Failed to clear refresh token from localStorage:', error);
      }
    }
    return;
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.warn('Failed to set refresh token in localStorage:', error);
    }
  }
};

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('refreshToken');
    } catch (error) {
      console.warn('Failed to get refresh token from localStorage:', error);
    }
  }
  return null;
};

/**
 * Clear user token from all storage locations
 */
export const clearUserToken = () => {
  // Clear from localStorage (client-side)
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.warn('Failed to clear tokens from localStorage:', error);
    }
  }

  // Clear from cookies (client-side)
  if (typeof document !== 'undefined') {
    try {
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (error) {
      console.warn('Failed to clear token from cookies:', error);
    }
  }
};

/**
 * Clear all user-related data from storage
 * This function clears everything related to the user session
 */
export const clearAllUserData = () => {
  // Clear from localStorage (client-side)
  if (typeof window !== 'undefined') {
    try {
      // Clear authentication tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');

      // Clear any other user-related data that might be stored
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('user_') ||
          key.startsWith('auth_') ||
          key.startsWith('session_') ||
          key.includes('user') ||
          key.includes('auth') ||
          key.includes('token') ||
          key.includes('profile') ||
          key.includes('preference') ||
          key.includes('setting')
        )) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  // Clear from sessionStorage (client-side)
  if (typeof window !== 'undefined') {
    try {
      // Clear authentication tokens
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('refreshToken');

      // Clear any other user-related data
      const keysToRemove = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (
          key.startsWith('user_') ||
          key.startsWith('auth_') ||
          key.startsWith('session_') ||
          key.includes('user') ||
          key.includes('auth') ||
          key.includes('token') ||
          key.includes('profile') ||
          key.includes('preference') ||
          key.includes('setting')
        )) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => sessionStorage.removeItem(key));
    } catch (error) {
      console.warn('Failed to clear sessionStorage:', error);
    }
  }

  // Clear from cookies (client-side)
  if (typeof document !== 'undefined') {
    try {
      // Clear all authentication-related cookies
      const cookiesToClear = [
        'authToken',
        'refreshToken',
        'firebase_access_token',
        'firebase_refresh_token',
        'user_info',
        'session_id',
        'user_preferences',
        'auth_state'
      ];

      cookiesToClear.forEach(cookieName => {
        // Clear cookie for current path
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // Clear cookie for root path
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        // Clear cookie for parent domain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
      });
    } catch (error) {
      console.warn('Failed to clear cookies:', error);
    }
  }
};

/**
 * Check if user is authenticated by verifying token existence
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getUserToken();
  return token !== null && token.length > 0;
};

/**
 * Check if user has API authentication (not Firebase-only)
 */
export const hasApiAuthentication = (): boolean => {
  // Check for refresh token which is only set for API authentication
  if (typeof window !== 'undefined') {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      return refreshToken !== null && refreshToken.length > 0;
    } catch (error) {
      console.warn('Failed to check refresh token:', error);
    }
  }
  return false;
};

/**
 * Synchronous version for quick checks (uses cookies/localStorage only)
 */
export const isAuthenticatedSync = (): boolean => {
  // Check cookies first
  if (typeof document !== 'undefined') {
    try {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];

      if (cookieValue) {
        return true;
      }
    } catch (error) {
      console.warn('Failed to check cookie for auth:', error);
    }
  }

  // Check localStorage
  if (typeof window !== 'undefined') {
    try {
      const localToken = localStorage.getItem('authToken');
      return localToken !== null && localToken.length > 0;
    } catch (error) {
      console.warn('Failed to check localStorage for auth:', error);
    }
  }

  return false;
};
