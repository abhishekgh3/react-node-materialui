import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../store/dialog";
import { alertActions } from "../store/alert";
import { catalogueActions } from "../store/catalogue";
import useAxios from "../hooks/useAxios";

export default function DeleteConfirmationDialog() {
  const { httpClient } = useAxios();
  const showDialog = useSelector(
    (state) => state.dialog.showDeleteConfirmation
  );
  const id = useSelector((state) => state.dialog.deleteId);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(dialogActions.hideDeletConfirmation());
  };
  const handleCancel = () => {
    dispatch(dialogActions.hideDeletConfirmation());
  };
  const handleOk = async () => {
    await httpClient.delete(`catalogue/item/${id}`);
    dispatch(dialogActions.hideDeletConfirmation());
    dispatch(catalogueActions.setReloadCatalogueItems(true));
    dispatch(alertActions.openAlertWithAMessage(`Item Deleted`));
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="delete-confirmation-dialog">
          Confirmation for Delete
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete the selected row ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
