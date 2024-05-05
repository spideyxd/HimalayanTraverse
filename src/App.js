import React from "react";
import NavBar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Stack, Row, Col } from "react-bootstrap";
import TrekDistributionChart from "./Component/TrekDistributionChart";
import Home from "./Component/Home";
import { Barr } from "./Component/Barr";

function App() {
  return (
    <Stack>
      <NavBar />
      <Home />
      <Row className="mt-5" style={{ fontSize: "6vh", fontWeight: "bold" }}>
        <center>Metrics</center>
      </Row>
      <Row className="align-items-end">
        <Col md={6}>
          <TrekDistributionChart />
        </Col>
        <Col md={6}>
          <Barr />
        </Col>
      </Row>

      <Footer style={{ position: "sticky", bottom: 0 }} />
    </Stack>
  );
}

export default App;
