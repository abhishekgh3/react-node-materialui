import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { advancedFilterActions } from "../store/adavanced-filter";
import { dialogActions } from "../store/dialog";

export default function SelectComp({
  label,
  values,
  type,
  selectedValues,
  ...props
}) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.value !== "") {
      dispatch(
        type === "catalogue"
          ? dialogActions.addToCatalogueItem({
              name: props.name,
              value: values.find((value) => value.text === event.target.value)
                .code,
            })
          : advancedFilterActions.addOrReplaceParamValue({
              name: props.name,
              value: values.find((value) => value.text === event.target.value)
                .code,
            })
      );
    } else {
      dispatch(
        type === "catalogue"
          ? dialogActions.removeKeyFromCatalogueItem({
              name: props.name,
            })
          : advancedFilterActions.removeFilterParamName({
              name: props.name,
            })
      );
    }
  };

  const getSelectedValue = () => {
    if (selectedValues && selectedValues[props.name]) {
      if (type === "catalogue") {
        if (values.find((value) => value.code === selectedValues[props.name])) {
          return values.find(
            (value) => value.code === selectedValues[props.name]
          ).text;
        }
      } else {
        if (
          values.find((value) => value.code === selectedValues[props.name][0])
        ) {
          return values.find(
            (value) => value.code === selectedValues[props.name][0]
          ).text;
        }
      }
    }
    return "";
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={{ fontSize: 14 }} size="small">
        {label}
      </InputLabel>
      <Select
        {...props}
        fullWidth
        size="small"
        value={getSelectedValue()}
        sx={{ fontSize: 14 }}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="" sx={{ fontSize: 13 }}>
          <em>None</em>
        </MenuItem>
        {values &&
          values.map((value) => (
            <MenuItem key={value.id} sx={{ fontSize: 13 }} value={value.text}>
              {value.text}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
