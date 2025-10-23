import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { searchTrainingActions } from "../../store/search-training";

export default function ValidParams({ value }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(searchTrainingActions.assignValidParams(event.target.value));
  };

  return (
    <>
      <TextField
        label="Valid Params"
        value={value}
        fullWidth
        onChange={handleChange}
      ></TextField>
    </>
  );
}
