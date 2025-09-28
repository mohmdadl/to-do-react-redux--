import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

// A single source of truth for the application state
export const store = configureStore({
    reducer: {
        // We mount the todo reducer under the key 'todos'
        todos: todoReducer,
    },
    // Adding middleware to ensure non-serializable actions (like Date objects) don't cause issues, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});