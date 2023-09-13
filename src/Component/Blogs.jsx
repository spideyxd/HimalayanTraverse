import React, { useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import data from "../data/blogs.json";
import { Container, Col, Row, Stack, Card, Button } from "react-bootstrap";

const Blogs = () => {
  const treks = data.treks;
  const [expandedCards, setExpandedCards] = useState([]);

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
          <Row xs={1} sm={2} md={3}>
            {treks.map((trek, idx) => (
              <Col style={{marginTop:"8rem"}}  md="mx-auto" key={idx}>
                <Card className="mx-2"style={{ width: "18rem"  }}>
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
                        ? trek.content
                        : trek.content.slice(0, 100) + "..."
                      }
                    </Card.Text>
                    {trek.content.length > 100 && (
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
        </Container>
      </Stack>
      <Footer />
    </>
  );
};

export default Blogs;
