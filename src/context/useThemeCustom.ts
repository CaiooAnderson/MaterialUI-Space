import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function useThemeCustom() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeCustom must be used within a ThemeProviderCustom');
  }
  return context;
}
