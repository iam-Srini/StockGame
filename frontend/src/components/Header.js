import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar 
      bg="dark" 
      data-bs-theme="dark" 
      expand="lg" 
      className="py-3"         // Bigger top/bottom padding
      style={{ fontSize: "1.15rem" }}   // Larger font
    >
      <Container>

        {/* Left: Logo */}
        <Navbar.Brand 
          href="/" 
          style={{ fontSize: "2.0rem", fontWeight: "600" }}
        >
          StockGame
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">

          {/* Center: Menu */}
          <Nav className="mx-auto" style={{ gap: "1.5rem" }}>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/watchlist">WatchList</Nav.Link>
            <Nav.Link href="/screener">Screener</Nav.Link>
            <Nav.Link href="/alerts">Alerts</Nav.Link>
          </Nav>

          {/* Right: Profile */}
          <Nav className="ms-auto">
            <Nav.Link 
              href="/myprofile" 
              style={{ fontSize: "1.15rem", paddingLeft: "1rem" }}
            ><i className="fas fa-user-circle" style={{ marginRight: "0.5rem", fontSize: "2.0rem" }}></i>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
