import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



function Loading() {
    return (
        <Box sx={{ position: 'fixed',top:'50%',left:'50%'}}>
          <CircularProgress />
        </Box>
      );
}

export default Loading;
