import { Check } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { GridFilterPanel, useGridApiContext } from "@mui/x-data-grid";

export default function CustomFilterPanel({
  handleApplyFilter,
  isButtonEnabled,
}) {
  const apiRef = useGridApiContext();

  const handleApplyButtonClick = () => {
    handleApplyFilter(apiRef.current);
  };

  return (
    <Grid>
      <Grid container direction={"column"} alignItems={"flex-end"}>
        <Grid item>
          <GridFilterPanel></GridFilterPanel>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            size="large"
            disabled={!isButtonEnabled}
            startIcon={<Check />}
            onClick={handleApplyButtonClick}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
