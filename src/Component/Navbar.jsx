import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const customNavbarLinkStyle = {
    color: "white", // Set the text color to white
    marginRight: "15px", // Add some right margin for spacing
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();
  const [user, setUser] = useState({});

  React.useEffect(() => {
    fetch(`${BASE_URL}/getinfo`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLogout = () => {
    fetch(`${BASE_URL}/logout`, {
      method: "GET",
      headers: {
        Accept: "appllication/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        setUser({});
        window.location.reload();
        // nav("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Navbar fixed="top" expand="md" className="bg-dark">
      <Container>
        {/* <Nav.Link href="/" style={customNavbarLinkStyle}> */}
        <Navbar.Brand style={customNavbarLinkStyle} href="/">
          HimalayanTraverse
        </Navbar.Brand>
        {/* </Nav.Link>  */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={customNavbarLinkStyle}>
              Home
            </Nav.Link>
            <Nav.Link href="/treks" style={customNavbarLinkStyle}>
              Treks
            </Nav.Link>
            <Nav.Link href="/nearbytreks" style={customNavbarLinkStyle}>
              NearBy
            </Nav.Link>
            <Nav.Link href="/blogs" style={customNavbarLinkStyle}>
              Blogs
            </Nav.Link>
            <Nav.Link href="/faq" style={customNavbarLinkStyle}>
              FAQ
            </Nav.Link>
            <Nav.Link href="/contact" style={customNavbarLinkStyle}>
              Contact Us
            </Nav.Link>
            <Nav.Link href="/queries" style={customNavbarLinkStyle}>
              Post a Query
            </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
            {Object.entries(user).length === 0 ? (
              <Nav.Link href="/queries" className="ms-auto" style={customNavbarLinkStyle}>
                LOGIN
              </Nav.Link>
            ) : (
              <Nav.Link
                href="/queries" className="ms-auto"
                onClick={handleLogout}
                style={customNavbarLinkStyle}
              >
                LOGOUT
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
