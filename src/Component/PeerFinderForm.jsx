import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Navbar';


function PeerFinderForm(){
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        interests: '',
        expertise: '',
        destination: '',
        travelDates: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add logic to handle form submission, e.g., send data to a server
      };
  return (
    <div className="App">
      <Container className="mt-5">
        <h1 className="text-center mb-5 mt-2">Travel Buddy Finder</h1>
        <NavBar/>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="formInterests">
        <Form.Label>Interests</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your interests (e.g., hiking, sightseeing)"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formExpertise">
        <Form.Label>Expertise</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your expertise (e.g., photography, foodie)"
          name="expertise"
          value={formData.expertise}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formDestination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your desired destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formTravelDates">
            <Form.Label>Travel Dates</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your preferred travel dates"
              name="travelDates"
              value={formData.travelDates}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Find Peer
      </Button>
    </Form>
      </Container>
    </div>
  );
}

export default PeerFinderForm;
