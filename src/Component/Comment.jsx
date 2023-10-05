import React from 'react';
import { Card } from 'react-bootstrap';

const Comment = ({ text }) => {
  return (
    <Card>
      <Card.Body>{text}</Card.Body>
    </Card>
  );
};

export default Comment;
