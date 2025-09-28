import React, { useState } from 'react';
import {
  Grid, Paper, ListItemText, Typography, Box, Button, IconButton, useTheme, Collapse
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const TodoItem = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
  editingTodoId, 
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  
  const isEditing = todo.id === editingTodoId;

  return (
    <Paper
      key={todo.id}
      elevation={1}
      sx={{
        mb: 2,
        p: 2,
        bgcolor: isEditing ? theme.palette.action.hover : 'background.paper',
        transition: 'background-color 0.5s ease', 
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={10}>
          <ListItemText
            primary={
              <Typography variant="body1" sx={todo.completed ? { textDecoration: 'line-through', fontStyle: 'italic' } : {}}>
                {todo.id}. {todo.title} - {todo.dueDate}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'right' }}>
          <IconButton onClick={handleExpandClick}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              {todo.completed ? (
                <Button
                  variant="contained"
                  onClick={() => onToggleComplete(todo.id)}
                  sx={{ backgroundColor: theme.palette.custom.undo, '&:hover': { opacity: 0.8 } }}
                >
                  UNDO
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => onToggleComplete(todo.id)}
                  sx={{ backgroundColor: theme.palette.custom.complete, '&:hover': { opacity: 0.8 } }}
                >
                  COMPLETE
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => onEdit(todo.id)}
                sx={{
                  backgroundColor: theme.palette.custom.edit,
                  '&:hover': { opacity: 0.8 },
                  ...(todo.completed && { opacity: 0.5 }),
                }}
                disabled={todo.completed}
              >
                EDIT
              </Button>
              <Button
                variant="contained"
                onClick={() => onDelete(todo.id)}
                sx={{ backgroundColor: theme.palette.custom.delete, '&:hover': { opacity: 0.8 } }}
              >
                DELETE
              </Button>
            </Box>
          </Collapse>
        </Grid>
      </Grid>
    </Paper>
  );
};