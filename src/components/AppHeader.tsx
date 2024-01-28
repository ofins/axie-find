import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AppHeader() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="px-16px">
        {/* <Container> */}
        <Navbar.Brand href="#home">AxieFind</Navbar.Brand>
        <Nav className="flex gap-8px ">
          <NavLink to="market-sales" className="decoration-none c-white">Sales</NavLink>
          <NavLink to="market-auctions" className="decoration-none c-white">Auctions</NavLink>
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        {/* </Container> */}
      </Navbar>
    </>
  );
}

export default AppHeader;
