import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import * as React from "react";

export default function MultipleSelectComp({ label, children }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id="multiple-checkbox-label"
        sx={{ fontSize: 14 }}
        size="small"
      >
        {label}
      </InputLabel>
      <Select
        fullWidth
        size="small"
        sx={{ fontSize: 14 }}
        labelId="multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
      >
        {children.map((child) => (
          <MenuItem key={child} value={child}>
            <Checkbox checked={personName.indexOf(child) > -1} />
            <ListItemText primary={child} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
