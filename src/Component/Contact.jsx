import React from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <>
    <NavBar/>
    <Container className="py-5">
      <h1 className="text-center mt-4 mb-4">Contact Us</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your Name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Your Email" />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Your Message" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <div className="text-center">
            <h4>Contact Information</h4>
            <p> Delhi , India</p>
            <p>East Delhi , 110096</p>
            <p>Email: shivam2612002@gmail.com</p>
            <p>Phone: +91 9315784084</p>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  )
}

export default Contact