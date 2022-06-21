import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountMenu from './MenuIntro';
import { useNavigate } from 'react-router-dom';
import { axiosDefaults } from './axios';
import axios from 'axios';

const theme = createTheme();

export default function SignIn({ handleSignin }) {
  const [error, setError] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const saveUser = () => {
    if (!userInput || !passwordInput) {
      setError(true);
      return;
    }
    const loginData = {
      username: userInput,
      password: passwordInput,
    };
    axios.post(`users/login`, loginData, axiosDefaults).then(({ data }) => {
      if (data) handleSignin(data);
      else setError(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5' sx={{ fontSize: 30, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate>
            <TextField
              value={userInput || ''}
              onChange={(event) => setUserInput(event.target.value)}
              error={error}
              helperText={error ? 'Invalid data' : ''}
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoFocus
            />
            <TextField
              value={passwordInput || ''}
              error={error}
              helperText={error ? 'Invalid data' : ''}
              onChange={({ target }) => setPasswordInput(target.value)}
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
            />
            <Button onClick={saveUser} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
