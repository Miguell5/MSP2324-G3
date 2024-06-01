import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Avatar } from '@mui/material';
import ClinicLogo from '../assets/logoMyClinic.png';
import ImagePlaceholder from '../assets/img_medicos.png';
import { useNavigate } from "react-router-dom";

function LoginPage({ setLoginState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function logIn() {
    localStorage.setItem("login", JSON.stringify({ name: username }));
    setLoginState(true);
  }

  return (
    <Grid container spacing={2} 
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item md={8} sx={{ display: { xs: 'none', md: 'block' } }}>
        <img src={ImagePlaceholder} alt="Placeholder" style={{ width: 500, height: 'auto' }} />
      </Grid>
      <Grid item xs={12} md={4} justifyContent="center" alignItems="center">
        <Paper
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: "100%",
            margin: "10%"
          }}
          elevation={3}
        >
          <Avatar
            src={ClinicLogo}
            alt="Clinic Logo"
            sx={{ width: 150, height: 150, marginBottom: 3 }}
          />

          <TextField
            style={{ margin: 10, width: '100%' }}
            label="Username"
            variant="outlined"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{ margin: 10, width: '100%' }}
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            style={{ margin: '20px 0' }}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => logIn()}
          >
            Sign In
          </Button>

          <Typography variant="caption" display="block" onClick={() => navigate("/sign-up")} gutterBottom>
            Sign Up
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
