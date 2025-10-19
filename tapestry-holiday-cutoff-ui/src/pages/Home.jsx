import { Grid } from "@mui/material";
import CustomAlert from "../components/custom/CustomAlert";
import CustomConfirmationDialog from "../components/custom/CustomConfirmationDialog";
import PagesMenu from "../components/PagesMenu";
import Sections from "../components/Sections";
import TopAppBar from "../components/TopAppBar";

export default function Home() {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <TopAppBar></TopAppBar>
        </Grid>
        <Grid item></Grid>
        <Grid
          item
          container
          xs={1}
          direction="row"
          justifyContent="flex-end"
          alignItems={"flex-end"}
        >
          <Grid item xs={1}>
            <PagesMenu></PagesMenu>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={11.5}
            sx={{
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <Sections></Sections>
          </Grid>
        </Grid>
      </Grid>

      <CustomConfirmationDialog></CustomConfirmationDialog>
      <CustomAlert></CustomAlert>
    </>
  );
}
