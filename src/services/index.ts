// Export all services
export { AuthService, authService } from './authService';
export { ProjectService, projectService } from './projectService';
export { chatService } from './chatService';
export { BaseService } from './base';

// Export types from the types folder
export type {
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  SignupRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  User,
  UpdateUserRequest,
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectFilters,
  FileUploadResponse,
  FileMetadata,
  DashboardStats,
  Activity,
  SearchRequest,
  SearchResponse,
  Notification,
  NotificationPreferences,
  UserSettings,
  ApiError,
  ValidationError,
  RequestConfig,
  ApiRequestOptions,
} from '@/types/api';
