# Firebase Authentication Setup Guide

This project uses Firebase Authentication with Redux Toolkit for state management. Follow these steps to set up authentication for your project.

## Prerequisites

1. A Firebase project
2. Node.js and npm installed
3. This project cloned and dependencies installed

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click "Email/Password" and enable it
   - **Google**: Click "Google" and enable it (you'll need to configure OAuth consent screen)
   - **GitHub**: Click "GitHub" and enable it (you'll need GitHub OAuth app)

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web (</>) icon
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration values in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## Authentication Features

### Available Authentication Methods

1. **Email/Password**: Traditional email and password authentication
2. **Google Sign-In**: OAuth authentication with Google
3. **GitHub Sign-In**: OAuth authentication with GitHub

### Authentication Flow

1. **Login Page** (`/login`): Users can sign in with email/password or social providers
2. **Signup Page** (`/signup`): Users can create new accounts
3. **Protected Routes**: Automatically redirect unauthenticated users to login
4. **Header Integration**: Shows user info and logout button when authenticated

### State Management

The authentication state is managed using Redux Toolkit with the following structure:

```typescript
interface AuthState {
  user: User | null;           // Firebase user object
  loading: boolean;             // Loading state for auth operations
  error: string | null;        // Error messages
  isAuthenticated: boolean;     // Authentication status
}
```

### Available Actions

- `loginWithEmail`: Sign in with email and password
- `signupWithEmail`: Create new account with email and password
- `loginWithGoogle`: Sign in with Google OAuth
- `loginWithGithub`: Sign in with GitHub OAuth
- `logout`: Sign out current user
- `setUser`: Set user state (used internally)
- `clearError`: Clear error messages

### Custom Hooks

- `useAuth()`: Returns current authentication state and user info

### Components

- `AuthPage`: Main authentication page component
- `LoginModal`: Modal for quick authentication
- `AuthGuard`: Component to protect routes
- `LogoutButton`: Button component for logging out

## Usage Examples

### Using Authentication in Components

```tsx
import { useAuth } from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { loginWithEmail } from '@/store/feature/authSlice';

function MyComponent() {
  const { user, isAuthenticated, loading } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await dispatch(loginWithEmail({ 
        email: 'user@example.com', 
        password: 'password123' 
      })).unwrap();
      // User is now logged in
    } catch (error) {
      // Handle error
    }
  };

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome, {user?.email}!</div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Protecting Routes

```tsx
import { AuthGuard } from '@/components/auth/AuthGuard';

function ProtectedPage() {
  return (
    <AuthGuard requireAuth={true} redirectTo="/login">
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  );
}
```

### Redirecting Authenticated Users

```tsx
import { AuthGuard } from '@/components/auth/AuthGuard';

function LoginPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <AuthPage mode="login" />
    </AuthGuard>
  );
}
```

## Development

### Running the Development Server

```bash
npm run dev
```

### Firebase Emulator (Optional)

For development, you can use Firebase Auth Emulator:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init emulators
   ```

4. Start the emulator:
   ```bash
   firebase emulators:start --only auth
   ```

5. The app will automatically connect to the emulator in development mode.

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Make sure your Firebase configuration is correct in `.env.local`
   - Verify that your Firebase project has Authentication enabled

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key is correct
   - Ensure the API key is from the correct Firebase project

3. **"Firebase: Error (auth/domain-not-authorized)"**
   - Add your domain to the authorized domains in Firebase Console
   - Go to Authentication > Settings > Authorized domains

4. **Social Login Not Working**
   - Ensure OAuth providers are properly configured
   - Check that redirect URIs are set correctly
   - Verify OAuth consent screen is configured

### Getting Help

- Check Firebase documentation: https://firebase.google.com/docs/auth
- Check Redux Toolkit documentation: https://redux-toolkit.js.org/
- Check Next.js documentation: https://nextjs.org/docs

## Security Notes

1. Never commit `.env.local` to version control
2. Use environment variables for all sensitive configuration
3. Implement proper error handling for authentication failures
4. Consider implementing rate limiting for authentication attempts
5. Regularly review and update Firebase security rules
