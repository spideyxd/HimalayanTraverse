import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, NavDropdown } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Badge from "@mui/material/Badge";
import io from "socket.io-client";

function NavBar() {
  const [notificationCount, setNotificationCount] = useState(0);

  const customNavbarLinkStyle = {
    color: "white", // Set the text color to white
    marginRight: "15px", // Add some right margin for spacing
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();
  const [user, setUser] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleConversation=()=>{
    nav("/AllChat");
  }

  React.useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("notification", () => {
      // Increment notification count when a new notification is received
      setNotificationCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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


  const handleItemClick = (notificationId, user) => {

    // Call the API to add the notification ID and user data to the database as conversations
    fetch(`${BASE_URL}/addNotificationAsConversation/${notificationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify({ user }), // Send user data in the request body
    })
      .then((response) => {
        if (response.ok) {
          console.log('Notification ID and user data added as conversation successfully');
          nav("/AllChat");
        } else {
          console.error('Failed to add notification ID and user data as conversation');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
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
            <Nav.Link href="/FindingTravelBuddy" style={customNavbarLinkStyle}>
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
          <Nav.Link onClick={toggleNotifications} style={customNavbarLinkStyle}>
            <div style={{ position: "relative" }}>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsActiveIcon />
              </Badge>
              {showNotifications && (
                <NavDropdown
                  title={null}
                  show={showNotifications}
                  align="end"
                  className="ms-auto"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 1000,
                  }}
                >
                  {user.notifications.map((notification, index) => (
                    <React.Fragment key={index}>
                      <NavDropdown.Item onClick={() => handleItemClick(notification.id,user)}>
                        {notification.message}
                      </NavDropdown.Item>
                      {index !== user.notifications.length - 1 && <hr />}{" "}
                      {/* Add horizontal line if not the last notification */}
                    </React.Fragment>
                  ))}
                </NavDropdown>
              )}
            </div>
          </Nav.Link>

          <Nav className="ms-auto">
            {Object.entries(user).length === 0 ? (
              <Nav.Link
                href="/queries"
                className="ms-auto"
                style={customNavbarLinkStyle}
              >
                LOGIN
              </Nav.Link>
            ) : (
              <div style={{ position: "relative" }}>
                <Avatar
                  sx={{ width: 34, height: 34, bgcolor: deepOrange[500] }}
                  onClick={handleDropdownToggle}
                  style={{ cursor: "pointer" }}
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
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      zIndex: 1000,
                    }}
                  >
                     <NavDropdown.Item onClick={handleConversation}>
                      Conversations
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                   
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
