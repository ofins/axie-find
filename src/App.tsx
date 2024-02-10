import React from "react";
import "./index.css";
import "virtual:uno.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutBase from "./components/LayoutBase";
import LandsLayout from "@/views/layouts/LandsLayout";
import LandsSales from "@/views/lands/LandsSales";
import LandsAuctions from "@/views/lands/LandsAuctions";
import GenkaiLayout from "@/views/layouts/GenkaiLayout";
import GenkaiSales from "@/views/genkai/GenkaiSales";
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
            <Route path="/lands" element={<LandsLayout />}>
              <Route path="sales" element={<LandsSales />} />
              <Route path="auctions" element={<LandsAuctions />} />
            </Route>
            <Route path="/genkai" element={<GenkaiLayout />}>
              <Route path="auctions" element={<GenkaiSales />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
