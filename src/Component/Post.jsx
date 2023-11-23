import React from "react";
import { Card, Button } from "react-bootstrap";

const Post = ({ title, content, author }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="font-weight-normal">{author}</Card.Title>
        <Card.Text >
           {content}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
