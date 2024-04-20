import React from 'react';
import { Paper, Typography, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import ErrorIcon from '@mui/icons-material/Error';

const appointments = [
  {
    id:"6",
    date:"2/06/2024",
    AppointmentType:"Consulta",
    specialty:"Clinica geral",
    hour:"18:15",
    doctor:"Dr. José Correia",
    status:"toDo",
    checkIn:"",
    },
  {
    id:"5",
    date:"14/04/2024",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"9:30",
    doctor:"Dr. José Correia",
    status:"toDo",
    checkIn:"",
    },
  {
    id:"4",
    date:"21/06/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"15:30",
    doctor:"Dr. José Correia",
    status:"done",
    checkIn:"",
    },
  {
    id:"3",
    date:"9/06/2023",
    AppointmentType:"Consulta",
    specialty:"Estomatologia",
    hour:"11:00",
    doctor:"Dr. José Correia",
    status:"done",
    checkIn:"",
  },
  {
    id:"2",
    date:"5/02/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"17:00",
    doctor:"Dr. José Correia",
    status:"didNotOccur"
  },
  {
    id:"1",
    date:"5/02/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"17:00",
    doctor:"Dr. José Correia",
    status:"done",
    checkIn:"",
  },
  {
    id:"0",
    date:"5/02/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"17:00",
    doctor:"Dr. José Correia",
    status:"done",
    checkIn:"",
  },
  ];

const AppointmentsPage = () => {
  // Função para agrupar os compromissos por mês
  const groupAppointmentsByMonth = () => {
    const groupedAppointments = {};

    // Iterar sobre cada compromisso
    appointments.forEach(appointment => {
      const [day, month, year] = appointment.date.split('/');
      const monthYearKey = `${month}/${year}`;

      // Se já existir um grupo para o mês, adicionar o compromisso, caso contrário, criar um novo grupo
      if (groupedAppointments[monthYearKey]) {
        groupedAppointments[monthYearKey].push(appointment);
      } else {
        groupedAppointments[monthYearKey] = [appointment];
      }
    });

    return groupedAppointments;
  };

  const groupedAppointments = groupAppointmentsByMonth();

  return (
    <div style={{margin:"5%",marginBottom:"150px"}}>
      {/* Iterar sobre cada grupo de compromissos */}
      {Object.keys(groupedAppointments).map(monthYearKey => (
        <div key={monthYearKey} >
          <Typography variant="overline" style={{ marginBottom: 10 }}>
            {monthYearKey}
          </Typography>
          {/* Iterar sobre os compromissos dentro do grupo */}
          {groupedAppointments[monthYearKey].map((appointment, index) => (
            <Paper key={index} elevation={3} style={{ padding: 20, marginBottom: 10,borderRadius:10 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderColor: 'divider',
                '& svg': {
                  m: 1,
                },
              }}
            >
              <Grid container alignItems="flex-start" justifyContent="flex-start">
              <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                <Grid item >
                  <Grid container  direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <Tooltip title={appointment.status}>
                        {appointment.status==="done" &&
                          <CheckCircleIcon color="success"/>}
                        {appointment.status==="toDo" &&
                          <UpdateIcon color="warning"/>}
                        {appointment.status==="didNotOccur" &&
                          <ErrorIcon color="error"/>}
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{appointment.date}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{appointment.hour}</Typography>
                    </Grid>
                
                  </Grid>
              </Grid>

              <Grid item >
                  <Grid container  direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Grid item xs={12}>
                      <b><Typography variant="body1" display="block">{appointment.AppointmentType}</Typography></b>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{textAlign:"left",width:"100%"}}>{`Consulta de ${appointment.specialty}`}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption">{appointment.doctor}</Typography>
                    </Grid>
                    { appointment.status==="toDo" && <Grid item xs={12}>
                      <Button variant="outlined">Check-In</Button>
                    </Grid>}
                    
                  </Grid>
              </Grid>

              
                  
                </Stack>

              


              
              </Grid>
              
            </Box>              
            </Paper>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AppointmentsPage;