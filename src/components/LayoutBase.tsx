import React from "react";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LayoutBase = () => {
  const isSideMenuOpen = useSelector((state) => state.app.isSideMenuOpen);

  const shrinkRight = {
    width: "calc(100%-240px)",
    marginLeft: "240px",
  };

  return (
    <div className="h-full w-full p-2rem">
      <AppHeader />
      <div
        style={isSideMenuOpen ? shrinkRight : null}
        className="transition-all transition-duration-200 transition-ease-in-out"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutBase;
