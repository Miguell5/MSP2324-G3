import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Confirmation = ({ symptoms, onConfirm, onBack }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>Confirm Information</Typography>
      <Typography variant="body1">{symptoms}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onConfirm} sx={{ mr: 1 }}>
          Confirm
        </Button>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
      </Box>
    </div>
  );
};

export default Confirmation;
