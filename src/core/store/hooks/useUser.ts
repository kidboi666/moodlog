import { useContext } from 'react';
import { UserContext } from '@/core/store/contexts/user.context';

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
