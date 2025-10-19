import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import HolidayCutoffDataGrid from "./HolidayCutoffDataGrid";
import HolidayDeptDataGrid from "./HolidayDeptDataGrid";
import SetupDataGrid from "./SetupDataGrid";

export default function Sections() {
  const showComponent = useSelector((state) => state.menu.showComponent);

  const theme = createTheme({
    typography: {
      allVariants: {
        fontSize: 14,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: 650,
          flexGrow: 1,
          width: "100%",
        }}
      >
        {showComponent === "Holiday Close Cutoff" && (
          <HolidayCutoffDataGrid></HolidayCutoffDataGrid>
        )}
        {showComponent === "Holiday Cutoff Dept" && (
          <HolidayDeptDataGrid></HolidayDeptDataGrid>
        )}
        {showComponent === "Setup" && <SetupDataGrid></SetupDataGrid>}
      </Box>
    </ThemeProvider>
  );
}
