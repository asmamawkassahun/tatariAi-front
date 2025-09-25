import { getAuth } from 'firebase/auth';

/**
 * Get user token from multiple sources in order of preference:
 * 1. Firebase auth user (ID token)
 * 2. Cookies
 * 3. Local storage (fallback)
 */
export const getUserToken = async (): Promise<string | null> => {
  // Try to get token from Firebase auth user first (client-side)
  if (typeof window !== 'undefined') {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Get the ID token from Firebase auth
        const token = await user.getIdToken();
        if (token) {
          return token;
        }
      }
    } catch (error) {
      console.warn('Failed to get token from Firebase auth:', error);
    }
  }

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
 * Check if user is authenticated by verifying token existence
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getUserToken();
  return token !== null && token.length > 0;
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
