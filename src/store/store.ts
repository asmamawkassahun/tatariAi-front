import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { setLoading, setUser } from './feature/auth/authSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

// Sync Firebase auth state with Redux
onAuthStateChanged(auth, (user) => {
  store.dispatch(setLoading(true));
  store.dispatch(setUser(user));
  store.dispatch(setLoading(false));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;