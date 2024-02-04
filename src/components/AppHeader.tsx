import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sideNavList } from "@/settings/menuSetting";
import { useState, useEffect } from "react";
import { getAxieMarketPlace } from "../api/axieMarketPlace";
import getExchangeRates from "../api/query/getExchangeRates";
import Loading from "./Loading";
import SwitchButton from "./SwitchButton";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: theme.palette.primary.secondary,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function AppHeader() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [exchangeRate, setExchangeRate] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAxieMarketPlace(getExchangeRates);
      setExchangeRate(data.data.data.exchangeRate);
    } catch (error) {
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <NavLink to="/" className="decoration-none text-unset">
              <Typography variant="h6" noWrap component="div">
                AxieFind
              </Typography>
            </NavLink>
          </div>
          <div className="flex items-center">
            {/* {!open ? ( */}
            <div className="ml-20px flex gap-20px flex justify-end items-center text-14px <lg:text-12px">
              {!loading ? (
                <>
                  <div className="flex items-center gap-4px h-full">
                    <img src="/icons/coins/ron.webp" className="h-18px" /> $
                    {exchangeRate?.ron.usd}
                  </div>
                  <div className="flex items-center gap-4px h-full ">
                    <img src="/icons/coins/axs.webp" className="h-18px" /> $
                    {exchangeRate?.axs.usd}
                  </div>
                  <div className="flex items-center gap-4px h-full ">
                    <img src="/icons/coins/eth.webp" className="h-18px" /> $
                    {exchangeRate?.eth.usd}
                  </div>
                  <div className="flex items-center gap-4px h-full ">
                    <img src="/icons/coins/slp.webp" className="h-18px" /> $
                    {exchangeRate?.slp.usd}
                  </div>
                </>
              ) : (
                <Loading color="inherit" />
              )}
            </div>
            {/* ) : null} */}
            <SwitchButton />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          version 0.1.0
        </DrawerHeader>
        <Divider />
        <List>
          {sideNavList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <NavLink
                to={item.path}
                className="decoration-none text-unset w-full"
                onClick={handleDrawerClose}
              >
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
