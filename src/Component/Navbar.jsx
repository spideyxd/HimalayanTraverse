import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Navbar,NavDropdown } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { deepOrange, } from '@mui/material/colors';

function NavBar() {
  const customNavbarLinkStyle = {
    color: "white", // Set the text color to white
    marginRight: "15px", // Add some right margin for spacing
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();
  const [user, setUser] = useState({});

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

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
        // nav("/home");
        nav("/login");
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
            <Nav.Link href="/rent" style={customNavbarLinkStyle}>
            Rent A Gear
            </Nav.Link>
            <Nav.Link href="/findPeer" style={customNavbarLinkStyle}>
            Find Peer
            </Nav.Link>
            <Nav.Link href="/blogs" style={customNavbarLinkStyle}>
              Shorts
            </Nav.Link>
            <Nav.Link href="/hiddenGems" style={customNavbarLinkStyle}>
              Hidden Gems
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
        <div style={{ position: 'relative' }}>
          <Avatar
          sx={{ width: 34, height: 34,bgcolor: deepOrange[500] }}
           
            onClick={handleDropdownToggle}
            style={{ cursor: 'pointer' }}
          >
            {user.name[0]}
          </Avatar>
          {showDropdown && (
            <NavDropdown
              title={null}
              show={showDropdown}
              align="end"
              className="ms-auto"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                zIndex: 1000,
              }}
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      )}
    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
