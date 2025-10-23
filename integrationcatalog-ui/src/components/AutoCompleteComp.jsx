import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { advancedFilterActions } from "../store/adavanced-filter";

export default function AutoCompleteComp({ values, name, selectedValues }) {
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(
      advancedFilterActions.addOrReplaceParamValue({
        name: name,
        value: newValue.code,
      })
    );
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        size="small"
        sx={{ minWidth: "280", fontSize: 13 }}
        options={values ?? []}
        inputValue={
          name in selectedValues
            ? values.find((value) => value.code === selectedValues[name][0])
                .text
            : ""
        }
        onChange={handleChange}
        getOptionLabel={(option) => option.text}
        renderInput={(params) => (
          <TextField {...params} label="Context" sx={{ fontSize: 13 }} />
        )}
      />
    </>
  );
}
