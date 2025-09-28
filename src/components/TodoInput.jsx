import React from 'react';
import { Box, Grid, TextField, Button, Paper, useTheme, Stack } from '@mui/material';

export const TodoInput = ({
  newTodoTitle,
  setNewTodoTitle,
  newTodoDate,
  setNewTodoDate,
  editingTodoId,
  handleAddOrUpdateTodo,
}) => {
  const theme = useTheme();

  return (
    <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 2 }}>

      <Stack spacing={3}> 
        <TextField
          fullWidth
          label="Todo Title"
          variant="outlined"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          required
          sx={{ '& fieldset': { borderRadius: '8px' } }}
        />
        
        <TextField
          fullWidth
          label="Todo Due Date"
          type="datetime-local"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={newTodoDate}
          onChange={(e) => setNewTodoDate(e.target.value)}
          sx={{ '& fieldset': { borderRadius: '8px' } }}
        />
        
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleAddOrUpdateTodo}
          sx={{ 
            backgroundColor: theme.palette.custom.add, 
            '&:hover': { opacity: 0.9, transform: 'scale(1.01)' },
            transition: 'transform 0.2s',
            borderRadius: '8px',
            boxShadow: theme.shadows[4] 
          }}
        >
          {editingTodoId ? 'SAVE EDIT' : 'ADD TODO'}
        </Button>
      </Stack>
    </Paper>
  );
};