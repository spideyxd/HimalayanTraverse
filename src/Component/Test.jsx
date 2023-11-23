import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Test() {
  return (
    <Container className="py-5">
      <Row className="d-flex justify-content-center">
        <Col md="10" xl="8" className="text-center">
          <h3 className="mb-4">Testimonials</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis
            totam voluptas nostrum quisquam eum porro a pariatur veniam.
          </p>
        </Col>
      </Row>
      <Row className="text-center d-flex align-items-stretch">
        <Col md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
          <Card className="testimonial-card">
            <div
              className="card-up"
              style={{ backgroundColor: "#9d789b" }}
            ></div>
            <div className="avatar mx-auto bg-white">
              <Card.Img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                className="rounded-circle img-fluid"
              />
            </div>
            <Card.Body>
              <Card.Title className="mb-4">Maria Smantha</Card.Title>
              <hr />
              <Card.Text className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>
                Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing
                elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
          <Card className="testimonial-card">
            <div
              className="card-up"
              style={{ backgroundColor: "#7a81a8" }}
            ></div>
            <div className="avatar mx-auto bg-white">
              <Card.Img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                className="rounded-circle img-fluid"
              />
            </div>
            <Card.Body>
              <Card.Title className="mb-4">Lisa Cudrow</Card.Title>
              <hr />
              <Card.Text className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>
                Neque cupiditate assumenda in maiores repudi mollitia
                architecto.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
          <Card className="testimonial-card">
            <div
              className="card-up"
              style={{ backgroundColor: "#6d5b98" }}
            ></div>
            <div className="avatar mx-auto bg-white">
              <Card.Img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                className="rounded-circle img-fluid"
              />
            </div>
            <Card.Body>
              <Card.Title className="mb-4">John Smith</Card.Title>
              <hr />
              <Card.Text className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>
                Delectus impedit saepe officiis ab aliquam repellat rem unde
                ducimus.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
