import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Box, Typography } from '@mui/material';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <Box>
      <Typography variant='h4'component='div'>AuthPage</Typography>
      <Box>
        <Button variant="contained" onClick={() => navigate('/register')}>Register</Button>
        <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
      </Box>
    </Box>
  );
};

export default AuthPage;