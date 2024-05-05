import React from "react";
import { Card } from "react-bootstrap";

const Post = ({ timestamp, title, content, author }) => {
  // Function to format timestamp in IST (Indian Standard Time)
  const formatTimestamp = (timestamp) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "short",
    };
    const istTimestamp = new Date(timestamp).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
    return istTimestamp;
  };

  // Function to calculate the time difference in days
  const calculateTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const timeDifference = currentTime - postTime;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  // Function to get the formatted timestamp and time difference
  const getFormattedTimestamp = () => {
    const istTimestamp = formatTimestamp(timestamp);
    const daysDifference = calculateTimeDifference(timestamp);

    if (daysDifference === 0) {
      return istTimestamp;
    } else {
      return `${istTimestamp} • ${daysDifference} days ago`;
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="font-weight-bold">{author.charAt(0).toUpperCase() + author.slice(1)}
 </Card.Title>
         <span className="text-muted small" style={{fontSize:"0.9em"}}>{getFormattedTimestamp()}</span>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
