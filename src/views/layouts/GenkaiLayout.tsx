import { Outlet } from "react-router-dom";
import SubTabs from "@/components/genkai/SubTabs.tsx";

const GenkaiLayout = () => {
  return (
    <div className="h-full w-full">
      <div className="h-64px w-full" />
      <SubTabs />
      <Outlet />
    </div>
  );
};

export default GenkaiLayout;
