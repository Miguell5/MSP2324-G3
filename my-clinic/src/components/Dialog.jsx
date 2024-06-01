import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import ImagePlaceholder from "../assets/correct.png";

export function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ minWidth: "600px" }}>
      <DialogTitle>Successfully created</DialogTitle>
      <DialogContent dividers>
        <div style={{ textAlign: "center" }}>
          <img
            src={ImagePlaceholder}
            alt="Success"
            style={{ width: "150px", height: "auto" }}
          />
        </div>
        <DialogContentText id="alert-dialog-description">
          The appointment was scheduled successfully
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


export default SimpleDialog;
