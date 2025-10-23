import { Add, Remove } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchTrainingActions } from "../../store/search-training";

export default function QueryTrainingForm({ values }) {
  const [noOfItems, setNoOfItems] = useState();
  const dispatch = useDispatch();
  const [exampleValue, setExampleValue] = useState("");
  const [queryValue, setQueryValue] = useState("");

  useEffect(() => {
    setNoOfItems(values.length + 1);
  }, [values]);

  const handleExampleChange = (event) => {
    setExampleValue(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQueryValue(event.target.value);
  };

  const handleIncreaseCount = (index) => {
    const exampleValue = document.getElementById(`example-${index}`).value;
    const queryValue = document.getElementById(`query-${index}`).value;
    if (exampleValue !== "" && queryValue !== "") {
      dispatch(
        searchTrainingActions.addToQueryTrainingSet({
          example: exampleValue,
          query: queryValue,
        })
      );

      document.getElementById(`example-${index}`).disabled = true;
      document.getElementById(`query-${index}`).disabled = true;
      setExampleValue("");
      setQueryValue("");
    }
  };

  const handleDecreaseCount = (index) => {
    document.getElementById(`example-${index}`).value;
    dispatch(searchTrainingActions.removeLastTrainingSetData());

    document.getElementById(`example-${index - 1}`).disabled = false;
    document.getElementById(`query-${index - 1}`).disabled = false;
    setExampleValue(values[values.length - 1].example);
    setQueryValue(values[values.length - 1].query);
  };

  const getExampleValue = (index) => {
    if (values[index - 1]) {
      return values[index - 1].example;
    }
    return exampleValue;
  };

  const getQueryValue = (index) => {
    if (values[index - 1]) {
      return values[index - 1].query;
    }
    return queryValue;
  };
  return (
    <>
      {Array.from({ length: noOfItems }, (_, index) => index + 1).map(
        (item) => (
          <Grid key={`container-${item}`} container spacing={3} sx={{ p: 1 }}>
            <Grid item key={`item1-${item}`}>
              <TextField
                id={`example-${item}`}
                value={getExampleValue(item) ?? ""}
                onChange={handleExampleChange}
                fullWidth
                label="Example Text"
              />
            </Grid>
            <Grid item key={`item2-${item}`}>
              <TextField
                id={`query-${item}`}
                value={getQueryValue(item) ?? ""}
                onChange={handleQueryChange}
                fullWidth
                label="Expected Query"
              />
            </Grid>
            <Grid item key={`item3-${item}`}>
              <IconButton
                onClick={() => handleIncreaseCount(item)}
                color="primary"
              >
                <Add />
              </IconButton>
              {item > 1 && (
                <IconButton
                  onClick={() => handleDecreaseCount(item)}
                  color="secondary"
                >
                  <Remove />
                </IconButton>
              )}
            </Grid>
          </Grid>
        )
      )}
    </>
  );
}
