import { AddCircle, Delete, Edit } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import * as React from "react";
import { useDispatch } from "react-redux";
import { dialogActions } from "../store/dialog";

export default function CustomToolbar({ isRowSelected }) {
  const dispatch = useDispatch();

  const handleShowNewDialog = () => {
    dispatch(dialogActions.showNewDialog());
  };
  const handleShowEditDialog = () => {
    dispatch(dialogActions.showEditDialog());
  };
  const handleShowDeleteConfirmation = () => {
    dispatch(dialogActions.showDeleteConfirmation());
  };

  return (
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
      <Grid item justifyContent="space-between">
        <Button
          variant="text"
          size="small"
          startIcon={<AddCircle />}
          onClick={handleShowNewDialog}
        >
          Add Row
        </Button>
        {isRowSelected === true && (
          <>
            <Button
              variant="text"
              size="small"
              startIcon={<Edit />}
              onClick={handleShowEditDialog}
            >
              Edit Row
            </Button>
            <Button
              variant="text"
              size="small"
              startIcon={<Delete />}
              onClick={handleShowDeleteConfirmation}
            >
              Delete Row
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}
