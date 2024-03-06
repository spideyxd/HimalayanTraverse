import React, { useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Container, Button, Col, Row, Stack, Card } from "react-bootstrap";
import treks from "../data/Gears.json";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import bg from "../assets/images/bg.jpg";

const Rent = () => {
  const [fadeStyle, setFadeStyle] = useState("left");

  const toggleFadeStyle = () => {
    setFadeStyle(fadeStyle === "left" ? "right" : "left");
  };

  return (
    <>
      <NavBar />
      <Stack
        className="bg-light"
        // style={{
        //   backgroundImage: "url()",
        //   backgroundSize: "cover",
        //   filter: "blur(5px)", // Adjust the blur amount as needed
        //   height: "300px", // Set the height as needed
        // }}
      >
        <Container>
          <Fade>
            <Row xs={1} sm={2} md={3}>
              {treks.trekkingGears.map((trek, idx) => (
                <Col style={{ marginTop: "8rem" }} md="mx-auto" key={idx}>
                  <Card
                    className="mx-2 bg-gradient text-light" // Replace with desired background gradient class
                    style={{
                      height: "55vh", // Adjust height as needed
                      width: "18rem",
                      borderRadius: "15px",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)", // Subtle shadow
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={trek.imgSrc}
                      width="286"
                      height="280"
                    />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      {" "}
                      // Vertical layout
                      <Card.Title
                        className="fs-4 fw-bold"
                        style={{ color: "#000" }}
                      >
                        {trek.heading}
                      </Card.Title>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Text className="text-muted">
                          {trek.content} /Day
                        </Card.Text>
                        <Link to="/address">
                          <Button className="btn btn-custom text-light">
                            Rent
                          </Button>
                        </Link>
                      </div>
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
