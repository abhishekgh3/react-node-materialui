import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios.js";
import { alertActions } from "../../store/alert";
import { dialogActions } from "../../store/dialog";

export default function CustomConfirmationDialog() {
  const showDialog = useSelector((state) => state.dialog.showConfirmation);
  const message = useSelector((state) => state.dialog.message);
  const type = useSelector((state) => state.dialog.type);
  const url = useSelector((state) => state.dialog.url);
  const dispatch = useDispatch();
  const { httpClient } = useAxios();

  const handleClose = () => {
    dispatch(dialogActions.hideConfirmation());
  };
  const handleCancel = () => {
    dispatch(dialogActions.hideConfirmation());
  };

  const handleDelete = async () => {
    try {
      await httpClient.delete(url);
      dispatch(alertActions.openAlertWithAMessage(`Item Deleted`));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = async () => {
    if (type === "Delete") {
      await handleDelete();
    }
    dispatch(dialogActions.handleSucess());
    dispatch(dialogActions.hideConfirmation());
  };

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
      aria-labelledby="customized-dialog-title"
      open={showDialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="delete-confirmation-dialog">
        Confirmation for {type}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
