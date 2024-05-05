import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Container, Col, Row, Stack, Card, Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MapIcon from "@mui/icons-material/Map";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Blogs = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();
  const [user, setUser] = useState({});

  const [hiddenGems, setHiddenGems] = useState([]);

  const getAllHiddenGems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllHiddenGems`);
      const data = await response.json();

      if (response.ok) {
        setHiddenGems(data.data); // Assuming the actual data is inside the 'data' property
      } else {
        console.error("Error fetching hidden gems:", data.error);
      }
    } catch (error) {
      console.error("Error fetching hidden gems:", error.message);
    }
  };

  useEffect(() => {
    getAllHiddenGems();
  }, []);

  const handleLike = async (gemId) => {
    try {
      const responseUserData = await fetch(`${BASE_URL}/getinfo`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!responseUserData.ok) {
        handleClick();
        return;
      }

      const userData = await responseUserData.json();
      const id = userData._id;

      const response = await fetch(`${BASE_URL}/likeHiddenGem/${gemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        getAllHiddenGems();
      } else {
        console.error("Error liking hidden gem:", response.statusText);
      }
    } catch (error) {
      console.error("Error liking hidden gem:", error.message);
    }
  };


  const handleDisLike = async (gemId) => {
    try {
      const responseUserData = await fetch(`${BASE_URL}/getinfo`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!responseUserData.ok) {
        handleClick();
        return;
      }

      const userData = await responseUserData.json();
      const id = userData._id;

      const response = await fetch(`${BASE_URL}/dislikeHiddenGem/${gemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        getAllHiddenGems();
      } else {
        console.error("Error liking hidden gem:", response.statusText);
      }
    } catch (error) {
      console.error("Error liking hidden gem:", error.message);
    }
  };

  const treks = hiddenGems;

  const [expandedCards, setExpandedCards] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [isReported, setIsReported] = useState(false);

  const handleReportTrek = async () => {
    try {
    } catch (error) {
      console.error("Error reporting trek:", error);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleApiCall = () => {
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
        nav("/addTreks");
      })
      .catch((err) => {
        handleClick();
      });
  };

  const handleReadMore = (index) => {
    if (!expandedCards.includes(index)) {
      setExpandedCards([...expandedCards, index]);
    } else {
      setExpandedCards(expandedCards.filter((item) => item !== index));
    }
  };

  return (
    <>
      <NavBar />
      <Stack>
        <Container>
          <Fade>
            <Row xs={1} sm={2} md={3}>
              {hiddenGems
        .sort((a, b) => b.likeCount - a.likeCount) // Sort in descending order based on likeCount
        .map((trek, idx) =>(
                <Col style={{ marginTop: "8rem" }} md="mx-auto" key={idx}>
                  <Card className="mx-2" style={{ width: "18rem",height:"50vh" }}>
                    <Card.Img
                      variant="top"
                      src={trek.imgSrc}
                      width="286"
                      height="180"
                    />
                    <Card.Body>
                      <Card.Title>{trek.title}</Card.Title>
                      <Card.Text>
                        {expandedCards.includes(idx)
                          ? trek.description
                          : trek.description.length > 100
                          ? trek.description.slice(0, 100) + "..."
                          : trek.description}
                      </Card.Text>
                      {trek.description.length > 100 && (
                        <Button
                          variant="primary"
                          onClick={() => handleReadMore(idx)}
                        >
                          {expandedCards.includes(idx)
                            ? "Read Less"
                            : "Read More"}
                        </Button>
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <IconButton
                        onClick={() => handleLike(trek._id)}
                        target="_blank"
                      >{trek.likeCount}
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDisLike(trek._id)}
                        target="_blank"
                      >{trek.dislikeCount}
                        <ThumbDownIcon />
                      </IconButton>
                      <IconButton href={trek.location} target="_blank">
                        <MapIcon />
                      </IconButton>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Fade>
        </Container>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
            "& > :not(style)": { m: 1 },
          }}
        >
          <Fab color="primary" onClick={handleApiCall} aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            You are not Authorised , Please Login .
          </Alert>
        </Snackbar>
      </Stack>
      <Footer />
    </>
  );
};

export default Blogs;
