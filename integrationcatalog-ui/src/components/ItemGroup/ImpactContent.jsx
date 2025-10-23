import { Grid } from "@mui/material";
import CustomCheckBox from "../CustomCheckBox";

export default function ImpactContent() {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item sm={3}>
          <CustomCheckBox
            name="customerImpact"
            label="Customer Impact"
          ></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox
            name="storeImpact"
            label="Store Impact"
          ></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox
            name="financeImpact"
            label="Finance Impact"
          ></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox
            name="reportImpact"
            label="Report Impact"
          ></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox
            name="dcInventoryImpact"
            label="DC Inventory Impact"
          ></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox
            name="planningImpact"
            label="Planning Impact"
          ></CustomCheckBox>
        </Grid>
      </Grid>
    </>
  );
}
