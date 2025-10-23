import { Check, Replay } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { catalogueActions } from "../store/catalogue";
import { drawerActions } from "../store/drawer";
import { advancedFilterActions } from "../store/adavanced-filter";

export function SideDrawerAppBar() {
  const dispatch = useDispatch();
  const filterMenuSelectedItems = useSelector(
    (state) => state.advancedFilter.filterMenuSelectedItems
  );

  const handleResetValues = () => {
    dispatch(advancedFilterActions.resetfilterMenuItems());
  };

  const handleApplyFilters = () => {
    if (filterMenuSelectedItems) {
      let params = [];
      for (const [key, value] of Object.entries(filterMenuSelectedItems)) {
        let valueString = value.join(",");
        params.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(valueString)}`
        );
      }
      dispatch(catalogueActions.addFilterQueryString(params.join("&")));
      dispatch(drawerActions.hideDrawer());
    }
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#6688aa" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Advanced Filters
          </Typography>
          <IconButton color="inherit" onClick={handleApplyFilters}>
            <Check />
          </IconButton>
          <IconButton color="inherit" onClick={handleResetValues}>
            <Replay />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
