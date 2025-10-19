import { AppBar, Toolbar, Typography } from "@mui/material";

export function PagesMenuAppBar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            alignContent={"center"}
          >
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
