import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

const GenkaiLayout = () => {
  return (
    <div className="h-full w-full">
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default GenkaiLayout;
