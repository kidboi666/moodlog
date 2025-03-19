import { useContext } from 'react';
import { ThemeContext } from '@/core/store/contexts/ThemeContext';

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeContextProvider');
  }
  return context;
};
