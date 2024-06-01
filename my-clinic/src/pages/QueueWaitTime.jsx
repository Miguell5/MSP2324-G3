import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function QueueWaitTime({ open, onClose }) {
  const [service, setService] = React.useState('');
  const [waitTime, setWaitTime] = React.useState(null);

  const waitTimes = {
    'MyClinic Lisbon': '1 hour and 15 minutes',
    'MyClinic Porto': '30 minutes',
    'MyClinic Faro': '43 minutes',
  };

  const handleChange = (event) => {
    setService(event.target.value);
    setWaitTime(waitTimes[event.target.value]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Check Queue Wait Time</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 300,
            padding: 2,
          }}
        >
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="select-service-label">Select Clinic</InputLabel>
            <Select
              labelId="select-service-label"
              id="select-service"
              value={service}
              label="Select Service"
              onChange={handleChange}
            >
              <MenuItem value="MyClinic Lisbon">MyClinic Lisbon</MenuItem>
              <MenuItem value="MyClinic Porto">MyClinic Porto</MenuItem>
              <MenuItem value="MyClinic Faro">MyClinic Faro</MenuItem>
            </Select>
          </FormControl>
          {waitTime && (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Estimated wait time for {service}: {waitTime}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
