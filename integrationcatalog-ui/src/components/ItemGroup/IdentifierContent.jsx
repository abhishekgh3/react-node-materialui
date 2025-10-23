import { Box, Grid } from "@mui/material";
import SelectComp from "../SelectComp";
import { useSelector } from "react-redux";

export default function IdentifierContent({ items }) {
  const newCatalogueItem = useSelector(
    (state) => state.dialog.newCatalogueItem
  );
  const editCatalogueItem = useSelector(
    (state) => state.dialog.editCatalogueItem
  );
  const isEdit = useSelector((state) => state.dialog.isEdit);
  return (
    <>
      <Box>
        <Grid container justifyContent="space-around" alignItems="flex-start">
          <Grid item sm={1.5}>
            <SelectComp
              label="Level"
              name="level"
              type="catalogue"
              selectedValues={isEdit ? editCatalogueItem : newCatalogueItem}
              values={items.level ?? []}
            ></SelectComp>
          </Grid>
          <Grid item sm={1.5}>
            <SelectComp
              label="Status"
              name="status"
              type="catalogue"
              selectedValues={isEdit ? editCatalogueItem : newCatalogueItem}
              values={items.status ?? []}
              required
            ></SelectComp>
          </Grid>
          <Grid item sm={3}>
            <Box>
              <SelectComp
                label="Source"
                name="source"
                type="catalogue"
                selectedValues={isEdit ? editCatalogueItem : newCatalogueItem}
                values={items.system ?? []}
              ></SelectComp>
            </Box>
          </Grid>
          <Grid item sm={3}>
            <SelectComp
              label="Target"
              name="target"
              type="catalogue"
              selectedValues={isEdit ? editCatalogueItem : newCatalogueItem}
              values={items.system ?? []}
            ></SelectComp>
          </Grid>
          <Grid item sm={2}>
            <SelectComp
              label="Brand"
              name="brand"
              type="catalogue"
              selectedValues={isEdit ? editCatalogueItem : newCatalogueItem}
              values={items.brand ?? []}
            ></SelectComp>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
