import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open,setOpen}) {



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
             new doctor's account
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstname"
            name="firstname"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
       
            required
            margin="dense"
            id="lastname"
            name="lastname"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
           
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
       
            required
            margin="dense"
            id="pwd"
            name="pwd"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
       
            required
            margin="dense"
            id="pwdConfirmation"
            name="pwd"
            label="Password confirmation"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
           
            required
            margin="dense"
            id="specialty"
            name="specialty"
            label="Specialty"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}