import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme, IconButton, Stack } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // أيقونة الشمس للمظهر الفاتح
import ModeNightIcon from '@mui/icons-material/ModeNight'; // أيقونة القمر للمظهر الداكن
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // أيقونة قائمة المهام

export const AppNavbar = ({ mode, toggleTheme }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      elevation={2} 
      sx={{ 
        mb: 4, 
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText || 'white', 
        borderRadius: 1
      }}
    >
      <Toolbar>
        {/* Theme Icon */}
        <IconButton 
          onClick={toggleTheme} 
          color="inherit" 
          aria-label="Toggle theme mode"
          sx={{ mr: 2 }}
        >
          {theme.palette.mode === 'dark' ? (
            <WbSunnyIcon sx={{ color: theme.palette.warning.light }} /> 
          ) : (
            <ModeNightIcon sx={{ color: theme.palette.primary.contrastText || 'white' }} />
          )}
        </IconButton>
        

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ flexGrow: 1 }}
        >
          <CheckCircleOutlineIcon 
            sx={{ 
              fontSize: 32,
              color: theme.palette.primary.contrastText || 'white' 
            }}
          />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.primary.contrastText || 'white', 
            }}
          >
            Todo Application
          </Typography>
        </Stack>
        <Box sx={{ width: 48 }} /> 
      </Toolbar>
    </AppBar>
  );
};