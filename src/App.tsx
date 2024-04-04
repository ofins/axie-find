import React from "react";
import "./index.css";
import "virtual:uno.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutBase from "./components/LayoutBase";
import LandsSales from "@/views/lands/LandsSales";
import LandsAuctions from "@/views/lands/LandsAuctions";
import GenkaiSales from "@/views/genkai/GenkaiSales";
import GenkaiAuctions from "@/views/genkai/GenkaiAuctions";
import VXSales from "@/views/VX/VXSales";
import VXAuctions from "@/views/VX/VXAuctions";
import PixelsPetSales from "@/views/pixels/PixelsPetSales";
import PixelsPetAuctions from "@/views/pixels/PixelsPetAuctions";
import BasicLayout from "@/views/layouts/BasicLayout";
import ItemSales from "@/views/items/ItemSales";
import Home from "@/views/Home";
import { lightTheme, darkTheme } from "./styles/material/theme";
import { useSelector } from "react-redux";

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
