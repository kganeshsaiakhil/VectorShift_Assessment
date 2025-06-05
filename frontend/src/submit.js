// submit.js
import { useState } from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useStore } from './store';
import axios from 'axios';

export const SubmitButton = () => {
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/pipelines/parse', {
                nodes,
                edges
            });
            const { num_nodes, num_edges, is_dag } = response.data;
            setDialogContent(
                <>
                    <Typography variant="h6" gutterBottom>Pipeline Info</Typography>
                    <Typography>Nodes: {num_nodes}</Typography>
                    <Typography>Edges: {num_edges}</Typography>
                    <Typography>Is DAG: {is_dag ? 'Yes' : 'No'}</Typography>
                </>
            );
        } catch (err) {
            setDialogContent(
                <Typography color="error">Failed to submit pipeline.</Typography>
            );
        }
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Dialog open={dialogOpen} onClose={handleClose} disableEscapeKeyDown fullWidth maxWidth="xs">
                <DialogTitle>Pipeline Submission</DialogTitle>
                <DialogContent>
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus variant="contained">OK</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{ 
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 3,
                        }
                    }}
                    onClick={handleSubmit}
                >
                    Submit Pipeline
                </Button>
            </Box>
        </>
    );
}
