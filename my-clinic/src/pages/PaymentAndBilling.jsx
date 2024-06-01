import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/HourglassEmpty";

export default function PaymentAndBilling({ open, onClose }) {
  const [invoices, setInvoices] = React.useState([
    { id: 1, description: "Consultation Fee", amount: "50.00", paid: false, date: "2024-05-01", due: "2024-06-01" },
    { id: 2, description: "Medication", amount: "20.00", paid: true, date: "2024-05-10", due: "2024-06-10" },
    { id: 3, description: "Lab Test", amount: "30.00", paid: false, date: "2024-05-15", due: "2024-06-15" },
  ]);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handlePayInvoice = (id) => {
    const invoice = invoices.find(invoice => invoice.id === id);
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === id ? { ...invoice, paid: true } : invoice
      )
    );
    setSnackbarMessage(`Invoice ${invoice.description} of $${invoice.amount} has been paid.`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Payment and Billing</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 300,
              padding: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Your Invoices
            </Typography>
            <Grid container spacing={2} direction="column" alignItems="center">
              {invoices.map((invoice) => (
                <Grid item key={invoice.id} xs={12} sx={{ width: "100%" }}>
                  <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                    <Grid item xs={12}>
                      <Tooltip title={invoice.paid ? "Paid" : "Pending"}>
                        {invoice.paid ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <PendingIcon color="warning" />
                        )}
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{invoice.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">Amount: ${invoice.amount}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">Date: {invoice.date}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">Due: {invoice.due}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={invoice.paid}
                        onClick={() => handlePayInvoice(invoice.id)}
                      >
                        {invoice.paid ? "Paid" : "Pay"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}
