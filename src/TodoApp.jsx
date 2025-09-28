import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; // <--- New Import
import { 
    addTodo, deleteTodo, toggleComplete, updateTodo, clearCompleted, 
    selectNextId, selectPendingTodos, selectCompletedTodos // <--- New Selectors
} from './redux/todoSlice';
import { TodoInput } from './components/TodoInput.jsx';
import { TodoList } from './components/TodoList.jsx';


function TodoApp() {
    // Step 2: Access state and dispatch functions from Redux
    const pendingTodos = useSelector(selectPendingTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const nextId = useSelector(selectNextId); 
    const dispatch = useDispatch();

    // Local state remains for input fields and UI messages
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDate, setNewTodoDate] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    
    const handleAddOrUpdateTodo = () => {
        if (!newTodoTitle.trim()) return;

        const now = new Date();
        const dueDate = newTodoDate ? new Date(newTodoDate) : null;
        
        if (dueDate && dueDate < now) {
            setOpenSnackbar(true);
            return;
        }

        if (editingTodoId) {
            // Dispatching the action to Redux Store
            dispatch(updateTodo({ 
                id: editingTodoId, 
                title: newTodoTitle, 
                dueDate: newTodoDate 
            }));
            setEditingTodoId(null);
        } else {
            // Dispatching the action to Redux Store
            dispatch(addTodo({
                id: nextId,
                title: newTodoTitle,
                dueDate: newTodoDate || 'No due date',
                completed: false,
            }));
        }
        setNewTodoTitle('');
        setNewTodoDate('');
    };

    const handleEditTodo = (id) => {
        const todoToEdit = pendingTodos.find(todo => todo.id === id) || completedTodos.find(todo => todo.id === id);
        if (todoToEdit) {
            setNewTodoTitle(todoToEdit.title);
            setNewTodoDate(todoToEdit.dueDate === 'No due date' ? '' : todoToEdit.dueDate);
            setEditingTodoId(id);
        }
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleComplete(id));
    };

    const handleClearCompleted = () => {
        dispatch(clearCompleted());
    };
    
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        <React.Fragment>
            <TodoInput
                newTodoTitle={newTodoTitle}
                setNewTodoTitle={setNewTodoTitle}
                newTodoDate={newTodoDate}
                setNewTodoDate={setNewTodoDate}
                editingTodoId={editingTodoId}
                handleAddOrUpdateTodo={handleAddOrUpdateTodo}
            />

            <TodoList
                pendingTodos={pendingTodos}
                completedTodos={completedTodos}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
                onToggleComplete={handleToggleComplete}
                editingTodoId={editingTodoId}
                onClearCompleted={handleClearCompleted}
            />

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Due date cannot be in the past. Please select a future date.
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default TodoApp;
