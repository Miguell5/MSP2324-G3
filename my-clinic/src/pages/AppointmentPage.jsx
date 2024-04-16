import React from 'react';
import { Paper, Typography, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';

const appointments = [
  {
    date:"14/04/2024",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"9:30",
    doctor:"Dr. José Correia",
    status:"toDo"
    },
  {
    date:"21/06/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"15:30",
    doctor:"Dr. José Correia",
    status:"done"
    },
  {
    date:"9/06/2023",
    AppointmentType:"Consulta",
    specialty:"Estomatologia",
    hour:"11:00",
    doctor:"Dr. José Correia",
    status:"done"
  },
  {
    date:"5/02/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"17:00",
    doctor:"Dr. José Correia",
    status:"didNotOccur"
  },
  {
    date:"5/02/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"17:00",
    doctor:"Dr. José Correia",
    status:"done"
  },
  {
    date:"5/02/2023",
    AppointmentType:"Consulta",
    specialty:"Otorrinolaringologia",
    hour:"17:00",
    doctor:"Dr. José Correia",
    status:"done"
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
    <div style={{margin:"5%"}}>
      {/* Iterar sobre cada grupo de compromissos */}
      {Object.keys(groupedAppointments).map(monthYearKey => (
        <div key={monthYearKey} style={{ marginBottom: 20 }}>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            {monthYearKey}
          </Typography>
          {/* Iterar sobre os compromissos dentro do grupo */}
          {groupedAppointments[monthYearKey].map((appointment, index) => (
            <Paper key={index} elevation={3} style={{ padding: 20, marginBottom: 10,borderRadius:20 }}>
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

              <Grid item >
                  <Grid container  direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Grid item xs={12}>
                      <Tooltip title={appointment.status}>
                        {appointment.status==="done" &&
                          <CheckCircleIcon style={{marginLeft:"100%"}} color="success"/>}
                        {appointment.status==="toDo" &&
                          <CheckCircleIcon style={{marginLeft:"100%"}} color="warning"/>}
                        {appointment.status==="didNotOccur" &&
                          <CheckCircleIcon style={{marginLeft:"100%"}} color="error"/>}
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{appointment.date}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{`Hora: ${appointment.hour}`}</Typography>
                    </Grid>
                
                  </Grid>
              </Grid>

              <Divider orientation="vertical" variant="middle" flexItem sx={{border: '1px solid',marginLeft:"2%",marginRight:"2%"}}/>

              <Grid item xs={8}>
                  <Grid container  direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Grid item xs={12}>
                      <b><Typography variant="body1">{appointment.AppointmentType}</Typography></b>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{`Consulta de ${appointment.specialty}`}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{appointment.doctor}</Typography>
                    </Grid>
                  </Grid>
              </Grid>
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