import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerActions } from "../store/drawer";
import AutoCompleteComp from "./AutoCompleteComp";
import CheckboxGroup from "./CheckboxGroup";
import SelectComp from "./SelectComp";
import { SideDrawerAppBar } from "./SideDrawerAppBar";

import useAxios from "../hooks/useAxios";

export default function SideDrawer() {
  const [items, setItems] = useState({});
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.drawer.showDrawer);
  const { httpClient } = useAxios();
  const selectedFilterItems = useSelector(
    (state) => state.advancedFilter.filterMenuSelectedItems
  );

  useEffect(() => {
    async function filterMenuItems() {
      try {
        const response = await httpClient.get("filter/menu/items");
        setItems(response.data);
      } catch (error) {}
    }
    filterMenuItems();
  }, [httpClient]);

  const hideDrawer = () => {
    dispatch(drawerActions.hideDrawer());
  };

  return (
    <div>
      <Drawer open={show} onClose={hideDrawer}>
        <SideDrawerAppBar></SideDrawerAppBar>
        {items && (
          <Box marginLeft={2}>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <CheckboxGroup
                  parent="Brand"
                  selectedValues={selectedFilterItems}
                  children={items.brand ?? []}
                ></CheckboxGroup>
                <CheckboxGroup
                  parent="Region"
                  selectedValues={selectedFilterItems}
                  children={items.region ?? []}
                ></CheckboxGroup>
              </Grid>
              <Grid item>
                <Divider orientation="horizontal" flexItem />
              </Grid>
              <Grid item>
                <Box sx={{ marginTop: 2, marginRight: 5, minWidth: 280 }}>
                  <SelectComp
                    label="Source System"
                    name="sourceSystem"
                    selectedValues={selectedFilterItems}
                    values={items.system ?? []}
                  ></SelectComp>
                </Box>
                <Box sx={{ marginTop: 2, marginRight: 5, minWidth: 280 }}>
                  <SelectComp
                    label="Target System"
                    name="targetSystem"
                    selectedValues={selectedFilterItems}
                    values={items.system ?? []}
                  ></SelectComp>
                </Box>
                <Box sx={{ marginTop: 2, marginRight: 5, minWidth: 280 }}>
                  <SelectComp
                    label="Technology"
                    name="tools"
                    selectedValues={selectedFilterItems}
                    values={items.tools ?? []}
                  ></SelectComp>
                </Box>
              </Grid>
              <Grid item>
                <Divider orientation="horizontal" flexItem />
              </Grid>
              <Grid item>
                <Box sx={{ marginTop: 2, marginRight: 5, minWidth: 280 }}>
                  <AutoCompleteComp
                    values={items.context}
                    name="context"
                    selectedValues={selectedFilterItems}
                  ></AutoCompleteComp>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Drawer>
    </div>
  );
}
