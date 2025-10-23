import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { advancedFilterActions } from "../store/adavanced-filter";

export default function CheckboxGroup({ parent, children, selectedValues }) {
  const dispatch = useDispatch();

  const handleParentChange = (event) => {
    dispatch(
      advancedFilterActions.removeFilterParamName({
        name: parent.toLowerCase(),
      })
    );
    if (event.target.checked) {
      children.map((child) => {
        dispatch(
          advancedFilterActions.addFilterParamValue({
            name: parent.toLowerCase(),
            value: child.code,
          })
        );
      });
    }
  };

  const handleChildChange = (childName) => {
    if (
      selectedValues &&
      selectedValues[parent.toLowerCase()] &&
      selectedValues[parent.toLowerCase()].includes(childName)
    ) {
      dispatch(
        advancedFilterActions.removeFilterParamValue({
          name: parent.toLowerCase(),
          value: childName,
        })
      );
    } else {
      dispatch(
        advancedFilterActions.addFilterParamValue({
          name: parent.toLowerCase(),
          value: childName,
        })
      );
    }
  };

  return (
    <div>
      <FormControlLabel
        label={parent}
        control={
          <Checkbox
            size="small"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }}
            indeterminate={
              parent.toLowerCase() in selectedValues &&
              selectedValues[parent.toLowerCase()].length >= 1 &&
              selectedValues[parent.toLowerCase()].length < children.length
            }
            checked={
              parent.toLowerCase() in selectedValues &&
              selectedValues[parent.toLowerCase()].length === children.length
            }
            onChange={handleParentChange}
          />
        }
      />
      <Box
        sx={{ display: "grid", flexDirection: "column", ml: 3, marginTop: 0.5 }}
      >
        {children.map((child, index) => (
          <FormControlLabel
            key={child.id}
            label={child.text}
            control={
              <Checkbox
                key={child.id}
                name={child.code}
                size="medium"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }}
                checked={
                  parent.toLowerCase() in selectedValues &&
                  selectedValues[parent.toLowerCase()].includes(child.code)
                }
                onChange={() => handleChildChange(child.code)}
              />
            }
          />
        ))}
      </Box>
    </div>
  );
}
