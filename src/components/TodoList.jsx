import React from 'react';
import { Box, Typography, List, Button, Grow, Paper } from '@mui/material';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  pendingTodos,
  completedTodos,
  onEdit,
  onDelete,
  onToggleComplete,
  editingTodoId,
  onClearCompleted,
}) => {
  return (
    <Box>
      {/* pending */}
      <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Pending Tasks
        </Typography>
        <List>
          {pendingTodos.map(todo => (
            <Grow in={true} key={todo.id} timeout={500}>
              <div>
                <TodoItem
                  todo={todo}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                  editingTodoId={editingTodoId}
                />
              </div>
            </Grow>
          ))}
        </List>
      </Paper>

      {/* completed */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Completed Tasks
        </Typography>
        <List>
          {completedTodos.map(todo => (
            <Grow in={true} key={todo.id} timeout={500}>
              <div>
                <TodoItem
                  todo={todo}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                  editingTodoId={editingTodoId}
                />
              </div>
            </Grow>
          ))}
        </List>
        {completedTodos.length > 0 && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={onClearCompleted}
            sx={{ mt: 3 }} 
          >
            Clear All Completed
          </Button>
        )}
      </Paper>
    </Box>
  );
};