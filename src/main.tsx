import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "virtual:uno.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutBase from "./components/LayoutBase.tsx";
import SalesBase from "./views/SalesBase.tsx";
import AuctionsBase from "./views/AuctionsBase.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index path="market-sales" element={<SalesBase />} />
          <Route path="market-auctions" element={<AuctionsBase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
