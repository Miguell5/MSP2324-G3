import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function SearchDoctors() {
  const [service, setService] = React.useState('');
  const [selectedDoctors, setSelectedDoctors] = React.useState([]);

  const medicalSpecialties = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Ophthalmology',
    'Orthopedics',
  ];

  const doctorsFromMedicalSpecialties = {
    'Cardiology': [
      { name: "Pedro Assis", email: "pedroa@gmail.com", phone: "123-456-789" },
      { name: "Ana Silva", email: "anas@gmail.com", phone: "987-654-321" },
      { name: "Rui Santos", email: "ruis@gmail.com", phone: "111-222-333" },
      { name: "Sara Carvalho", email: "sarac@gmail.com", phone: "444-555-666" }
    ],
    'Dermatology': [
      { name: "João Sousa", email: "joaos@gmail.com", phone: "111-222-333" },
      { name: "Maria Santos", email: "marias@gmail.com", phone: "444-555-666" },
      { name: "Luísa Silva", email: "luisas@gmail.com", phone: "777-888-999" },
      { name: "António Costa", email: "antonioc@gmail.com", phone: "222-333-444" }
    ],
    'Neurology': [
      { name: "Miguel Costa", email: "miguelc@gmail.com", phone: "777-888-999" },
      { name: "Inês Oliveira", email: "ineso@gmail.com", phone: "000-999-888" },
      { name: "Ricardo Fernandes", email: "ricardof@gmail.com", phone: "555-666-777" },
      { name: "Marta Sousa", email: "martas@gmail.com", phone: "888-999-000" }
    ],
    'Ophthalmology': [
      { name: "Rita Pereira", email: "ritap@gmail.com", phone: "222-333-444" },
      { name: "José Fonseca", email: "josef@gmail.com", phone: "555-666-777" },
      { name: "Carla Santos", email: "carlas@gmail.com", phone: "888-999-000" },
      { name: "Paulo Martins", email: "paulom@gmail.com", phone: "111-222-333" }
    ],
    'Orthopedics': [
      { name: "Sofia Costa", email: "sofiac@gmail.com", phone: "888-999-000" },
      { name: "Luís Oliveira", email: "luiso@gmail.com", phone: "333-444-555" },
      { name: "Mónica Silva", email: "monicas@gmail.com", phone: "777-888-999" },
      { name: "António Sousa", email: "antonios@gmail.com", phone: "222-333-444" }
    ]
  };

  const handleChange = (event) => {
    setService(event.target.value);
    setSelectedDoctors(doctorsFromMedicalSpecialties[event.target.value]);
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 4,
        padding:2,height:"auto"
        
      }}
    >
      <Typography variant="h4" gutterBottom>
        Search for Doctors
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="select-service-label">Select Medical Specialty</InputLabel>
        <Select
          labelId="select-service-label"
          id="select-service"
          value={service}
          label="Select Medical Specialty"
          onChange={handleChange}
        >
          {medicalSpecialties.map((specialty, index) => (
            <MenuItem key={index} value={specialty}>{specialty}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{marginBottom:"60px"}}>
      {selectedDoctors.map((doctor, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1" gutterBottom>{doctor.name}</Typography>
              <Typography variant="body2" color="textSecondary">Email: {doctor.email}</Typography>
              <Typography variant="body2" color="textSecondary">Phone: {doctor.phone}</Typography>
              <Button variant="outlined" size="small" href={`mailto:${doctor.email}`} sx={{ marginTop: 1 }}>Contact</Button>
            </Box>
          ))}
      </div>
    </Box>
  );
}
