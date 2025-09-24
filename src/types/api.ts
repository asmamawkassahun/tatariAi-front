// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    photoUrl?: string;
    authDate?: string;
    createdAt: string;
    updatedAt: string;
    client?: {
        id: string;
        phone: string | null;
      };
      enterprise?: {
        id: string;
        businessName?: string;
        phone: string | null;
      };
  };
}

// User Types
export interface User {
 id: string;
  email: string;
  displayName: string; // Could derive from firstName + lastName in auth
  firstName?: string;
  lastName?: string;
  avatar?: string; // Maps to photoUrl from auth
  bio?: string;
  emailVerified: boolean;
  role: string;
  isActive: boolean;
  lastLoginAt?: string; // ISO string
  createdAt: string; // ISO string
  updatedAt: string; // ISO string;
}

export interface UpdateUserRequest {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description?: string;
  content: string;
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived' | 'private' | 'public' | 'shared';
  visibility: 'public' | 'private' | 'unlisted';
  tags: string[];
  category?: string;
  author: {
    id: string;
    displayName: string;
    avatar?: string;
  };
  collaborators: User[];
  viewCount: number;
  likeCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
  content: string;
  thumbnail?: string;
  status: 'draft' | 'published' | 'private';
  visibility: 'public' | 'private' | 'unlisted';
  tags: string[];
  category?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  status?: 'draft' | 'published' | 'archived' | 'private' | 'public' | 'shared';
  visibility?: 'public' | 'private' | 'unlisted';
  tags?: string[];
  category?: string;
}

export interface ProjectFilters {
  search?: string;
  status?: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// File Types
export interface FileUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
}

export interface FileMetadata {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnail?: string;
  metadata?: Record<string, any>;
  uploadedAt: string;
}

// Dashboard Types
export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'project_created' | 'project_updated' | 'project_published' | 'project_viewed' | 'project_liked';
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// Search Types
export interface SearchRequest {
  query: string;
  type?: 'projects' | 'users' | 'all';
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  projects: Project[];
  users: User[];
  totalResults: number;
  suggestions: string[];
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
}

export interface NotificationPreferences {
  email: {
    projectUpdates: boolean;
    collaborationInvites: boolean;
    systemAnnouncements: boolean;
    marketingEmails: boolean;
  };
  push: {
    projectUpdates: boolean;
    collaborationInvites: boolean;
    systemAnnouncements: boolean;
  };
}

// Settings Types
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showActivity: boolean;
  };
  notifications: NotificationPreferences;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Request/Response Helpers
export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

export interface ApiRequestOptions extends RequestConfig {
  showLoading?: boolean;
  showError?: boolean;
  showSuccess?: boolean;
}
