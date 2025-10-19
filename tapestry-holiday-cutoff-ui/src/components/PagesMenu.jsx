import {
  Apartment,
  CalendarViewMonth,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../store/side-menu";

export default function PagesMenu() {
  const theme = useTheme();
  const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    boxShadow: theme.shadows[10],
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(${theme.spacing(8)} + 1px)`,

    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(6)} + 1px)`,
    },
    overflowX: "hidden",
  });
  const open = useSelector((state) => state.menu.showMenu);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dispatch = useDispatch();
  const hideMenu = () => {
    dispatch(menuActions.hideMenu());
  };
  const handleItemClick = (text, index) => {
    dispatch(menuActions.showComponent(text));
    setSelectedIndex(index);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));
  return (
    <>
      <Box display={"flex"}>
        <CssBaseline></CssBaseline>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={hideMenu}>
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box>
            <List>
              {["Holiday Close Cutoff", "Holiday Cutoff Dept", "Setup"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={() => handleItemClick(text, index)}
                      selected={selectedIndex === index}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index === 0 && <CalendarViewMonth />}
                        {index === 1 && <Apartment />}
                        {index === 2 && <Settings />}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider></Divider>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
