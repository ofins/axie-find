import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LandsListed from "./components/LandsListed";

function App() {
  return (
    <div className="bg-dark p-16px h-100%">
      <LandsListed />
    </div>
  );
}

export default App;
