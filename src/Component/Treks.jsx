import React, { useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import { Container, Col, Row, Stack, Card } from 'react-bootstrap';
import trekData from '../data/treks.json';
import Fade from 'react-reveal/Fade';
import "./Trek.css";

const Treks = () => {
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
          ))}
        </Stack>
      </Container>

      <Footer />
    </>
  );
};

export default Treks;
