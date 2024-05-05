import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import NavBar from "./Navbar";
import "./PostStyle.css";
import Fade from "react-reveal/Fade";
import io from "socket.io-client";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const FindingTravelBuddy = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [comment, setComment] = useState("");
  const [user, setUser] = React.useState({});
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);
  const [socket, setSocket] = useState(null);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

   
  React.useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    // Cleanup function
    return () => {
      newSocket.disconnect();
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
       
        // Emit the store_socket_id event with the author's email
        if (socket && userData.email) {
            console.log(socket);
          socket.emit("store_socket_id", userData.email);
        }
       socket.on('notification', (notificationData) => {
      // Set the notification message and open the Snackbar
      setNotificationMessage(notificationData.message);
      setOpen(true);
    });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [socket]);

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
        // Set the user data
        if (!userData) {
          nav("/login");
        }
        console.log(userData);
        setUser(userData);

        // Fetch queries based on user data after setUser
        return fetch(`${BASE_URL}/allFindingBuddyQueries`, {
          method: "GET",
          credentials: "include",
        });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          nav("/login");
          throw new Error("Failed to fetch queries");
        }
      })
      .then((queries) => {
        setQueries(queries);
      })
      .catch((err) => {
        console.error(err);
        nav("/login");
      });
  }, []);

  const postQueryToServer = () => {
    if (query.trim() !== "") {
      const newQuery = {
        email: user.email,
        author: user.name,
        content: query,
      };
// console.log(newQuery);
      fetch(`${BASE_URL}/postFindingBuddy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuery),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error posting query:", error);
        });
      setQuery("");
    }
  };

  const handleFindingBuddy = () => {
    postQueryToServer();
  };

  const handleInterested = (email) => {
    const dataToSend = {
      queryEmail: email,
      userData: user,
    };
    // console.log(dataToSend);
    fetch(`${BASE_URL}/addInterestedUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dataToSend), // Send userData in the request body
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response
         alert("Interest Shown");
        } else {
          // Handle error response
          response.json().then((data) => {
            if (data.message === "You've already shown interest in this query.") {
              alert("You have already shown interest in this user.");
            } else {
              alert("Failed to add user to interested users");
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Container className="bg-light">
        <NavBar />
        <div>
          <Form.Group>
            <Form.Control
              // className="mt-5"
              style={{
                marginTop: "90px", // Default margin for larger screens
                "@media (max-width: 768px)": {
                  marginTop: "10px", // Adjust margin for screens smaller than or equal to 768px
                },
                "@media (max-width: 576px)": {
                  marginTop: "5px", // Adjust margin for screens smaller than or equal to 576px
                },
                height: "90px",
              }}
              type="text"
              placeholder="Find Buddy"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Group>
          <Button
            className="mt-2"
            variant="primary"
            onClick={handleFindingBuddy}
          >
            Find
          </Button>
        </div>

        {queries.map((queryy) => (
          <Fade>
            <Card key={queryy._id} className="bg-post text-dark mb-3 mt-5">
              <Card.Body>
                <Post
                  title="Query"
                  timestamp={queryy.timestamp}
                  author={queryy.author}
                  content={queryy.content}
                />

                <div>
                  <Button
                    className="mt-2 mb-5 btn-sm"
                    variant="warning"
                    onClick={() => handleInterested(queryy.email)}
                  >
                    Interested
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Fade>
        ))}

      </Container>
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FindingTravelBuddy;
