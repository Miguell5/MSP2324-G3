import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
//
import arm from './../assets/arm.png';
import bmi from './../assets/bmi.png';
import cholestrol from './../assets/cholesterol.png';
import heart from './../assets/heart.png';
import oximeter from './../assets/pulse-oximeter.png';
import weighing from './../assets/weighing-machine.png';
//
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const options = ["Blood pressure","Cholesterol","Heart Rate","Oximetry","Weight","BMI"];

export default function HealthPage() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  
    const handleClickOpen = (option) => {
      setOpen(true);
      setText(option);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
  <>
    <Box sx={{ width: '100%', marginTop:"2%", marginLeft:"2%" }}>
      <Grid container spacing={2}>
        {options.map((option) => (
              
          <Grid item xs={12} sm={5} key={option} onClick={()=>handleClickOpen(option)}>
            <Item>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0}
              >
              <Avatar
                src={option==="Blood pressure"?arm:( option==="Cholesterol"?cholestrol:( option==="Heart Rate"?heart:(( option==="Oximetry"?oximeter:(( option==="BMI"?bmi:(weighing)))))))}
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,width: "70px", height: "70px"}} 
                alt="Clinic Logo"
              />
              <Grid container  direction="column"
                justifyContent="center"
                alignItems="flex-start"
                height="100%">
                <Grid item >
                  <Typography variant="h4" gutterBottom>
                    {option}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    150
                  </Typography>
                </Grid>
              </Grid>
                
              
              </Stack>
            </Item>
          </Grid>
        ))}
        

      </Grid>
    </Box>
    <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {text}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>

      </>
  );
  
}