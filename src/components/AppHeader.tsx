import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AppHeader() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <div className="flex items-center px-2rem">
          <Navbar.Brand href="#home">AxieFind</Navbar.Brand>
          <Nav className="flex gap-8px ">
            <NavLink to="market-sales" className="decoration-none c-white">
              Sales
            </NavLink>
            <NavLink to="market-auctions" className="decoration-none c-white">
              Auctions
            </NavLink>
          </Nav>
        </div>
      </Navbar>
      {/* replace fixed nav gap */}
      <div className="h-56px" />
    </div>
  );
}

export default AppHeader;
