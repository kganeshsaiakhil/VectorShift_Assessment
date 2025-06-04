// submit.js
import { Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const SubmitButton = () => {
    return (
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
            >
                Submit Pipeline
            </Button>
        </Box>
    );
}
