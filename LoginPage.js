import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { AppContext } from '../context/AppContext';

function LoginPage() {
  const navigate = useNavigate();
  const { setFaculty } = useContext(AppContext);
  const [loginType, setLoginType] = useState(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Test credentials
  const testCredentials = {
    admin: { username: 'admin', password: 'admin123' },
    faculty: { 
      username: 'faculty', 
      password: 'faculty123',
      faculty: {
        id: 1,
        name: 'John Doe',
        department: 'Computer Science',
        email: 'john.doe@school.edu',
        phone: '1234567890'
      }
    },
    student: { username: 'student', password: 'student123' }
  };

  const handleLogin = (type) => {
    setLoginType(type);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { username, password } = credentials;
    const testCreds = testCredentials[loginType];

    if (username === testCreds.username && password === testCreds.password) {
      if (loginType === 'admin') {
        navigate('/admin');
      } else if (loginType === 'faculty') {
        setFaculty(testCreds.faculty);
        navigate('/faculty');
      } else if (loginType === 'student') {
        navigate('/student');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Smart Scholars
        </Typography>
        
        {!loginType ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Admin Login</Typography>
                  
                </CardContent>
                <CardActions>
                  <Button fullWidth onClick={() => handleLogin('admin')}>
                    Login as Admin
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Faculty Login</Typography>
                  
                </CardContent>
                <CardActions>
                  <Button fullWidth onClick={() => handleLogin('faculty')}>
                    Login as Faculty
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Student Login</Typography>
                 
                </CardContent>
                <CardActions>
                  <Button fullWidth onClick={() => handleLogin('student')}>
                    Login as Student
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Typography variant="h5" gutterBottom>
              {`Login as ${loginType.charAt(0).toUpperCase() + loginType.slice(1)}`}
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => setLoginType(null)}
              >
                Back
              </Button>
            </form>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default LoginPage; 