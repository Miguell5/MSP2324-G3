import React from 'react';
import { styled } from '@mui/system';
import { Typography, Container, Box } from '@mui/material';
import backgroundImageCar from './../assets/blur-hospital.jpg';
import Button from '@mui/material/Button';

const Root = styled('div')({
  position: 'relative',
  textAlign: 'center',
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${backgroundImageCar})`,  // Replace with the actual path to your background image          
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Overlay = styled('div')({
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '16px',

});

const Pagina = () => {
  return (
    <Root>
      <Container maxWidth="sm">
        <Overlay>
          <Typography variant="h3" gutterBottom color='#3373d6'>
            A cuidar de si
          </Typography>
          <Typography variant="body1" color='#3373d6'>
            Desde 2002
          </Typography>
          <Button variant="contained" sx={{marginTop:5,borderRadius:10}}>Saiba mais</Button>

        </Overlay>

      </Container>
    </Root>
  );
};

export default Pagina;
