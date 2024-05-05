import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import treks from "../data/nearbyTreks.json";
import Fade from "react-reveal/Fade";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";
import pic1 from "../assets/images/pic1.jpg";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const a = 6378137; // equatorial radius of the Earth in meters
  const b = 6356752.314245; // polar radius of the Earth in meters
  const f = 1 / 298.257223563; // flattening of the Earth
  const L = (lon2 - lon1) * (Math.PI / 180);

  const U1 = Math.atan((1 - f) * Math.tan(lat1 * (Math.PI / 180)));
  const U2 = Math.atan((1 - f) * Math.tan(lat2 * (Math.PI / 180)));
  const sinU1 = Math.sin(U1);
  const cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2);
  const cosU2 = Math.cos(U2);

  let lambda = L;
  let lambdaP = 2 * Math.PI;
  let iterLimit = 100;
  let sinLambda, cosLambda, sinSigma, cosSigma, sigma, sinAlpha, cosSqAlpha;
  let cos2SigmaM; // Declare cos2SigmaM variable

  while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0) {
    sinLambda = Math.sin(lambda);
    cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      cosU2 * sinLambda * (cosU2 * sinLambda) +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
          (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
    );
    if (sinSigma === 0) {
      return 0; // Co-incident points
    }
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha;

    if (isNaN(cos2SigmaM)) {
      cos2SigmaM = 0; // Equatorial line
    }

    const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    lambdaP = lambda;
    lambda =
      L +
      (1 - C) *
        f *
        sinAlpha *
        (sigma +
          C *
            sinSigma *
            (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  }

  if (iterLimit === 0) {
    return NaN; // Formula failed to converge
  }

  const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
  const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  const deltaSigma =
    B *
    sinSigma *
    (cos2SigmaM +
      (B / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
          (B / 6) *
            cos2SigmaM *
            (-3 + 4 * sinSigma * sinSigma) *
            (-3 + 4 * cos2SigmaM * cos2SigmaM)));

  const s = b * A * (sigma - deltaSigma);

  return s / 1000; // Convert meters to kilometers
}

function findNearbyPoints(baseLat, baseLon, points, dis) {
  const nearbyPoints = [];

  for (const point of points) {
    console.log(point.coordinates.latitude);
    const distance = calculateDistance(
      baseLat,
      baseLon,
      point.coordinates.latitude,
      point.coordinates.longitude
    );

    if (distance <= dis) {
      nearbyPoints.push(point);
    }
  }
  console.log(nearbyPoints);
  return nearbyPoints;
}

function Nearbytreks() {
  const [location, setLocation] = useState(null);
  const [nearbyPoints, setNearbyPoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.log("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleFindNearbyPoints = () => {
    console.log(location);
    if (!location) {
      console.log("Location is not available yet.");
      return;
    }

    if (!distanceInput) {
      console.log("Please enter a valid distance.");
      return;
    }

    setNearbyPoints([]);
    const distance = parseFloat(distanceInput);
    const points = treks.trekking_sites;
    // console.log(distance);
    const result = findNearbyPoints(
      location.latitude,
      location.longitude,
      points,
      distance
    );
    console.log(result);
    setNearbyPoints(result);
  };

  useEffect(() => {
    if (nearbyPoints.length > 0) {
      scrollToBelowContainer();
    }
  }, [nearbyPoints]);

  const belowContainerRef = React.useRef(null);
  const scrollToBelowContainer = () => {
    belowContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [distanceInput, setDistanceInput] = useState("");

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nearbyPoints.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <NavBar />
      <Container
        fluid
        style={{ marginTop: "6vh" }}
        className=" d-flex justify-content-center"
      >
        <Fade>
          <img
            src={pic1}
            alt="Your Alt Text"
            className="img-fluid"
            style={{ maxWidth: "110%", height: "auto" }}
          />
        </Fade>

        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Distance (in kilometers)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter distance"
                value={distanceInput}
                onChange={(e) => setDistanceInput(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="warning"
              onClick={() => {
                handleFindNearbyPoints();
              }}
            >
              Find Nearby Points
            </Button>
          </Form>
        </div>
      </Container>

      <Container className="mt-5 d-flex justify-content-center">
        <Row ref={belowContainerRef} xs={1} sm={2} md={3}>
          {currentItems.map((point, idx) => (
            <Col style={{ marginTop: "8rem" }} md="mx-auto" key={idx}>
              <Card
                className="mx-2 bg-light"
                style={{
                  height:"70vh",
                  width: "18rem",
                  transition: "transform 0.5s, box-shadow 0.5s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "perspective(1000px) rotateY(20deg)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0, 0, 0, 1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Card.Img
                  variant="top"
                  src={point.ImgSrc}
                  width="286"
                  height="180"
                />
                <Card.Body>
                  <Card.Title>{point.name}</Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {point.location}
                    <br />
                    <strong>Best Time:</strong> {point.BestTime}
                    <br />
                    <strong>Cost:</strong> &#8377;{point.cost}
                    <br />
                    <strong>Duration:</strong> {point.duration}
                    <br />
                    <strong>Difficulty:</strong> {point.difficulty}
                    <br />
                    <strong>Altitude:</strong> {point.Altitude}
                    <br />
                    <strong>Gear Needed:</strong> {point.gearNeeded.join(", ")}
                    <br />
                    <strong>Basecamp:</strong> {point.Basecamp}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mt-5 d-flex justify-content-center">
        <Pagination>
          {Array.from({
            length: Math.ceil(nearbyPoints.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePagination(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>

      <Footer />
    </>
  );
}

export default Nearbytreks;
