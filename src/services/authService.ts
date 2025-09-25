import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants/api';
import { setRefreshToken, setUserToken } from '@/lib/authToken';
import {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  GoogleSigninRequest,
  RefreshTokenRequest,
  User,
  ApiResponse
} from '@/types/api';

/**
 * Authentication service for handling login, signup, and password operations
 */
export class AuthService extends BaseService {
  constructor() {
    super('');
  }

  /**
   * User login with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);

      // Store tokens if login successful
      if (response.success) {
        setUserToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * User signup with email and password
   */
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      const response = await this.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);

      // Store tokens if signup successful
      if (response.success) {
        setUserToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      }

      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  /**
   * User signin with email and password
   */
  async signin(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);

      // Store tokens if signin successful
      if (response.success) {
        setUserToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      }

      return response;
    } catch (error) {
      console.error('Signin failed:', error);
      throw error;
    }
  }

  /**
   * User logout
   */
  async logout(): Promise<ApiResponse> {
    try {
      const response = await this.post<ApiResponse>(API_ENDPOINTS.AUTH.LOGOUT);

      // Clear stored tokens
      // clearUserToken();

      return response;
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails on server, clear local tokens
      // clearUserToken();
      throw error;
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const data: RefreshTokenRequest = { refreshToken };
      const response = await this.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, data);

      // Update stored tokens
      if (response.success) {
        setUserToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      }

      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    try {
      return await this.get<User>(API_ENDPOINTS.AUTH.PROFILE);
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      return await this.put<User>(API_ENDPOINTS.AUTH.PROFILE, userData);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }

  /**
   * Forgot password - send reset email
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    try {
      return await this.post<ApiResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    try {
      // Validate password confirmation on frontend
      if (data.password !== data.confirmPassword) {
        throw this.createApiError('Passwords do not match', 'VALIDATION_ERROR');
      }

      // Remove confirmPassword from the request
      const { confirmPassword, ...resetData } = data;

      return await this.post<ApiResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  }

  /**
   * Change password (for authenticated users)
   */
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
    try {
      // Validate new password confirmation on frontend
      if (data.newPassword !== data.confirmPassword) {
        throw this.createApiError('New passwords do not match', 'VALIDATION_ERROR');
      }

      // Remove confirmPassword from the request
      const { confirmPassword, ...changeData } = data;

      return await this.post<ApiResponse>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, changeData);
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }


  /**
   * Check if user is authenticated
   */
  async checkAuth(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Google signin with ID token
   */
  async googleSignin(data: GoogleSigninRequest): Promise<AuthResponse> {
    try {
      const response = await this.post<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, data);

      // Store tokens if login successful
      if (response.success) {
        setUserToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      }

      return response;
    } catch (error) {
      console.error('Google signin failed:', error);
      throw error;
    }
  }

  /**
   * Social login (GitHub, etc.)
   */
  async socialLogin(provider: 'github', token: string): Promise<AuthResponse> {
    try {
      const response = await this.post<AuthResponse>(`/auth/${provider}`, { token });

      // Store tokens if login successful
      if (response.success) {
        setUserToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      }

      return response;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw error;
    }
  }

  /**
   * Verify email with OTP
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      return await this.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification(data: ResendVerificationRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      return await this.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, data);
    } catch (error) {
      console.error('Resend verification failed:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
