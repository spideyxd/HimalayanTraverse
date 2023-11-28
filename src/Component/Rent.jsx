import React, { useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Container, Button, Col, Row, Stack, Card } from "react-bootstrap";
import treks from "../data/Gears.json";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

const Rent = () => {
  const [fadeStyle, setFadeStyle] = useState("left");

  const toggleFadeStyle = () => {
    setFadeStyle(fadeStyle === "left" ? "right" : "left");
  };

  return (
    <>
      <NavBar />
      <Stack className="bg-light">
        <Container>
          <Fade>
            <Row xs={1} sm={2} md={3}>
              {treks.trekkingGears.map((trek, idx) => (
                <Col style={{ marginTop: "8rem" }} md="mx-auto" key={idx}>
                  <Card
                    className="mx-2 bg-dark text-light"
                    style={{
                      height:"45vh",
                      width: "18rem",
                      // borderRadius: "15px",
                      transition: "transform 0.3s ease-in-out",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={trek.imgSrc}
                      width="286"
                      height="180"
                    />
                    <Card.Body>
                      <Card.Title>{trek.heading}</Card.Title>
                      <Card.Text>{trek.content} /Day</Card.Text>
                      <Link to="/address">
                        <Button className="btn btn-secondary text-light" variant="primary">
                          Rent
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Fade>
        </Container>
      </Stack>
      <Footer />
    </>
  );
};

export default Rent;
