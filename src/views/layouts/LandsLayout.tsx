import React from "react";
import { Outlet } from "react-router-dom";
import SubTabs from "@/components/lands/SubTabs.tsx";

const LandsLayout = () => {
  return (
    <div className="h-full w-full">
      <div className="h-64px w-full" />
      <SubTabs />
      <Outlet />
    </div>
  );
};

export default LandsLayout;
