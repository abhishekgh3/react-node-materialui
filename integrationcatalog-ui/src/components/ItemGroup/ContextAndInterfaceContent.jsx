import { Grid } from "@mui/material";
import CustomTextField from "../CustomTextField";

export default function ContextAndInterfaceContent() {
  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <CustomTextField label="Context" name="context"></CustomTextField>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField label="Interface" name="interface"></CustomTextField>
        </Grid>
        <Grid
          item
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <CustomTextField
              label="Interface Flow"
              name="interfaceFlow"
            ></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="SAP" name="sap"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="PIPO" name="pipo"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="DP" name="dp"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="ACE" name="ace"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="APIC" name="apic"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="KAFKA" name="kafka"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="MFT" name="mft"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="ETL" name="etl"></CustomTextField>
          </Grid>
          <Grid item xs={2}>
            <CustomTextField label="EDI" name="edi"></CustomTextField>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
