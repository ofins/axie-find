import React from "react";
import Paper from "@mui/material/Paper";
import { Link, NavLink } from "react-router-dom";
import { sideNavList } from "@/settings/menuSetting";

const Home = () => {
  return (
    <div className="h-100vh w-full flex flex-col justify-center gap-20px items-center">
      <div className="text-24px">Welcome to AxieFind</div>
      <div className="flex flex-col gap-14px">
        {sideNavList.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className="decoration-none text-unset"
            >
              <div className="text-center cursor-pointer hover:translate-x-10 transition-duration-700 transition-ease-in-out ">
                <Paper
                  sx={{
                    height: 70,
                    width: 250,
                    display: "grid",
                    alignItems: "center",
                  }}
                  elevation={1}
                  square={false}
                >
                  {item.text}
                </Paper>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div>
        <Paper
          sx={{
            display: "grid",
            maxWidth: 400,
            padding: 3,
          }}
          elevation={1}
          square={false}
        >
          <div className="text-14px">
            <b>Important:</b> AxieFind is built using free hosting service.
            Initial spin up of server may take up to 30 seconds, please be
            patient.
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Home;
