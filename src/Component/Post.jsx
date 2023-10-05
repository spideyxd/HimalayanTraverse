import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Post = ({ title, content }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        {/* <Button variant="primary">Upvote</Button>
        <Button variant="secondary">Downvote</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Post;