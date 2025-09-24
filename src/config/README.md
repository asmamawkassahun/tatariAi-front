# API Configuration

This directory contains configuration files for API communication.

## Axios Instance Setup

The `axios.ts` file provides a pre-configured axios instance with the following features:

### Features
- ✅ Base URL configuration
- ✅ Request/Response interceptors
- ✅ Automatic token management
- ✅ Error handling
- ✅ Development logging
- ✅ TypeScript support
- ✅ File upload support

### Usage

```typescript
import { api } from '@/config/axios';

// GET request
const response = await api.get('/users');

// POST request
const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });

// File upload
const formData = new FormData();
formData.append('file', file);
const uploadResponse = await api.upload('/upload', formData);
```

### Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Error Handling

The axios instance automatically handles:
- 401 Unauthorized (redirects to login)
- 403 Forbidden
- 404 Not Found
- 422 Validation Errors
- 429 Rate Limiting
- 500 Server Errors
- Network errors

### Authentication

```typescript
import { setAuthToken, clearAuthToken } from '@/config/axios';

// Set token after login
setAuthToken('your-jwt-token');

// Clear token on logout
clearAuthToken();
```

### Type Definitions

```typescript
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```
