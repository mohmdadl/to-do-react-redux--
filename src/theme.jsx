// src/theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e8449',
    },
    custom: {
      complete: '#28a745',
      edit: '#ffc107',
      delete: '#dc3545',
      undo: '#17a2b8',
      add: '#1e8449',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    primary: {
      main: '#4dabf5',
    },
    custom: {
      complete: '#28a745',
      edit: '#ffc107',
      delete: '#dc3545',
      undo: '#17a2b8',
      add: '#4dabf5',
    },
  },
});