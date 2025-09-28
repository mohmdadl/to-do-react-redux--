import { createSlice } from '@reduxjs/toolkit';

//Local Storage Management
const loadTodosFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return [
                { id: 1, title: 'Learn Redux Toolkit', dueDate: '2025-10-01T10:00', completed: false },
                { id: 2, title: 'Refactor Todo App', dueDate: '2025-09-29T12:00', completed: true },
            ];
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load todos from local storage", e);
        return [];
    }
};

const saveTodosToLocalStorage = (todos) => {
    try {
        const serializedState = JSON.stringify(todos);
        localStorage.setItem('todos', serializedState);
    } catch (e) {
        console.warn("Could not save todos to local storage", e);
    }
};

// ID Management
const getNextId = (todos) => {
    // If todos is empty, start from 1. or, find the max ID and add 1.
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
};


const todoSlice = createSlice({
    name: 'todos',
    initialState: loadTodosFromLocalStorage(),
    reducers: {
        addTodo: (state, action) => {
            const newTodo = action.payload;
            state.push(newTodo);
            saveTodosToLocalStorage(state);
        },

        deleteTodo: (state, action) => {
            const idToDelete = action.payload;
            const newState = state.filter(todo => todo.id !== idToDelete);
            saveTodosToLocalStorage(newState);
            return newState;
        },

        toggleComplete: (state, action) => {
            const idToToggle = action.payload;
            const todo = state.find(t => t.id === idToToggle);
            if (todo) {
                todo.completed = !todo.completed;
            }
            saveTodosToLocalStorage(state);
        },

        updateTodo: (state, action) => {
            const { id, title, dueDate } = action.payload;
            const todo = state.find(t => t.id === id);
            if (todo) {
                todo.title = title;
                todo.dueDate = dueDate || 'No due date';
            }
            saveTodosToLocalStorage(state);
        },

        clearCompleted: (state) => {
            const newState = state.filter(todo => !todo.completed);
            saveTodosToLocalStorage(newState);
            return newState;
        }
    },
});

// Export Actions and Reducer
export const { addTodo, deleteTodo, toggleComplete, updateTodo, clearCompleted } = todoSlice.actions;

// Selector to get the next ID
export const selectNextId = (state) => getNextId(state.todos);

// Selectors for filtered lists
export const selectPendingTodos = (state) => state.todos.filter(todo => !todo.completed);
export const selectCompletedTodos = (state) => state.todos.filter(todo => todo.completed);

export default todoSlice.reducer;