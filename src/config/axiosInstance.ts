import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getUserToken, setUserToken, clearUserToken, getRefreshToken, setRefreshToken } from '@/lib/authToken';
import { API_CONFIG, HTTP_STATUS } from '@/constants/api';

// Base configuration
const baseURL = API_CONFIG.BASE_URL;

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = await getUserToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      console.log('Request config:', {
        baseURL: config.baseURL,
        url: config.url,
        headers: config.headers,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }

    return response;
  },
  async (error: AxiosError) => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      const { config } = error;
      
      switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
          console.error('🔐 Unauthorized - Token may be invalid or expired');
          
          // Try to refresh token if this is not already a refresh request
          if (config && !config.url?.includes('/auth/refresh')) {
            try {
              const refreshToken = getRefreshToken();
              if (refreshToken) {
                console.log('🔄 Attempting to refresh token...');
                
                const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
                  refreshToken: refreshToken
                });
                
                if (refreshResponse.data.accessToken) {
                  console.log('✅ Token refreshed successfully');
                  
                  // Update tokens
                  setUserToken(refreshResponse.data.accessToken);
                  if (refreshResponse.data.refreshToken) {
                    setRefreshToken(refreshResponse.data.refreshToken);
                  }
                  
                  // Retry original request with new token
                  if (config.headers) {
                    config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
                  }
                  
                  return axiosInstance(config);
                }
              }
            } catch (refreshError) {
              console.error('❌ Token refresh failed:', refreshError);
              // Clear tokens on refresh failure and redirect to login
              clearUserToken();
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
            }
          } else {
            // Clear invalid token and redirect to login
            clearUserToken();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            console.error('🔒 Unauthorized access - redirecting to login');
          }
          break;
          
        case HTTP_STATUS.FORBIDDEN:
          console.error('🚫 Forbidden - insufficient permissions');
          break;
          
        case HTTP_STATUS.NOT_FOUND:
          console.error('🔍 Resource not found');
          break;
          
        case HTTP_STATUS.UNPROCESSABLE_ENTITY:
          console.error('📝 Validation error:', data);
          break;
          
        case HTTP_STATUS.TOO_MANY_REQUESTS:
          console.error('⏰ Rate limit exceeded');
          break;
          
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          console.error('🔥 Internal server error');
          break;
          
        default:
          console.error(`❌ API Error ${status}:`, data);
      }
    } else if (error.request) {
      // Network error
      console.error('🌐 Network Error - No response received:', error.request);
      console.error('🌐 This is likely a CORS issue or the server is not running');
      console.error('🌐 Make sure your API server is running on:', baseURL);
      console.error('🌐 And that CORS is configured to allow requests from your frontend');
    } else {
      // Other error
      console.error('💥 Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API methods with proper typing
export const api = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.get(url, config),

  // POST request
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.post(url, data, config),

  // PUT request
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.put(url, data, config),

  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.patch(url, data, config),

  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.delete(url, config),

  // Upload file
  upload: <T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    }),
};

// Utility functions (re-export from authToken utility)
export const setAuthToken = setUserToken;
export const clearAuthToken = clearUserToken;

// Export the instance for advanced usage
export default axiosInstance;

// Error handling utility
export const handleApiError = (error: AxiosError) => {
  if (error.response?.data) {
    return error.response.data;
  }
  
  if (error.message) {
    return { message: error.message };
  }
  
  return { message: 'An unexpected error occurred' };
};

// Type definitions for common API responses
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
