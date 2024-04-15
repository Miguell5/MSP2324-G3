import React from 'react';
import { styled } from '@mui/system';
import { Typography, Container, Box } from '@mui/material';
import backgroundImageCar from './../assets/blur-hospital.jpg';

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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '16px',
  borderRadius: '4px',
});

const Pagina = () => {
  return (
    <Root>
      <Container maxWidth="sm">
        <Overlay>
          <Typography variant="h3" gutterBottom>
            Seu Texto Aqui
          </Typography>
          <Typography variant="body1">
            Descrição do seu texto.
          </Typography>
        </Overlay>
      </Container>
    </Root>
  );
};

export default Pagina;
