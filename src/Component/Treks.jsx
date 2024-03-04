import React, { useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import { Container, Col, Row, Stack, Card } from 'react-bootstrap';
import trekData from '../data/treks.json';
import Fade from 'react-reveal/Fade';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./Trek.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Treks = () => {

  const [open, setOpen] = React.useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const nav = useNavigate();

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
        nav("/addTreks");
      })
      .catch((err) => {
        handleClick();
      });
  };
  const [fadeStyle, setFadeStyle] = useState('left');

 
  const [imgStyle, setImgStyle] = useState({
    width: '40%',
    borderRadius: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1)',
    transition: 'transform 0.3s ease-in-out',
  });
  
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
  };
  
  const toggleFadeStyle = () => {
    setFadeStyle(fadeStyle === 'left' ? 'right' : 'left');
  };

  return (
    <>
      <NavBar />

      <Container className='bg-dark' fluid>
        <Stack >
          {trekData.treks.map((trek, idx) => (
            <Fade key={idx} left={idx % 2 === 0 && fadeStyle === 'left'} right={idx % 2 === 1 || fadeStyle === 'right'}>
              <Row className="mt-4">
                <Col>
                  <Card key={idx} className="mt-5 ">
                    <Card.Img
                      src={trek.imgSrc}
                      alt={trek.name}
                      className={`mx-auto my-4 ${isHovered ? 'hovered-img' : ''}`}
                    />
                    <Card.Body className="mx-auto">
                      <Card.Title>{trek.name}</Card.Title>
                      <Card.Text>
                        <strong>Location:</strong> {trek.location}
                        <br />
                        <strong>Best Time:</strong> {trek.bestTime}
                        <br />
                        <strong>Cost:</strong> {trek.cost}
                        <br />
                        <strong>Duration:</strong> {trek.duration}
                        <br />
                        <strong>Difficulty:</strong> {trek.difficulty}
                        <br />
                        <strong>Altitude:</strong> {trek.altitude}
                        <br />
                        <strong>Gear Needed:</strong> {trek.gearNeeded.join(', ')}
                        <br />
                        <strong>Basecamp:</strong> {trek.basecamp}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Fade>
          ))}<Box
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
      </Container>

      <Footer />
    </>
  );
};

export default Treks;
