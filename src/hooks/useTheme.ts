import { useContext } from 'react';

import { ThemeContext } from '@contexts/ThemeContext';

export function useAuth() {
  const context = useContext(ThemeContext);

  return context;
}
