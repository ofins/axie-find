import React from 'react'
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

const LayoutBase = () => {
  return (
    <div className="h-full w-full p-2rem">
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default LayoutBase;
