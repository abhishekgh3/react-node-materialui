import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../../store/dialog";
import CustomCheckBox from "../CustomCheckBox";
import SelectComp from "../SelectComp";

export default function RegionContent({ items }) {
  const newCatalogueItem = useSelector(
    (state) => state.dialog.newCatalogueItem
  );
  const editCatalogueItem = useSelector(
    (state) => state.dialog.editCatalogueItem
  );
  const isEdit = useSelector((state) => state.dialog.isEdit);

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item sm={3}>
          <CustomCheckBox name="regionNA" label="Region NA"></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox name="regionEU" label="Region EU"></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox
            name="regionAsia"
            label="Region Asia"
          ></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox name="regionJP" label="Region JP"></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <SelectComp
            label="Channel"
            type="catalogue"
            name="channel"
            values={items.channel ?? []}
            selectedValues={isEdit ? editCatalogueItem : newCatalogueItem}
          ></SelectComp>
        </Grid>
      </Grid>
    </>
  );
}
