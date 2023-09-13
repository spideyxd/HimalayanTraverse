import React, { useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';


function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  return distance;
}


function findNearbyPoints(baseLat, baseLon, points) {
  const nearbyPoints = [];
  for (const point of points) {
    const distance = calculateDistance(baseLat, baseLon, point.latitude, point.longitude);
    if (distance <= 300) {
      nearbyPoints.push(point);
    }
  }
  return nearbyPoints;
}


function Nearbytreks() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 }); 
  const [nearbyPoints, setNearbyPoints] = useState([]);
  
  const handleLocationChange = (e) => {
    
    const [latitude, longitude] = e.target.value.split(',');
    setLocation({ latitude, longitude });
  };

  const handleFindNearbyPoints = () => {
   
    const points = [
      { latitude: 12.9716, longitude: 77.5946 },
      
    ];

    const result = findNearbyPoints(location.latitude, location.longitude, points);
    setNearbyPoints(result);
  };

  return (
    <>
      <NavBar />
      <div style={{marginTop:"10rem"}}>
        <input
          type="text"
          placeholder="Enter latitude, longitude (e.g., 12.9716, 77.5946)"
          onChange={handleLocationChange}
        />
        <button onClick={handleFindNearbyPoints}>Find Nearby Points</button>
      </div>
      <div>
        <h2>Nearby Points</h2>
        <ul>
          {nearbyPoints.map((point) => (
            <li >{`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}</li>  // 13.0827,80.2707
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Nearbytreks;
