import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const dados_peso = [
  { id: 1, date: '02/09/2022', hour: '15:00', weight: 70.5 },
  { id: 2, date: '03/09/2022', hour: '09:00', weight: 71.0 },
  { id: 3, date: '04/09/2022', hour: '11:00', weight: 70.8 },
  { id: 4, date: '05/09/2022', hour: '14:00', weight: 70.3 },
  { id: 5, date: '06/09/2022', hour: '10:00', weight: 70.7 },
  { id: 6, date: '07/09/2022', hour: '08:00', weight: 70.4 },
  { id: 7, date: '08/09/2022', hour: '13:00', weight: 70.9 },
  { id: 8, date: '09/09/2022', hour: '16:00', weight: 71.2 },
  { id: 9, date: '10/09/2022', hour: '12:00', weight: 70.6 },
];

const dados_pressao_arterial = [
  { id: 1, date: '02/09/2022', hour: '15:00', sistolica: 120, diastolica: 80 },
  { id: 2, date: '03/09/2022', hour: '09:00', sistolica: 130, diastolica: 85 },
  { id: 3, date: '04/09/2022', hour: '11:00', sistolica: 125, diastolica: 82 },
  { id: 4, date: '05/09/2022', hour: '14:00', sistolica: 135, diastolica: 88 },
  { id: 5, date: '06/09/2022', hour: '10:00', sistolica: 110, diastolica: 75 },
  { id: 6, date: '07/09/2022', hour: '08:00', sistolica: 140, diastolica: 90 },
  { id: 7, date: '08/09/2022', hour: '13:00', sistolica: 115, diastolica: 78 },
  { id: 8, date: '09/09/2022', hour: '16:00', sistolica: 128, diastolica: 83 },
  { id: 9, date: '10/09/2022', hour: '12:00', sistolica: 130, diastolica: 85 },
];

const dados_colestrol = [
  { id: 1, date: '02/09/2022', hour: '15:00', value: 150 },
  { id: 2, date: '03/09/2022', hour: '09:00', value: 180 },
  { id: 3, date: '04/09/2022', hour: '11:00', value: 160 },
  { id: 4, date: '05/09/2022', hour: '14:00', value: 170 },
  { id: 5, date: '06/09/2022', hour: '10:00', value: 155 },
  { id: 6, date: '07/09/2022', hour: '08:00', value: 190 },
  { id: 7, date: '08/09/2022', hour: '13:00', value: 165 },
  { id: 8, date: '09/09/2022', hour: '16:00', value: 175 },
  { id: 9, date: '10/09/2022', hour: '12:00', value: 180 },
];

const dados_oximetria = [
  { id: 1, date: '02/09/2022', hour: '15:00', oximetry: 98 },
  { id: 2, date: '03/09/2022', hour: '09:00', oximetry: 97 },
  { id: 3, date: '04/09/2022', hour: '11:00', oximetry: 96 },
  { id: 4, date: '05/09/2022', hour: '14:00', oximetry: 99 },
  { id: 5, date: '06/09/2022', hour: '10:00', oximetry: 95 },
  { id: 6, date: '07/09/2022', hour: '08:00', oximetry: 100 },
  { id: 7, date: '08/09/2022', hour: '13:00', oximetry: 98 },
  { id: 8, date: '09/09/2022', hour: '16:00', oximetry: 97 },
  { id: 9, date: '10/09/2022', hour: '12:00', oximetry: 96 },
];

const dados_frequencia_cardiaca = [
  { id: 1, date: '02/09/2022', hour: '15:00', frequency: 72 },
  { id: 2, date: '03/09/2022', hour: '09:00', frequency: 75 },
  { id: 3, date: '04/09/2022', hour: '11:00', frequency: 70 },
  { id: 4, date: '05/09/2022', hour: '14:00', frequency: 68 },
  { id: 5, date: '06/09/2022', hour: '10:00', frequency: 76 },
  { id: 6, date: '07/09/2022', hour: '08:00', frequency: 74 },
  { id: 7, date: '08/09/2022', hour: '13:00', frequency: 71 },
  { id: 8, date: '09/09/2022', hour: '16:00', frequency: 69 },
  { id: 9, date: '10/09/2022', hour: '12:00', frequency: 73 },
];

const dados_bmi = [
  { id: 1, date: '02/09/2022', hour: '15:00', bmi: 22.5 },
  { id: 2, date: '03/09/2022', hour: '09:00', bmi: 23.0 },
  { id: 3, date: '04/09/2022', hour: '11:00', bmi: 21.8 },
  { id: 4, date: '05/09/2022', hour: '14:00', bmi: 22.3 },
  { id: 5, date: '06/09/2022', hour: '10:00', bmi: 22.7 },
  { id: 6, date: '07/09/2022', hour: '08:00', bmi: 23.2 },
  { id: 7, date: '08/09/2022', hour: '13:00', bmi: 21.9 },
  { id: 8, date: '09/09/2022', hour: '16:00', bmi: 22.1 },
  { id: 9, date: '10/09/2022', hour: '12:00', bmi: 23.5 },
];

export default function MonitorHealthTable(props) {
  // eslint-disable-next-line react/prop-types
  const { title } = props;
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [newData, setNewData] = useState({ date: '', hour: '', value1: '', value2: '' });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setColumns(getColumns(title));
  }, [props]);

  function getColumns(txt) {
    if (txt === "Weight") {
      setRows(dados_peso);
      return [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'date' },
        { field: 'hour', headerName: 'hour' },
        { field: 'weight', headerName: 'weight' },
      ];
    }
    else if (txt === "Blood pressure") {
      setRows(dados_pressao_arterial);
      return [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'date' },
        { field: 'hour', headerName: 'hour' },
        { field: 'sistolica', headerName: 'sistolica' },
        { field: 'diastolica', headerName: 'diastolica' },
      ];
    }
    else if (txt === "Cholesterol") {
      setRows(dados_colestrol);
      return [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'date' },
        { field: 'hour', headerName: 'hour' },
        { field: 'value', headerName: 'value' },
      ];
    }
    else if (txt === "Oximetry") {
      setRows(dados_oximetria);
      return [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'date' },
        { field: 'hour', headerName: 'hour' },
        { field: 'oximetry', headerName: 'oximetry' },
      ];
    }
    else if (txt === "Heart Rate") {
      setRows(dados_frequencia_cardiaca);
      return [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'date' },
        { field: 'hour', headerName: 'hour' },
        { field: 'frequency', headerName: 'frequency' },
      ];
    }
    else {
      setRows(dados_bmi);
      return [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'date' },
        { field: 'hour', headerName: 'hour' },
        { field: 'bmi', headerName: 'bmi' },
      ];
    }
  }

  const handleAddData = () => {
    const newId = rows.length + 1;
    let newRow;
    if (title === "Blood pressure") {
      newRow = { id: newId, date: newData.date, hour: newData.hour, sistolica: newData.value1, diastolica: newData.value2 };
    } else if (title === "Weight") {
      newRow = { id: newId, date: newData.date, hour: newData.hour, weight: newData.value1 };
    } else if (title === "Cholesterol") {
      newRow = { id: newId, date: newData.date, hour: newData.hour, value: newData.value1 };
    } else if (title === "Oximetry") {
      newRow = { id: newId, date: newData.date, hour: newData.hour, oximetry: newData.value1 };
    } else if (title === "Heart Rate") {
      newRow = { id: newId, date: newData.date, hour: newData.hour, frequency: newData.value1 };
    } else if (title === "BMI") {
      newRow = { id: newId, date: newData.date, hour: newData.hour, bmi: newData.value1 };
    }
    setRows([...rows, newRow]);
    setNewData({ date: '', hour: '', value1: '', value2: '' });
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const toggleAddData = () => {
    setOpen(!open);
  };


  return (
    <>
    <Button onClick={toggleAddData}>
          {open ? <RemoveIcon />:<AddIcon />}
        </Button>
    {
      (open==true)?
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Date"
          name="date"
          value={newData.date}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Hour"
          name="hour"
          value={newData.hour}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        {title === "Blood pressure" ? (
          <>
            <TextField
              label="Systolic"
              name="value1"
              value={newData.value1}
              onChange={handleInputChange}
              sx={{ mr: 2 }}
            />
            <TextField
              label="Diastolic"
              name="value2"
              value={newData.value2}
              onChange={handleInputChange}
              sx={{ mr: 2 }}
            />
          </>
        ) : (
          <TextField
            label="Value"
            name="value1"
            value={newData.value1}
            onChange={handleInputChange}
            sx={{ mr: 2 }}
          />
        )}
        <Button variant="contained" sx={{marginTop:"10px"}} onClick={handleAddData}>
          Add Data
        </Button>
      </Box>
      :
      <>{(open==true)?"Close":"Add"}</>
    }
    <Box sx={{ height: 600, width: '100%' }}>
      
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}
