import React from "react";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

const LayoutBase = () => {
  return (
    <div className="h-full w-full">
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default LayoutBase;
