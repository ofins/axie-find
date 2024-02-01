import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "virtual:uno.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutBase from "./components/LayoutBase.tsx";
import SalesBase from "./views/SalesBase.tsx";
import AuctionsBase from "./views/AuctionsBase.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="market-sales" element={<SalesBase />} />
          <Route path="market-auctions" element={<AuctionsBase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
