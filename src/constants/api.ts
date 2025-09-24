// API Base Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.1.6:3000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/signin',
    REGISTER: '/auth/signup',
    GOOGLE_LOGIN: 'auth/google-signin',
    LINKEDIN_LOGIN: 'auth/linkedin-signin',
    FACEBOOK_LOGIN: 'auth/facebook-signin',
    GITHUB_LOGIN: '/auth/github',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-otp',
    RESEND_VERIFICATION: '/auth/resend-verification',
    CHANGE_PASSWORD: '/auth/change-password',
    PROFILE: '/auth/profile',
  },

  // User Management
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_AVATAR: '/users/avatar',
    DELETE_ACCOUNT: '/users/account',
    GET_BY_ID: (id: string) => `/users/${id}`,
    UPDATE_BY_ID: (id: string) => `/users/${id}`,
    DELETE_BY_ID: (id: string) => `/users/${id}`,
  },

  // Projects
  PROJECTS: {
    BASE: '/projects',
    CREATE: '/projects',
    GET_ALL: '/projects',
    GET_BY_ID: (id: string) => `/projects/${id}`,
    UPDATE_BY_ID: (id: string) => `/projects/${id}`,
    DELETE_BY_ID: (id: string) => `/projects/${id}`,
    DUPLICATE: (id: string) => `/projects/${id}/duplicate`,
    SHARE: (id: string) => `/projects/${id}/share`,
    EXPORT: (id: string) => `/projects/${id}/export`,
    IMPORT: '/projects/import',
    SEARCH: '/projects/search',
    FILTER: '/projects/filter',
    USER_PROJECTS: (userId: string) => `/users/${userId}/projects`,
    COLLABORATORS: (id: string) => `/projects/${id}/collaborators`,
    ADD_COLLABORATOR: (id: string) => `/projects/${id}/collaborators`,
    REMOVE_COLLABORATOR: (projectId: string, userId: string) => `/projects/${projectId}/collaborators/${userId}`,
  },

  // Files & Media
  FILES: {
    BASE: '/files',
    UPLOAD: '/files/upload',
    UPLOAD_MULTIPLE: '/files/upload/multiple',
    GET_BY_ID: (id: string) => `/files/${id}`,
    DELETE_BY_ID: (id: string) => `/files/${id}`,
    DOWNLOAD: (id: string) => `/files/${id}/download`,
    THUMBNAIL: (id: string) => `/files/${id}/thumbnail`,
    METADATA: (id: string) => `/files/${id}/metadata`,
    COMPRESS: (id: string) => `/files/${id}/compress`,
    CONVERT: (id: string) => `/files/${id}/convert`,
  },

  // Dashboard & Analytics
  DASHBOARD: {
    BASE: '/dashboard',
    STATS: '/dashboard/stats',
    RECENT_ACTIVITY: '/dashboard/activity',
    USER_ACTIVITY: '/dashboard/user-activity',
    PROJECT_ANALYTICS: (id: string) => `/dashboard/projects/${id}/analytics`,
    USAGE_STATS: '/dashboard/usage',
  },

  // Search & Discovery
  SEARCH: {
    BASE: '/search',
    PROJECTS: '/search/projects',
    USERS: '/search/users',
    GLOBAL: '/search/global',
    SUGGESTIONS: '/search/suggestions',
    HISTORY: '/search/history',
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    GET_ALL: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
    PREFERENCES: '/notifications/preferences',
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Settings
  SETTINGS: {
    BASE: '/settings',
    USER_PREFERENCES: '/settings/preferences',
    PRIVACY: '/settings/privacy',
    SECURITY: '/settings/security',
    THEME: '/settings/theme',
    LANGUAGE: '/settings/language',
    NOTIFICATIONS: '/settings/notifications',
  },

  // Admin (if needed)
  ADMIN: {
    BASE: '/admin',
    USERS: '/admin/users',
    PROJECTS: '/admin/projects',
    ANALYTICS: '/admin/analytics',
    SYSTEM_STATS: '/admin/stats',
    USER_BY_ID: (id: string) => `/admin/users/${id}`,
    PROJECT_BY_ID: (id: string) => `/admin/projects/${id}`,
  },
} as const;

// Query Parameters
export const QUERY_PARAMS = {
  PAGE: 'page',
  LIMIT: 'limit',
  SORT: 'sort',
  ORDER: 'order',
  SEARCH: 'search',
  FILTER: 'filter',
  CATEGORY: 'category',
  TAG: 'tag',
  STATUS: 'status',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  USER_ID: 'userId',
  PROJECT_ID: 'projectId',
} as const;

// Default Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  LIMITS: [5, 10, 20, 50, 100],
} as const;

// Sort Options
export const SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  NAME: 'name',
  TITLE: 'title',
  POPULARITY: 'popularity',
  VIEWS: 'views',
  LIKES: 'likes',
  DOWNLOADS: 'downloads',
} as const;

// Sort Orders
export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

// File Types
export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
  AUDIO: ['mp3', 'wav', 'ogg', 'm4a', 'flac'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  SPREADSHEET: ['xls', 'xlsx', 'csv'],
  PRESENTATION: ['ppt', 'pptx'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
} as const;

// Project Status
export const PROJECT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  PRIVATE: 'private',
  PUBLIC: 'public',
  SHARED: 'shared',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest',
} as const;

// API Response Messages
export const API_MESSAGES = {
  SUCCESS: {
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    UPLOADED: 'File uploaded successfully',
    LOGIN: 'Login successful',
    LOGOUT: 'Logout successful',
    PASSWORD_RESET: 'Password reset email sent',
    EMAIL_VERIFIED: 'Email verified successfully',
  },
  ERROR: {
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation failed',
    SERVER_ERROR: 'Internal server error',
    NETWORK_ERROR: 'Network connection failed',
    TIMEOUT: 'Request timeout',
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_EXISTS: 'Email already exists',
    USER_NOT_FOUND: 'User not found',
    PROJECT_NOT_FOUND: 'Project not found',
    FILE_TOO_LARGE: 'File size too large',
    INVALID_FILE_TYPE: 'Invalid file type',
  },
} as const;

// Cache Keys
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  USER_PROJECTS: 'user_projects',
  PROJECT_DETAILS: (id: string) => `project_${id}`,
  PROJECT_LIST: 'project_list',
  DASHBOARD_STATS: 'dashboard_stats',
  NOTIFICATIONS: 'notifications',
  SEARCH_RESULTS: (query: string) => `search_${query}`,
  USER_SETTINGS: 'user_settings',
} as const;

// Request Headers
export const HEADERS = {
  CONTENT_TYPE: {
    JSON: 'application/json',
    FORM_DATA: 'multipart/form-data',
    URL_ENCODED: 'application/x-www-form-urlencoded',
  },
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  USER_AGENT: 'User-Agent',
  CACHE_CONTROL: 'Cache-Control',
} as const;

// Environment Variables
export const ENV_VARS = {
  API_BASE_URL: 'NEXT_PUBLIC_API_BASE_URL',
  NODE_ENV: 'NODE_ENV',
  VERSION: 'NEXT_PUBLIC_VERSION',
  BUILD_TIME: 'NEXT_PUBLIC_BUILD_TIME',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: 'ENABLE_ANALYTICS',
  ENABLE_NOTIFICATIONS: 'ENABLE_NOTIFICATIONS',
  ENABLE_FILE_UPLOAD: 'ENABLE_FILE_UPLOAD',
  ENABLE_COLLABORATION: 'ENABLE_COLLABORATION',
  ENABLE_SEARCH: 'ENABLE_SEARCH',
  ENABLE_DARK_MODE: 'ENABLE_DARK_MODE',
} as const;
