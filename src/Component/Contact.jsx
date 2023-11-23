import React from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const emailAddress = 'shivam2612002@gmail.com';

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Create the mailto link
    const mailtoLink = `mailto:${emailAddress}?subject=Customer Query&body=Name: ${name}%0AMessage: ${message}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  return (
    <>
      <NavBar />
      <Container className="py-5">
        <h1 className="text-center mt-4 mb-4">Contact Us</h1>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" name="name" required />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Your Email" name="email" required />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your Message" name="message" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <div className="text-center">
              <h4>Contact Information</h4>
              <p>Delhi, India</p>
              <p>East Delhi, 110096</p>
              <p>Email: {emailAddress}</p>
              <p>Phone: +91 9315784084</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Contact