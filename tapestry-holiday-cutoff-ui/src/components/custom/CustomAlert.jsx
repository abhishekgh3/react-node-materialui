import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert";

export default function CustomAlert() {
  const open = useSelector((state) => state.alert.isOpen);
  const isError = useSelector((state) => state.alert.isError);
  const message = useSelector((state) => state.alert.message);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(alertActions.closeAlert());
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
