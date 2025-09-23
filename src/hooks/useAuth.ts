import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { setUser, setLoading } from '../store/feature/authSlice';
import { useTypedSelector } from './useTypedSelector';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
  };
};
