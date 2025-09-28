import React, { useState, useMemo } from 'react';
import { CssBaseline, ThemeProvider, Box, createTheme, Container } from '@mui/material';
import { Provider } from 'react-redux'; 
import { store } from './redux/store'; 
import { lightTheme, darkTheme } from './theme';
import TodoApp from './TodoApp.jsx'; 
import { AppNavbar } from './components/AppNavbar.jsx';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => {
    return mode === 'light' ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    // Step 1: Wrap the entire application with the Redux Provider
    <Provider store={store}> 
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 0,
            minHeight: '100vh',
            bgcolor: 'background.default',
        }}>
            <AppNavbar mode={mode} toggleTheme={toggleTheme} />
            
            <Container maxWidth="md" sx={{ px: 2, pb: 4 }}> 
                <TodoApp />
            </Container>
        </Box>
        </ThemeProvider>
    </Provider>
  );
}

export default App;