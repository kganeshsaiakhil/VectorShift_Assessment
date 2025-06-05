// toolbar.js

import { DraggableNode } from './draggableNode';
import { Paper, Typography, Box, Divider } from '@mui/material';

export const PipelineToolbar = () => {
    return (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Box mb={2}>
                <Typography variant="h6" fontWeight="bold" mb={1} color="primary">
                    Basic Nodes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box mt={2}>
                <Typography variant="h6" fontWeight="bold" mb={1} color="secondary">
                    Advanced Nodes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    <DraggableNode type='filter' label='Filter' />
                    <DraggableNode type='dbQuery' label='DB Query' />
                    <DraggableNode type='imageProcessing' label='Image Processing' />
                    <DraggableNode type='dataTransform' label='Data Transform' />
                    <DraggableNode type='api' label='API Call' />
                </Box>
            </Box>
        </Paper>
    );
};
