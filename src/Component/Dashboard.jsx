import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {

    fetch('https://api.example.com/user-queries')
      .then((response) => response.json())
      .then((data) => {
        setQueries(data);
      })
      .catch((error) => {
        console.error('Error fetching queries:', error);
      });
  }, []);

  return (
    <Container>
      <h1>Your Queries</h1>
      {queries.map((query) => (
        <Card key={query.id}>
          <Card.Body>
            <Card.Title>{query.title}</Card.Title>
            <Card.Text>{query.content}</Card.Text>
            <Button variant="danger">Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Dashboard;
