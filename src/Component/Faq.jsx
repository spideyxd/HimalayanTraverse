import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import Accordion from 'react-bootstrap/Accordion';
import { Stack, Row, Col } from 'react-bootstrap';

const Faq = () => {
  const customStyles = {
    fontFamily: "'Fira Sans', sans-serif",
    color: '#333',
    fontSize: '4rem',
    fontWeight:"900"
  };

  const headerStyles = {
    fontFamily: "'Fira Sans', sans-serif",
    fontWeight: 'bold',
    fontSize:"5rem", 
    fontWeight:"600"
  };

  return (
    <>
      <NavBar />
      <Stack>
        <Row className='mt-5 mx-auto'>
          <Col style={customStyles}>FAQ</Col>
        </Row>
        <Accordion className='mt-5'>
          <Accordion.Item eventKey="0">
            <Accordion.Header className='bg-grey ' style={headerStyles}>
              What gear should I bring for a trek?
            </Accordion.Header>
            <Accordion.Body className='bg-white'>
              You should bring appropriate clothing, hiking boots, a backpack, a tent, a sleeping bag, cooking equipment, and essentials like a first-aid kit and navigation tools.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className='bg-grey' style={headerStyles}>
              Are trekking permits required?
            </Accordion.Header>
            <Accordion.Body className='bg-white'>
              Trekking permits may be required for certain treks, depending on the location and local regulations. Make sure to check with the local authorities or tour organizers.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className='bg-grey' style={headerStyles}>
              What is the best time to go trekking?
            </Accordion.Header>
            <Accordion.Body className='bg-white'>
              The best time to go trekking varies by location. Research the specific trek you plan to take, as seasons can affect weather conditions and the overall experience.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header className='bg-grey' style={headerStyles}>
              How can I prepare for high-altitude trekking?
            </Accordion.Header>
            <Accordion.Body className='bg-white'>
              Preparing for high-altitude trekking involves physical conditioning, acclimatization, and proper gear. Consult with experienced trekkers or guides for guidance.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header className='bg-grey' style={headerStyles}>
              Can I go trekking solo?
            </Accordion.Header>
            <Accordion.Body className='bg-white'>
              Trekking solo is possible, but it's recommended to go with a group or hire a local guide, especially in remote areas, for safety and navigation.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Stack>
      <Footer />
    </>
  );
};

export default Faq;
