import React from 'react';
import { Container, Paper, Typography, TextField, Button, Grid,Avatar } from '@mui/material';
import ClinicLogo from '../assets/logoMyClinic.png';
import ImagePlaceholder from '../assets/img_medicos.png';

function LoginPage({setLoginState}){
  return (

    <Grid container spacing={2} 
    direction="row"
    justifyContent="center" // Alterado para centralizar horizontalmente
    alignItems="center"
    sx={{height:"100vh"}}>

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
          maxWidth:"100%",
          margin: "10%"
        }}
        elevation={3}
      >
      <Avatar
            src={ClinicLogo}
            alt="Clinic Logo"
            sx={{ width: 150, height: 150, marginBottom: 3 }} // Ajuste o tamanho e margens conforme necessário
          />

        <TextField
          style={{ margin: 10, width: '100%' }}
          label="Username"
          variant="outlined"
          size="small"
        />
        <TextField
          style={{ margin: 10, width: '100%' }}
          label="Password"
          type="password"
          variant="outlined"
          size="small"
        />
        <Button
          style={{ margin: '20px 0' }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setLoginState(true)}
        >
          Sign In
        </Button>
      </Paper>
      </Grid>
    </Grid>
      
  );
};

export default LoginPage;

