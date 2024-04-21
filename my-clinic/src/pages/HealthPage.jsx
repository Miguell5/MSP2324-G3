import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import BloodPressure from './../assets/logoMyClinic.png';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const options = ["Blood pressure","Cholesterol","Heart Rate","Oximetry","Weight","BMI"];

export default function HealthPage() {
  return (
    <Box sx={{ width: '100%', marginTop:"2%", marginLeft:"2%" }}>
      <Grid container spacing={2}>
        {options.map((option) => (
              
          <Grid item xs={12} sm={4}>
            <Item>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0}
              >
              <Avatar
                src={BloodPressure}
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,width: "200px", height: "200px"}} 
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
  );
}