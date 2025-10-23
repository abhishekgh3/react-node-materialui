import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTabPanel from "../components/SearchBarTrainComponents/CustomTabPanel";
import ValidParams from "../components/SearchBarTrainComponents/ValidParams";
import { searchTrainingActions } from "../store/search-training";
import QueryTrainingForm from "../components/SearchBarTrainComponents/QueryTrainingForm";
import useAxios from "../hooks/useAxios";

export default function GeneralSearchTrain() {
  const [value, setValue] = useState("1");
  const validParams = useSelector((state) => state.searchTraining.validParams);
  const dispatch = useDispatch();
  const { httpClient } = useAxios();

  const queryTrainingSet = useSelector(
    (state) => state.searchTraining.queryTrainingSet
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    let requestBody = {
      textQueryData: queryTrainingSet,
      params: validParams,
    };
    console.log(requestBody);
    try {
      await httpClient.post("ai/data", requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(searchTrainingActions.clearTrainingData());
    } catch (error) {}
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            align="center"
            sx={{ flexGrow: 3, display: { xs: "none", sm: "block" } }}
          >
            General Search Training
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 12,
          marginLeft: "10px",
        }}
      >
        <Paper sx={{ minWidth: 600 }} elevation={3}>
          <Box>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Request Params Query" value="1" />
                <Tab label="Valid Params" value="2" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={"1"}>
              <QueryTrainingForm
                values={queryTrainingSet ?? []}
              ></QueryTrainingForm>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={"2"}>
              <ValidParams value={validParams ?? ""}></ValidParams>
            </CustomTabPanel>
          </Box>
          <Divider />
          <Grid
            item
            sx={{
              p: "10px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
