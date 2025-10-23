import { Grid } from "@mui/material";
import CustomCheckBox from "../CustomCheckBox";

export default function IntegrationTypeContent() {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item sm={3}>
          <CustomCheckBox
            name="directIntegration"
            label="Direct Integration"
          ></CustomCheckBox>
        </Grid>
        <Grid item sm={3}>
          <CustomCheckBox name="usingCP4i" label="Using CP4i"></CustomCheckBox>
        </Grid>
      </Grid>
    </>
  );
}
