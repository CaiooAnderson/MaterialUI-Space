import { useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { IconButton } from '@mui/material';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderCustomProps {
  children: ReactNode;
}

export function ThemeProviderCustom({ children }: ThemeProviderCustomProps) {
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkMode, setDarkMode] = useState(getSystemTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
        <IconButton
          onClick={toggleDarkMode}
          sx={{
            position: 'fixed',
            top: 10,
            right: 10,
            color: darkMode ? 'white' : 'yellow',
            backgroundColor: '#26323880',
          }}
        >
          {darkMode ? <DarkModeOutlinedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
