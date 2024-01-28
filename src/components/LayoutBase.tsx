import React from "react";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

const LayoutBase = () => {
  return (
    <div className="h-full">
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default LayoutBase;
