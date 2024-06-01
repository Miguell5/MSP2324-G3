import React, { useState } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, TextField, Button, CircularProgress } from '@mui/material';
import CategoryList from '../components/CategoryList';
import SymptomForm from '../components/SymptomFrom';
import Confirmation from '../components/Confirmation';
import Success from '../components/Sucess';

const RemoteTriagePage = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleSymptomSubmit = (symptoms) => {
    setSymptoms(symptoms);
    setStep(3);
  };

  const handleConfirmation = () => {
    setConfirmed(true);
    setStep(4);
  };

  return (
    <Container maxWidth="sm" >
      <Box mt={4} p={2} boxShadow={3} borderRadius={2} bgcolor="white" sx={{marginBottom:"90px"}}>
        {step === 1 && <CategoryList onSelectCategory={handleCategorySelect} />}
        {step === 2 && <SymptomForm onSubmitSymptoms={handleSymptomSubmit} onBack={() => setStep(1)} />}
        {step === 3 && <Confirmation symptoms={symptoms} onConfirm={handleConfirmation} onBack={() => setStep(2)} />}
        {step === 4 && !confirmed && <Loading />}
        {step === 4 && confirmed && <Success />}
      </Box>
    </Container>
  );
};

const Loading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <CircularProgress />
  </Box>
);

export default RemoteTriagePage;