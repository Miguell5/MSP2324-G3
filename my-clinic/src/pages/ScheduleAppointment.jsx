import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import DatePicker from "../components/DatePicker";

export default function ScheduleAppointment() {
  const [clinic, setClinic] = React.useState("");
  const [doctor, setDoctor] = React.useState("");

  const handleChangeClinic = (event) => {
    setClinic(event.target.value);
  };
  const handleChangeDoctor = (event) => {
    setDoctor(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: 120,
      }}
    >
      <label id="clinic-label" sx={{ marginBottom: "4px" }}>
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

      <label id="speciality-label" sx={{ marginBottom: "4px" }}>
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
      <label id="speciality-label" sx={{ marginBottom: "4px" }}>
        Date
      </label>
      <FormControl fullWidth>
        <DatePicker />
      </FormControl>
      <div style={{ marginBottom: "16px" }}></div>

      <FormControl fullWidth>
        <Button variant="contained">Continue</Button>
      </FormControl>
    </Box>
  );
}
