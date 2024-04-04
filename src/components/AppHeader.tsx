import * as React from "react";
import { Link } from "react-router-dom";
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
import { useEffect } from "react";
import Loading from "./Loading";
import SwitchButton from "./SwitchButton";
import { useExchangeRate } from "@/hooks/useMarket";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { useDispatch, useSelector } from "react-redux";
import { toggleSideMenu } from "@/redux/appSlice";

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
  const { exchangeRate, loading, getExchangeRates, updateFrequency } =
    useExchangeRate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const isSideMenuOpen = useSelector((state) => state.app.isSideMenuOpen);

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(toggleSideMenu());
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(toggleSideMenu());
  };

  useEffect(() => {
    getExchangeRates();

    const intervalId = setInterval(() => {
      getExchangeRates();
    }, updateFrequency);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={isSideMenuOpen}>
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(isSideMenuOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className="decoration-none text-unset">
              <Typography variant="h6" noWrap component="div">
                AxieFind
              </Typography>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="ml-20px flex gap-20px flex justify-end items-center text-14px <lg:text-12px">
              {!loading ? (
                <>
                  <div className="flex items-center gap-4px h-full">
                    <img src="/icons/coins/ron.webp" className="h-18px" /> $
                    {exchangeRate.ron.usd}
                  </div>
                  <div className="flex items-center gap-4px h-full ">
                    <img src="/icons/coins/axs.webp" className="h-18px" /> $
                    {exchangeRate.axs.usd}
                  </div>
                  <div className="flex items-center gap-4px h-full ">
                    <img src="/icons/coins/eth.webp" className="h-18px" /> $
                    {exchangeRate.eth.usd}
                  </div>
                  <div className="flex items-center gap-4px h-full ">
                    <img src="/icons/coins/slp.webp" className="h-18px" /> $
                    {exchangeRate.slp.usd}
                  </div>
                </>
              ) : (
                <Loading color="inherit" />
              )}
            </div>
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
        open={isSideMenuOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          version 0.1.11
        </DrawerHeader>
        <Divider />
        <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="1" label="Axie Market">
              <TreeItem
                disabled
                nodeId="101"
                label="Land"
                className="ml--16px!"
              />
              <Link
                to="/lands/sales"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="1011" label="Sales" />
              </Link>
              <Link
                to="/lands/auctions"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="1012" label="Auctions" />
              </Link>
              <TreeItem
                disabled
                nodeId="102"
                label="erc1155"
                className="ml--16px!"
              />
              <Link
                to="/items/sales"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="1021" label="Sales" />
              </Link>
              {/* <Link
                to="/items/auctions"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="1022" label="Auctions" />
              </Link> */}
            </TreeItem>
            <TreeItem nodeId="2" label="Mavis Market">
              {/* Genkai */}
              <TreeItem
                disabled
                nodeId="201"
                label="Genkai"
                className="ml--16px!"
              />
              <Link
                to="/genkai/sales"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="2011" label="Sales" />
              </Link>
              <Link
                to="/genkai/auctions"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="2012" label="Auctions" />
              </Link>
              {/* CyberKongz VX */}
              <TreeItem
                disabled
                nodeId="202"
                label="VX"
                className="ml--16px!"
              />
              <Link
                to="/VX/sales"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="2021" label="Sales" />
              </Link>
              <Link
                to="/VX/auctions"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="2022" label="Auctions" />
              </Link>
              {/* Pixels Pet  */}
              <TreeItem
                disabled
                nodeId="203"
                label="Pixels Pet"
                className="ml--16px!"
              />
              <Link
                to="/pixels-pet/sales"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="2031" label="Sales" />
              </Link>
              <Link
                to="/pixels-pet/auctions"
                className="decoration-none text-unset w-full"
              >
                <TreeItem nodeId="2032" label="Auctions" />
              </Link>
            </TreeItem>
          </TreeView>
        </Box>
        <Divider />
      </Drawer>
    </Box>
  );
}
