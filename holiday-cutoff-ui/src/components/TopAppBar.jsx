import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, styled, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../store/side-menu";

export default function TopAppBar() {
  const open = useSelector((state) => state.menu.showMenu);
  const dispatch = useDispatch();
  const showSideMenu = () => {
    dispatch(menuActions.showMenu());
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 240,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={showSideMenu}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h6"
            noWrap
            align="center"
            sx={{
              flexGrow: 3,
              display: { xs: "none", sm: "block" },
            }}
          >
            Holiday Catalogue
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
