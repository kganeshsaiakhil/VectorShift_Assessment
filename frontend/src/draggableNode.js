// draggableNode.js
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const DraggableNode = ({ type, label }) => {
    const theme = useTheme();
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    // Determine color based on node type
    const getNodeColor = () => {
      const basicNodes = ['customInput', 'customOutput', 'llm', 'text'];
      return basicNodes.includes(type) 
        ? theme.palette.primary.main
        : theme.palette.secondary.main;
    };
  
    return (
      <Paper
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        sx={{ 
          cursor: 'grab', 
          minWidth: '90px',
          height: '65px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: getNodeColor(),
          borderRadius: 2,
          boxShadow: 2,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
          }
        }} 
        draggable
      >
        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'medium' }}>
          {label}
        </Typography>
      </Paper>
    );
};

  