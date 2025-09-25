import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants/api';
import { setRefreshToken, setUserToken } from '@/lib/authToken';
import { storeUserData } from '@/lib/userStorage';
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
  ApiResponse,
  emailPasswordSignUpResponse
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
  async signup(userData: SignupRequest): Promise<emailPasswordSignUpResponse> {
    try {
      // Make the API call directly to get the full response structure
      const response = await this.rawPost(API_ENDPOINTS.AUTH.REGISTER, userData);
      console.log("Signup response", JSON.stringify(response, null, 2));

      // Extract the structured response
      const authResponse: emailPasswordSignUpResponse = {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };

      // Store tokens and user data if signup successful
      if (!authResponse.success) {
        throw new Error(authResponse.message);
      }
      return authResponse;
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
      // Make the API call directly to get the full response structure
      const response = await this.rawPost(API_ENDPOINTS.AUTH.LOGIN, credentials);
      console.log("Signin response", JSON.stringify(response, null, 2));

      // Extract the structured response
      const authResponse: AuthResponse = {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };

      // Store tokens and user data if signin successful
      if (authResponse.success) {
        setUserToken(authResponse.data.accessToken);
        setRefreshToken(authResponse.data.refreshToken);

        // Store user data securely for persistence
        const userData = {
          ...authResponse.data.user,
          createdAt: authResponse.data.user.createdAt || new Date().toISOString(),
          updatedAt: authResponse.data.user.updatedAt || new Date().toISOString(),
        };
        storeUserData(userData);
      }

      return authResponse;
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
      // Call server logout API first - don't clear local data here
      // Local cleanup will be handled by the logout thunk
      const response = await this.rawPost(API_ENDPOINTS.AUTH.LOGOUT);
      console.log("Logout response", JSON.stringify(response, null, 2));

      // Extract the structured response
      const apiResponse: ApiResponse = {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };

      return apiResponse;
    } catch (error) {
      console.error('Logout failed:', error);
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

      return await this.post<ApiResponse>('/auth/change-password', changeData);
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
      // Make the API call directly to get the full response structure
      const response = await this.rawPost(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, data);
      console.log("Google signin response", JSON.stringify(response, null, 2));

      // Extract the structured response
      const authResponse: AuthResponse = {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };

      // Store tokens and user data if login successful
      if (authResponse.success) {
        setUserToken(authResponse.data.accessToken);
        setRefreshToken(authResponse.data.refreshToken);

        // Store user data securely for persistence
        const userData = {
          ...authResponse.data.user,
          createdAt: authResponse.data.user.createdAt || new Date().toISOString(),
          updatedAt: authResponse.data.user.updatedAt || new Date().toISOString(),
        };
        storeUserData(userData);
      }

      return authResponse;
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
      // Make the API call directly to get the full response structure
      const response = await this.rawPost(`/auth/${provider}`, { token });
      console.log(`${provider} login response`, JSON.stringify(response, null, 2));

      // Extract the structured response
      const authResponse: AuthResponse = {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };

      // Store tokens and user data if login successful
      if (authResponse.success) {
        setUserToken(authResponse.data.accessToken);
        setRefreshToken(authResponse.data.refreshToken);

        // Store user data securely for persistence
        const userData = {
          ...authResponse.data.user,
          createdAt: authResponse.data.user.createdAt || new Date().toISOString(),
          updatedAt: authResponse.data.user.updatedAt || new Date().toISOString(),
        };
        storeUserData(userData);
      }

      return authResponse;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw error;
    }
  }

  /**
   * Verify email with OTP
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<AuthResponse> {
    try {
      // Make the API call directly to get the full response structure
      const response = await this.rawPost(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
      console.log("Email verification response", JSON.stringify(response, null, 2));

      // Extract the structured response
      const authResponse: AuthResponse = {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };

      // Store tokens and user data if verification successful
      if (authResponse.success) {
        setUserToken(authResponse.data.accessToken);
        setRefreshToken(authResponse.data.refreshToken);

        // Store user data securely for persistence
        const userData = {
          ...authResponse.data.user,
          createdAt: authResponse.data.user.createdAt || new Date().toISOString(),
          updatedAt: authResponse.data.user.updatedAt || new Date().toISOString(),
        };
        storeUserData(userData);
      }

      return authResponse;
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification(data: ResendVerificationRequest): Promise<emailPasswordSignUpResponse> {
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
