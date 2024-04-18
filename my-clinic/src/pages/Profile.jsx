import { useState } from 'react'
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
function Profile() {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <>
    
      <Grid container spacing={2} sx={{marginTop :"2%"}}>
        <Grid item xs={12} sm={4} >
          <Avatar sx={{height:"30vh",width:"30vh", margin:"auto"}}/>
        </Grid>
        <Grid item  xs={12} sm={8} justifyContent="center" alignItems="flex-start">
        <Stack spacing={2} sx={{ textAlign: isXsScreen ? 'center' : 'left',height:"100%" }} justifyContent={isXsScreen ? 'center' : 'center'} alignItems={isXsScreen ? 'center' : 'flex-start'}>
          <Typography variant="h4" gutterBottom>
            Rafael Costa
          </Typography>
          <Typography variant="h6" gutterBottom>
            rms.costa@campus.fct.unl.pt
          </Typography>
        </Stack>
        </Grid>
        <Grid item xs="12" >
          <Stack spacing={2} direction="row" sx={{margin:"2%"}}>
            <Button variant="outlined">Insurance</Button>
            <Button variant="outlined">Payment Method</Button>
            <Button variant="outlined">Change Pin Code</Button>
            <Button variant="outlined">Familiy</Button>
          </Stack>
        </Grid>

      </Grid>
    
      
    </>
  )
}

export default Profile
