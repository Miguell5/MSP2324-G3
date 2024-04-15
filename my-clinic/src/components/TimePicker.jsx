import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer components={['DateTimePicker']}>
        <TimePicker label="Basic time picker" 
        sx={{ backgroundColor: 'white' }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
