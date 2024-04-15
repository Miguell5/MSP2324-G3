import React from 'react';
import { Container, Paper, Typography, TextField, Button, Grid,Avatar } from '@mui/material';
import ClinicLogo from '../assets/logoMyClinic.png';
import ImagePlaceholder from '../assets/img_medicos.png';
import { useNavigate } from "react-router-dom";

function SignUp(){
  const navigate = useNavigate();
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
        <Typography variant="h6" gutterBottom>
          Welcome to our comunity
        </Typography>
        <TextField
          style={{ margin: 10, width: '100%' }}
          label="First Name"
          variant="outlined"
          size="small"
        />
        <TextField
          style={{ margin: 10, width: '100%' }}
          label="Last Name"
          variant="outlined"
          size="small"
        />
        <TextField
          style={{ margin: 10, width: '100%' }}
          label="Email"
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
        <TextField
          style={{ margin: 10, width: '100%' }}
          label="Password confirmation"
          type="password"
          variant="outlined"
          size="small"
        />
        <Button
          style={{ margin: '20px 0' }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={()=>navigate("/")}
        >
          Sign Up
        </Button>

        <Typography variant="caption" display="block" onClick={()=>navigate("/")} gutterBottom>
          Sign In
        </Typography>

      </Paper>
      </Grid>
    </Grid>
      
  );
};

export default SignUp;

