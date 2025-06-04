// BaseNode.js
// This component provides a common abstraction for all node types

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  children, 
  title, 
  width = 200, 
  height = 80, 
  inputs = [], 
  outputs = [], 
  style = {}, 
  stateFields = {}
}) => {
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

  return (
    <div style={{ 
      width, 
      height, 
      border: '1px solid black',
      ...style 
    }}>
      {/* Render input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: input.position || `${((index + 1) * 100) / (inputs.length + 1)}%`, ...input.style }}
        />
      ))}

      {/* Node title */}
      <div>
        <span>{title}</span>
      </div>

      {/* Node content - either children or form fields */}
      <div>
        {children || Object.keys(stateFields).map(key => {
          const field = stateFields[key];
          return (
            <label key={key}>
              {field.label}:
              {field.type === 'select' ? (
                <select 
                  value={state[key]} 
                  onChange={handlers[`handle${key.charAt(0).toUpperCase() + key.slice(1)}Change`]}
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input 
                  type={field.type || "text"} 
                  value={state[key]} 
                  onChange={handlers[`handle${key.charAt(0).toUpperCase() + key.slice(1)}Change`]}
                />
              )}
            </label>
          );
        })}
      </div>

      {/* Render output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: output.position || `${((index + 1) * 100) / (outputs.length + 1)}%`, ...output.style }}
        />
      ))}
    </div>
  );
};
