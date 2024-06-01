import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const SymptomForm = ({ onSubmitSymptoms, onBack }) => {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSymptoms(symptoms);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Describe your Symptoms in detail</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        margin="normal"
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit" sx={{ mr: 1 }}>
          Submit
        </Button>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default SymptomForm;
