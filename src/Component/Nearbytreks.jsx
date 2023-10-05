import React, { useState,useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import treks from "../data/nearbyTreks.json";


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
    sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) +
      (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
      (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
    if (sinSigma === 0) {
      return 0; // Co-incident points
    }
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

    if (isNaN(cos2SigmaM)) {
      cos2SigmaM = 0; // Equatorial line
    }

    const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    lambdaP = lambda;
    lambda = L + (1 - C) * f * sinAlpha *
      (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  }

  if (iterLimit === 0) {
    return NaN; // Formula failed to converge
  }

  const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
    B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));

  const s = b * A * (sigma - deltaSigma);

  return s / 1000; // Convert meters to kilometers
}


function findNearbyPoints(baseLat, baseLon, points) {
  const nearbyPoints = [];
  console.log(baseLat);
  console.log(baseLon);
  console.log(points);
  for (const point of points) {
    // console.log(point);
    const distance = calculateDistance(
      baseLat,
      baseLon,
      point.coordinates.latitude,
      point.coordinates.longitude
    );
  console.log(distance);
    if (distance <= 300) {
      // console.log(point);
      nearbyPoints.push(point.name);
    }
  }
  console.log(nearbyPoints);
  return nearbyPoints;
}

function Nearbytreks() {
  const [location, setLocation] = useState(null); // Initialize with null
  const [nearbyPoints, setNearbyPoints] = useState([]);

  useEffect(() => {
    // Use useEffect to get the user's location when the component mounts
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
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleFindNearbyPoints = () => {
    if (!location) {
      console.log("Location is not available yet.");
      return;
    }

    // Reset nearbyPoints to an empty array before finding nearby points
    setNearbyPoints([]);

    const points = treks.trekking_sites;

    const result = findNearbyPoints(
      location.latitude,
      location.longitude,
      points
    );
    setNearbyPoints(result);
  };

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "10rem" }}>
        <button onClick={handleFindNearbyPoints}>Find Nearby Points</button>
      </div>
      <div>
        <h2>Nearby Points</h2>
        <ul>
          {nearbyPoints.map((point) => (
            <li key={point}>{point}</li> // Add a key to each list item
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Nearbytreks;