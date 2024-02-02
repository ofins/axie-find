import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "virtual:uno.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutBase from "./components/LayoutBase.tsx";
import LandsLayout from "@/views/layouts/LandsLayout.tsx";
import LandsSales from "@/views/lands/LandsSales.tsx";
import LandsAuctions from "@/views/lands/LandsAuctions.tsx";
import GenkaiLayout from "@/views/layouts/GenkaiLayout.tsx";
import GenkaiSales from "@/views/genkai/GenkaiSales.tsx";
import Home from "./views/Home.tsx";
import { lightTheme, darkTheme } from "./styles/material/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
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
  </React.StrictMode>
);
