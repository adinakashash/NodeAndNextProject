import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface LocationDialogProps {
  open: boolean;
  address: string;
  onClose: () => void;
  onAgree: () => void;
}

const LocationDialog: React.FC<LocationDialogProps> = ({ open, address, onClose, onAgree }) => {  
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Would you like to report this location?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{address}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={onAgree} autoFocus>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationDialog;
