import * as React from 'react';
import moment from 'moment'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

export default function BasicDatePicker({ selectedDate, onChange }) {
  const today = moment().add(1, 'day');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer components={['DateTimePicker']}>
        <DatePicker
          label="Please pick a date"
          minDate={today}
          value={selectedDate}
          onChange={onChange}
          sx={{ backgroundColor: 'white' }}
        />
        <TimePicker
          label="Please pick a time"
          value={selectedDate}
          onChange={onChange}
          sx={{ backgroundColor: 'white' }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
