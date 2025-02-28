import GenkaiAuctions from "@/views/genkai/GenkaiAuctions";
import GenkaiSales from "@/views/genkai/GenkaiSales";
import Home from "@/views/Home";
import ItemSales from "@/views/items/ItemSales";
import LandsAuctions from "@/views/lands/LandsAuctions";
import LandsSales from "@/views/lands/LandsSales";
import BasicLayout from "@/views/layouts/BasicLayout";
import PixelsPetAuctions from "@/views/pixels/PixelsPetAuctions";
import PixelsPetSales from "@/views/pixels/PixelsPetSales";
import VXAuctions from "@/views/VX/VXAuctions";
import VXSales from "@/views/VX/VXSales";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "virtual:uno.css";
import LayoutBase from "./components/LayoutBase";
import "./index.css";
import { darkTheme, lightTheme } from "./styles/material/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";

function App() {
  const themeMode = useSelector((state) => state.app.theme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
        <Routes>
          <Route path="/" element={<LayoutBase />}>
            <Route index element={<Home />} />

            <Route path="/lands" element={<BasicLayout />}>
              <Route path="sales" element={<LandsSales />} />
              <Route path="auctions" element={<LandsAuctions />} />
            </Route>

            <Route path="/items" element={<BasicLayout />}>
              <Route path="sales" element={<ItemSales />} />
              {/* <Route path="auctions" element={<LandsAuctions />} /> */}
            </Route>

            <Route path="/genkai" element={<BasicLayout />}>
              <Route path="sales" element={<GenkaiSales />} />
              <Route path="auctions" element={<GenkaiAuctions />} />
            </Route>

            <Route path="/VX" element={<BasicLayout />}>
              <Route path="sales" element={<VXSales />} />
              <Route path="auctions" element={<VXAuctions />} />
            </Route>

            <Route path="/pixels-pet" element={<BasicLayout />}>
              <Route path="sales" element={<PixelsPetSales />} />
              <Route path="auctions" element={<PixelsPetAuctions />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
