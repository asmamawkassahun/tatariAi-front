import { User } from 'firebase/auth';

export interface UserInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthCookies {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfo;
}

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

export const setAuthCookies = async (user: User, accessToken: string) => {
  const userInfo: UserInfo = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };

  // Set cookies on the server side
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    
    cookieStore.set('firebase_access_token', accessToken, COOKIE_OPTIONS);
    cookieStore.set('user_info', JSON.stringify(userInfo), COOKIE_OPTIONS);
    
    // Set refresh token if available
    const refreshToken = user.refreshToken;
    if (refreshToken) {
      cookieStore.set('firebase_refresh_token', refreshToken, COOKIE_OPTIONS);
    }
  } else {
    // Set cookies on the client side
    document.cookie = `firebase_access_token=${accessToken}; path=/; max-age=${COOKIE_OPTIONS.maxAge}; secure=${COOKIE_OPTIONS.secure}; samesite=${COOKIE_OPTIONS.sameSite}`;
    document.cookie = `user_info=${JSON.stringify(userInfo)}; path=/; max-age=${COOKIE_OPTIONS.maxAge}; secure=${COOKIE_OPTIONS.secure}; samesite=${COOKIE_OPTIONS.sameSite}`;
    
    const refreshToken = user.refreshToken;
    if (refreshToken) {
      document.cookie = `firebase_refresh_token=${refreshToken}; path=/; max-age=${COOKIE_OPTIONS.maxAge}; secure=${COOKIE_OPTIONS.secure}; samesite=${COOKIE_OPTIONS.sameSite}`;
    }
  }
};

export const clearAuthCookies = async () => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    
    cookieStore.delete('firebase_access_token');
    cookieStore.delete('firebase_refresh_token');
    cookieStore.delete('user_info');
  } else {
    document.cookie = 'firebase_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'firebase_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user_info=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

export const getAuthCookies = async (): Promise<Partial<AuthCookies>> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    
    const accessToken = cookieStore.get('firebase_access_token')?.value;
    const refreshToken = cookieStore.get('firebase_refresh_token')?.value;
    const userInfoStr = cookieStore.get('user_info')?.value;
    
    return {
      accessToken: accessToken || undefined,
      refreshToken: refreshToken || undefined,
      userInfo: userInfoStr ? JSON.parse(userInfoStr) : undefined,
    };
  } else {
    // Client-side cookie parsing
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    return {
      accessToken: cookies.firebase_access_token,
      refreshToken: cookies.firebase_refresh_token,
      userInfo: cookies.user_info ? JSON.parse(cookies.user_info) : undefined,
    };
  }
};
