import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const useTypedSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);
