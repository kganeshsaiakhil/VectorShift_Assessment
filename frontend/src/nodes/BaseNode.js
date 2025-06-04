// BaseNode.js
// This component provides a common abstraction for all node types

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const BaseNode = ({ 
  id, 
  data, 
  children, 
  title, 
  width = 220, 
  height = 'auto', 
  inputs = [], 
  outputs = [], 
  style = {}, 
  stateFields = {}
}) => {
  const theme = useTheme();

  // Initialize state for each field in stateFields
  const [state, setState] = useState(() => {
    const initialState = {};
    Object.keys(stateFields).forEach(key => {
      const field = stateFields[key];
      initialState[key] = data?.[field.dataKey] || field.defaultValue;
    });
    return initialState;
  });

  // Handler for state changes
  const handleStateChange = (key, value) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  };
  // Generate handlers for each field
  const handlers = {};
  Object.keys(stateFields).forEach(key => {
    handlers[`handle${key.charAt(0).toUpperCase() + key.slice(1)}Change`] = (e) => {
      handleStateChange(key, e.target.value);
    };
  });

  // Determine node type for styling
  const nodeType = title.toLowerCase();
  const getHeaderColor = () => {
    switch(nodeType) {
      case 'input': return theme.palette.primary.main;
      case 'output': return theme.palette.primary.dark;
      case 'llm': return theme.palette.secondary.main;
      case 'filter': return theme.palette.warning.main;
      case 'db query': return theme.palette.info.main;
      case 'image processing': return theme.palette.success.main;
      case 'data transform': return theme.palette.info.dark;
      case 'api call': return theme.palette.error.main;
      default: return theme.palette.grey[800];
    }
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        width, 
        minHeight: height,
        borderRadius: 2,
        overflow: 'hidden',
        ...style
      }}
      className="custom-node"
    >
      {/* Render input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ 
            top: input.position || `${((index + 1) * 100) / (inputs.length + 1)}%`, 
            background: theme.palette.primary.main,
            border: `2px solid ${theme.palette.background.paper}`,
            ...input.style 
          }}
        />
      ))}

      {/* Node title */}
      <Box sx={{ 
        bgcolor: getHeaderColor(), 
        color: 'white', 
        p: 1,
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
      }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {title}
        </Typography>
      </Box>      {/* Node content - either children or form fields */}
      <Box sx={{ p: 1.5 }}>
        {children || Object.keys(stateFields).map(key => {
          const field = stateFields[key];
          return (
            <Box key={key} sx={{ mb: 1 }}>
              {field.type === 'select' ? (
                <FormControl fullWidth size="small" variant="outlined" sx={{ mt: 1 }}>
                  <InputLabel id={`${id}-${key}-label`} size="small">{field.label}</InputLabel>
                  <Select
                    labelId={`${id}-${key}-label`}
                    value={state[key]}
                    onChange={handlers[`handle${key.charAt(0).toUpperCase() + key.slice(1)}Change`]}
                    size="small"
                    label={field.label}
                  >
                    {field.options.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField 
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  size="small"
                  type={field.type || "text"} 
                  value={field.value !== undefined ? field.value : state[key]} 
                  onChange={field.onChange || handlers[`handle${key.charAt(0).toUpperCase() + key.slice(1)}Change`]}
                  sx={{ mt: 1 }}
                  multiline={field.multiline || false}
                  minRows={field.minRows || 1}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Render output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ 
            top: output.position || `${((index + 1) * 100) / (outputs.length + 1)}%`, 
            background: theme.palette.secondary.main,
            border: `2px solid ${theme.palette.background.paper}`,
            ...output.style 
          }}
        />
      ))}
    </Paper>
  );
};
