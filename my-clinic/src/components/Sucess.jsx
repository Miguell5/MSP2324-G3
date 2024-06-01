import React from 'react';
import { Typography, Box } from '@mui/material';

const Success = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6" gutterBottom>Success! A doctor will review the triage request shortly.</Typography>
    </Box>
  );
};

export default Success;
