import { User } from '@/types/api';

/**
 * Secure user data storage utility
 * Implements security best practices for storing user data
 */

// Storage keys with prefixes for organization
const STORAGE_KEYS = {
    USER_DATA: 'tatari_user_data',
    AUTH_STATE: 'tatari_auth_state',
    SESSION_ID: 'tatari_session_id',
} as const;

// User data that can be safely stored (non-sensitive information)
interface SafeUserData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    photoUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// Authentication state for persistence
interface AuthState {
    isAuthenticated: boolean;
    lastLogin: string;
    sessionId: string;
}

/**
 * Sanitize user data to remove sensitive information
 * Only store non-sensitive user information
 */
const sanitizeUserData = (user: User): SafeUserData => {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        photoUrl: user.photoUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

/**
 * Generate a secure session ID
 */
const generateSessionId = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 15);
    return `session_${timestamp}_${random}`;
};

/**
 * Store user data securely in localStorage
 * Only stores non-sensitive user information
 */
export const storeUserData = (user: User): void => {
    if (typeof window === 'undefined') return;

    try {
        // Sanitize user data to remove sensitive information
        const safeUserData = sanitizeUserData(user);

        // Store sanitized user data
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(safeUserData));

        // Generate and store session information
        const sessionId = generateSessionId();
        const authState: AuthState = {
            isAuthenticated: true,
            lastLogin: new Date().toISOString(),
            sessionId,
        };

        localStorage.setItem(STORAGE_KEYS.AUTH_STATE, JSON.stringify(authState));
        localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);

        console.log('✅ User data stored securely');
    } catch (error) {
        console.warn('Failed to store user data:', error);
    }
};

/**
 * Retrieve user data from localStorage
 * Returns null if no valid user data is found
 */
export const getUserData = (): SafeUserData | null => {
    if (typeof window === 'undefined') return null;

    try {
        const userDataStr = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        const authStateStr = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);

        if (!userDataStr || !authStateStr) {
            return null;
        }

        const userData = JSON.parse(userDataStr) as SafeUserData;
        const authState = JSON.parse(authStateStr) as AuthState;

        // Validate that we have a valid authenticated session
        if (!authState.isAuthenticated || !authState.sessionId) {
            return null;
        }

        // Check if session is not too old (optional security measure)
        const lastLogin = new Date(authState.lastLogin);
        const now = new Date();
        const daysSinceLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);

        // If session is older than 30 days, consider it expired
        if (daysSinceLogin > 30) {
            clearUserData();
            return null;
        }

        return userData;
    } catch (error) {
        console.warn('Failed to retrieve user data:', error);
        return null;
    }
};

/**
 * Get authentication state from localStorage
 */
export const getAuthState = (): AuthState | null => {
    if (typeof window === 'undefined') return null;

    try {
        const authStateStr = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
        if (!authStateStr) {
            return null;
        }

        return JSON.parse(authStateStr) as AuthState;
    } catch (error) {
        console.warn('Failed to retrieve auth state:', error);
        return null;
    }
};

/**
 * Update user data in storage
 * Useful when user profile is updated
 */
export const updateUserData = (updatedUser: Partial<User>): void => {
    if (typeof window === 'undefined') return;

    try {
        const currentUserData = getUserData();
        if (!currentUserData) {
            console.warn('No user data found to update');
            return;
        }

        // Merge updated data with current data
        const mergedUserData = {
            ...currentUserData,
            ...updatedUser,
        };

        // Sanitize and store updated data
        const safeUserData = sanitizeUserData(mergedUserData as User);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(safeUserData));

        console.log('✅ User data updated successfully');
    } catch (error) {
        console.warn('Failed to update user data:', error);
    }
};

/**
 * Clear all user data from localStorage
 * Called during logout
 */
export const clearUserData = (): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
        localStorage.removeItem(STORAGE_KEYS.SESSION_ID);

        console.log('✅ User data cleared successfully');
    } catch (error) {
        console.warn('Failed to clear user data:', error);
    }
};

/**
 * Check if user is authenticated based on stored data
 * This is a quick check without API validation
 */
export const isUserAuthenticated = (): boolean => {
    const authState = getAuthState();
    return authState?.isAuthenticated === true;
};

/**
 * Get session ID for tracking purposes
 */
export const getSessionId = (): string | null => {
    if (typeof window === 'undefined') return null;

    try {
        return localStorage.getItem(STORAGE_KEYS.SESSION_ID);
    } catch (error) {
        console.warn('Failed to get session ID:', error);
        return null;
    }
};

/**
 * Validate stored user data integrity
 * Returns true if data is valid and not corrupted
 */
export const validateStoredUserData = (): boolean => {
    try {
        const userData = getUserData();
        const authState = getAuthState();

        return (
            userData !== null &&
            authState !== null &&
            !!userData.id &&
            !!userData.email &&
            authState.isAuthenticated === true &&
            !!authState.sessionId
        );
    } catch (error) {
        console.warn('Failed to validate stored user data:', error);
        return false;
    }
};
