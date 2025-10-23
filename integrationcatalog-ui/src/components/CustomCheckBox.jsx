import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../store/dialog";

export default function CustomCheckBox({ isChecked, label, name }) {
  const dispatch = useDispatch();
  const editCatalogueItem = useSelector(
    (state) => state.dialog.editCatalogueItem
  );
  const newCatalogueItem = useSelector(
    (state) => state.dialog.newCatalogueItem
  );
  const isEdit = useSelector((state) => state.dialog.isEdit);
  const handleCheckBoxChange = (event) => {
    dispatch(
      dialogActions.addToCatalogueItem({
        name: name,
        value: event.target.checked ? "Yes" : "No",
      })
    );
  };

  const getChecked = () => {
    if (isEdit) {
      return (
        editCatalogueItem !== undefined && editCatalogueItem[name] === "Yes"
      );
    } else {
      return newCatalogueItem !== undefined && newCatalogueItem[name] === "Yes";
    }
  };

  return (
    <>
      <FormControlLabel
        sx={{ fontSize: 14 }}
        control={
          <Checkbox
            size="small"
            name={name}
            checked={getChecked()}
            onChange={handleCheckBoxChange}
            defaultChecked={isChecked}
          />
        }
        label={label}
      />
    </>
  );
}
