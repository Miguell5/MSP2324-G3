import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Modal, Backdrop, Fade } from '@mui/material';

const DisplayTriageData = () => {
  const [step, setStep] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [open, setOpen] = useState(false); // State for modal open/close

  useEffect(() => {
    const savedStep = localStorage.getItem('step');
    const savedCategory = localStorage.getItem('selectedCategory');
    const savedSymptoms = localStorage.getItem('symptoms');
    const savedConfirmed = localStorage.getItem('confirmed');

    if (savedStep) setStep(Number(savedStep));
    if (savedCategory) setSelectedCategory(savedCategory);
    if (savedSymptoms) setSymptoms(savedSymptoms);
    if (savedConfirmed) setConfirmed(JSON.parse(savedConfirmed));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={2} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" gutterBottom>Triage Request</Typography>
        <Typography variant="h6">Step: {step}</Typography>
        <Typography variant="h6">Selected Category: {selectedCategory}</Typography>
        <Typography variant="h6">Symptoms: {symptoms}</Typography>
        <Typography variant="h6">Confirmed: {confirmed ? 'Yes' : 'No'}</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
          Doctor Review
        </Button>
      </Box>

      <Modal
        aria-labelledby="doctor-comments-title"
        aria-describedby="doctor-comments-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Fade in={open}>
          <Box
            p={4}
            bgcolor="white"
            borderRadius={2}
            boxShadow={3}
            maxWidth="sm"
            mx="auto"
            mt={10}
          >
            <Typography id="doctor-comments-title" variant="h6" gutterBottom>
              Doctor review
            </Typography>
            <Typography id="doctor-comments-description" variant="body1">
              Triage request not reviewed yet
            </Typography>
            <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default DisplayTriageData;
