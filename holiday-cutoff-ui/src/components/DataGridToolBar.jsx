import { AddCircle } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

export default function DataGridToolBar({ addNewRow, isAddAllowed }) {
  const handleAddRow = () => {
    addNewRow();
  };

  return (
    <>
      <Grid
        container
        paddingLeft={1}
        paddingRight={1}
        flex
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <GridToolbarContainer />
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector
            slotProps={{ tooltip: { title: "Change density" } }}
          />
          <GridToolbarExport
            slotProps={{
              tooltip: { title: "Export data" },
            }}
          />
        </Grid>
        {isAddAllowed && (
          <Grid item justifyContent="space-between">
            <Button
              variant="text"
              size="small"
              onClick={handleAddRow}
              startIcon={<AddCircle />}
            >
              Add Row
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
}
