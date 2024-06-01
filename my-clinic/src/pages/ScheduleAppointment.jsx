import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import DatePicker from "../components/DatePicker";
import { SimpleDialog } from "../components/Dialog";

export default function ScheduleAppointment() {
  const [clinic, setClinic] = React.useState("");
  const [doctor, setDoctor] = React.useState("");
  const [appointmentType, setAppointmentType] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleChangeClinic = (event) => {
    setClinic(event.target.value);
  };
  const handleChangeDoctor = (event) => {
    setDoctor(event.target.value);
  };
  const handleAppointmentType = (event) => {
    setAppointmentType(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const isFormValid = clinic && doctor && selectedDate;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: 120,
      }}
    >
      <label id="clinic-label" style={{ marginBottom: "4px" }}>
        Clinic
      </label>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose the clinic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={clinic}
          label="Clinic"
          onChange={handleChangeClinic}
          sx={{ bgcolor: "white" }}
        >
          <MenuItem value={"MyClinic Lisbon"}>MyClinic Lisbon</MenuItem>
          <MenuItem value={"MyClinic Porto"}>MyClinic Porto</MenuItem>
          <MenuItem value={"MyClinic Faro"}>MyClinic Faro</MenuItem>
        </Select>
      </FormControl>

      <div style={{ marginBottom: "16px" }}></div>

      <label id="speciality-label" style={{ marginBottom: "4px" }}>
        Doctor
      </label>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose the Doctor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={doctor}
          label="Doctor"
          onChange={handleChangeDoctor}
          sx={{ bgcolor: "white" }}
        >
          <MenuItem value={"Doctor 1"}>Doctor 1</MenuItem>
          <MenuItem value={"Doctor 2"}>Doctor 2</MenuItem>
          <MenuItem value={"Doctor 3"}>Doctor 3</MenuItem>
        </Select>
      </FormControl>

      <div style={{ marginBottom: "16px" }}></div>
      <label id="speciality-label" style={{ marginBottom: "4px" }}>
      Specialty
      </label>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose the Specialty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={appointmentType}
          label="AppointmentType"
          onChange={handleAppointmentType}
          sx={{ bgcolor: "white" }}
        >
          <MenuItem value={"Cardiology"}>Cardiology</MenuItem>
          <MenuItem value={"General clinic"}>General clinic</MenuItem>
          <MenuItem value={"Neurology"}>Neurology</MenuItem>
        </Select>
      </FormControl>

      <div style={{ marginBottom: "16px" }}></div>
      <label id="speciality-label" style={{ marginBottom: "4px" }}>
        Date
      </label>
      <FormControl fullWidth>
        <DatePicker selectedDate={selectedDate} onChange={handleDateChange} />
      </FormControl>
      <div style={{ marginBottom: "16px" }}></div>
      <FormControl fullWidth>
        <Button
          variant="contained"
          disabled={!isFormValid}
          onClick={handleClickOpen}
        >
          Continue
        </Button>
        <SimpleDialog open={open} onClose={handleClose} />
      </FormControl>
    </Box>
  );
}
