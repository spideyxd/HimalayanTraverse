import React, { useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import data from "../data/blogs.json";
import { Container, Col, Row, Stack, Card, Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Blogs = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();
  const [user, setUser] = useState({});
  const treks = data;
  const [expandedCards, setExpandedCards] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
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
        nav("/postBlogs");
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
              {treks.map((trek, idx) => (
                <Col style={{marginTop:"8rem"}} md="mx-auto" key={idx}>
                  <Card className="mx-2" style={{ width: "18rem" }}>
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
                          {expandedCards.includes(idx) ? "Read Less" : "Read More"}
                        </Button>
                      )}
                    </Card.Body>
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
            '& > :not(style)': { m: 1 },
          }}
        >
          <Fab color="primary" onClick={handleApiCall} aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        You are not Authorised , Please Login .
        </Alert>
      </Snackbar>
      </Stack>
      <Footer />
    </>
  );
};

export default Blogs;
