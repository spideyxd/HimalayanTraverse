import React from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import { Container, Col, Row, Stack, Card } from "react-bootstrap";
import trekData from "../data/treks.json";

const Treks = () => {
  return (
    <>
    <NavBar/>

    <Container fluid>
      <Stack>
        {trekData.treks.map((trek, idx) => (
          <Row key={idx} className="mt-4">
            <Col>
              <Card className='mt-5'>
                <Card.Img
                style={{width:"50%"}}
                  src={trek.imgSrc}
                  alt={trek.name}
                  className="mx-auto my-4" // Center image and set custom width
                />
                <Card.Body className="mx-auto ">
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
                    <strong>Gear Needed:</strong> {trek.gearNeeded.join(", ")}
                    <br />
                    <strong>Basecamp:</strong> {trek.basecamp}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Stack>
    </Container>
    <Footer/>
    </>
  )
}

export default Treks
