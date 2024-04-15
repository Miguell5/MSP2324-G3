import * as React from 'react';
import moment from 'moment'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker() {
  const today = moment(); 

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer components={['DateTimePicker']}>
        <DatePicker
          label="Please pick a date"
          minDate={today}
          sx={{ backgroundColor: 'white' }} // Definir o fundo como branco
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
