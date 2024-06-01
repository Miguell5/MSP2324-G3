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
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ViewListIcon from '@mui/icons-material/ViewList';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PaymentIcon from '@mui/icons-material/Payment';
import PasswordIcon from '@mui/icons-material/Password';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import DialogCreateDoctorAccount from './../components/DialogCreateDoctorAccount';

function Profile({username}) {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const [open,setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
    
      <Grid container spacing={2} sx={{margin:"2%", marginBottom:"150px"}}>
        <Grid item xs={12} sm={4} >
          <Avatar sx={{height:"20vh",width:"20vh", margin:"auto"}}/>
        </Grid>
        <Grid item  xs={12} sm={8} justifyContent="center" alignItems="flex-start">
        <Stack spacing={2} sx={{ textAlign: isXsScreen ? 'center' : 'left',height:"100%" }} justifyContent={isXsScreen ? 'center' : 'center'} alignItems={isXsScreen ? 'center' : 'flex-start'}>
          <Typography variant="h4" gutterBottom>
            {username}
          </Typography>
          <Typography variant="h6" gutterBottom>
            rms.costa@campus.fct.unl.pt
          </Typography>
          <Typography variant="h6" gutterBottom>
            <b>Admin</b>
          </Typography>
        </Stack>
        </Grid>
        <Grid item xs="12" sx={{marginTop:"2%"}}>
          <Stack spacing={2} direction="row" >
            <Typography variant="h5" gutterBottom>
              My settings
            </Typography>
          </Stack>
          <Grid container direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}>
  
            <Grid item >
              <Button variant="outlined" startIcon={<HealthAndSafetyIcon/>}>Insurance</Button>
            </Grid>
            <Grid item >
              <Button variant="outlined" startIcon={<PaymentIcon/>}>Payment Method</Button>
            </Grid>
            <Grid item >
              <Button variant="outlined" startIcon={<PasswordIcon/>}>Change Pin Code</Button>
            </Grid>
            <Grid item >
              <Button variant="outlined" startIcon={<FamilyRestroomIcon/>}>Familiy</Button>
            </Grid>

          </Grid>

        </Grid>
        <Grid item xs="12" sx={{marginTop:"2%"}}>
          
          <Stack spacing={2} direction="row" >
          <Typography variant="h5" gutterBottom>
            System Management <i>(Admin only)</i>
          </Typography>
          
          </Stack>
          <Grid container direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}>
  
            <Grid item >
              <Button variant="outlined" startIcon={<PersonAddIcon />} onClick={handleClickOpen}>Create doctor account</Button>
            </Grid>
            <Grid item >
              <Button variant="outlined" startIcon={<ViewListIcon />}>Accounts List</Button>
            </Grid>

          </Grid>
          
        </Grid>

      </Grid>
      <DialogCreateDoctorAccount open={open} setOpen={setOpen}/>
      
    </>
  )
}

export default Profile;
