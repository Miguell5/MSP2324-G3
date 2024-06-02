import React, { useState,useEffect } from 'react';
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
  const [existingRequest, setExistingRequest] = useState(false); // State for existing request

  // Check localStorage for existing data on mount
  useEffect(() => {
    const savedStep = localStorage.getItem('step');
    const savedCategory = localStorage.getItem('selectedCategory');
    const savedSymptoms = localStorage.getItem('symptoms');
    const savedConfirmed = localStorage.getItem('confirmed');
    const defaultStep = 1;
    const defaultCategory = 'null';
    const defaultSymptoms = '';
    const defaultConfirmed = false;
  
    // console.log(defaultStep.toString());
    // console.log(defaultCategory);
    // console.log(defaultSymptoms);
    // console.log(defaultConfirmed.toString());

    // console.log(savedStep);
    // console.log(savedCategory);
    // console.log(savedSymptoms);
    // console.log(savedConfirmed);


    if (
      savedStep !== null && savedStep !== defaultStep.toString() ||
      savedCategory !== null && savedCategory !== defaultCategory ||
      savedSymptoms !== null && savedSymptoms !== defaultSymptoms ||
      savedConfirmed !== null && savedConfirmed !== defaultConfirmed.toString()
    ) {
      setExistingRequest(true);
      localStorage.setItem('info', '1');
    }

    if(savedStep === null && savedCategory === null && savedSymptoms === null && savedConfirmed === null){
      localStorage.setItem('info', '2');
      setExistingRequest(false);
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    const info = localStorage.getItem('info');

    if(info != '1'){
      console.log("STORA");
      localStorage.setItem('step', step);
      localStorage.setItem('selectedCategory', selectedCategory);
      localStorage.setItem('symptoms', symptoms);
      localStorage.setItem('confirmed', confirmed);

    }
   
  }, [step, selectedCategory, symptoms, confirmed]);

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

  if (existingRequest) {
    return (
      <Container maxWidth="sm">
        <Box mt={4} p={2} boxShadow={3} borderRadius={2} bgcolor="white">
          <Typography variant="h6" color="error" gutterBottom>
            Warning: There is already a pending triage request. You cannot submit a new one until the current request is processed.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{minHeight:"1000px"}}>
      <Box mt={4} p={2} boxShadow={3} borderRadius={2} bgcolor="white">
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