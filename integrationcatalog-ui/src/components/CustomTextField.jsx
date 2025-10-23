import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../store/dialog";

export default function CustomTextField(props) {
  const dispatch = useDispatch();
  const editCatalogueItem = useSelector(
    (state) => state.dialog.editCatalogueItem
  );
  const newCatalogueItem = useSelector(
    (state) => state.dialog.newCatalogueItem
  );
  const isEdit = useSelector((state) => state.dialog.isEdit);
  const handleChange = (event) => {
    dispatch(
      dialogActions.addToCatalogueItem({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  const getValue = () => {
    if (isEdit) {
      if (editCatalogueItem !== undefined) return editCatalogueItem[props.name];
    } else {
      if (newCatalogueItem !== undefined) return newCatalogueItem[props.name];
    }
    return "";
  };
  return (
    <>
      <TextField
        fullWidth
        {...props}
        onChange={handleChange}
        value={getValue() ?? ""}
      />
    </>
  );
}
