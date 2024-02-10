import React from "react";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="h-64px w-full" />
      <Outlet />
    </div>
  );
};

export default BasicLayout;
