import { api } from '@/config/axiosInstance';
import { API_MESSAGES, PAGINATION } from '@/constants/api';
import {
  PaginatedResponse,
  ApiError,
  ValidationError,
} from '@/types/api';

/**
 * Base service class with common API operations
 */
export class BaseService {
  protected baseEndpoint: string;

  constructor(baseEndpoint: string) {
    this.baseEndpoint = baseEndpoint;
  }

  /**
   * Handle API response and extract data
   */
  protected handleResponse<T>(response: any): T {
    if (response.data?.success === false) {
      throw this.createApiError(response.data.message || API_MESSAGES.ERROR.SERVER_ERROR);
    }
    return response.data?.data || response.data;
  }

  /**
   * Handle paginated response
   */
  protected handlePaginatedResponse<T>(response: any): PaginatedResponse<T> {
    const data = response.data;

    if (data.success === false) {
      throw this.createApiError(data.message || API_MESSAGES.ERROR.SERVER_ERROR);
    }

    return {
      success: true,
      data: data.data || [],
      pagination: data.pagination || {
        page: PAGINATION.DEFAULT_PAGE,
        limit: PAGINATION.DEFAULT_LIMIT,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
      message: data.message,
    };
  }

  /**
   * Create standardized API error
   */
  protected createApiError(message: string, code?: string, details?: any): ApiError {
    return {
      code: code || 'API_ERROR',
      message,
      details,
    };
  }

  /**
   * Handle validation errors
   */
  protected handleValidationErrors(errors: any[]): ValidationError[] {
    return errors.map(error => ({
      field: error.field || 'unknown',
      message: error.message || 'Validation failed',
      value: error.value,
    }));
  }

  /**
   * Generic GET request
   */
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await api.get(`${this.baseEndpoint}${endpoint}`, { params });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic POST request
   */
  protected async post<T>(endpoint: string, data?: any, needsAuth: boolean = true): Promise<T> {
    try {
      const config = { needsAuth };
      const response = await api.post(`${this.baseEndpoint}${endpoint}`, data, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Raw POST request that returns the full response structure
   */
  protected async rawPost(endpoint: string, data?: any, needsAuth: boolean = true): Promise<any> {
    try {
      const config = { needsAuth };
      const response = await api.post(`${this.baseEndpoint}${endpoint}`, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic PUT request
   */
  protected async put<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await api.put(`${this.baseEndpoint}${endpoint}`, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic PATCH request
   */
  protected async patch<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await api.patch(`${this.baseEndpoint}${endpoint}`, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic DELETE request
   */
  protected async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await api.delete(`${this.baseEndpoint}${endpoint}`);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic GET request with pagination
   */
  protected async getPaginated<T>(endpoint: string, params?: Record<string, any>): Promise<PaginatedResponse<T>> {
    try {
      const response = await api.get(`${this.baseEndpoint}${endpoint}`, { params });
      return this.handlePaginatedResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * File upload
   */
  protected async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    try {
      const response = await api.upload(`${this.baseEndpoint}${endpoint}`, formData);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   */
  protected handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 422 && data.errors) {
        // Validation errors
        return {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: this.handleValidationErrors(data.errors),
        };
      }

      return {
        code: `HTTP_${status}`,
        message: data.message || data.error || 'An error occurred',
        details: data,
      };
    } else if (error.request) {
      // Network error
      return {
        code: 'NETWORK_ERROR',
        message: 'Network connection failed',
        details: error.request,
      };
    } else {
      // Other error
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An unexpected error occurred',
        details: error,
      };
    }
  }

  /**
   * Build query string from parameters
   */
  protected buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return searchParams.toString();
  }
}
