import { Box, Typography } from "@mui/material";

export default function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, minHeight: 100 }} alignContent={"flex-start"}>
          {children}
        </Box>
      )}
    </div>
  );
}
