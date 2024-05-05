import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import NavBar from "./Navbar";
import Fade from "react-reveal/Fade";
import "./PostStyle.css";

const Feed = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [comment, setComment] = useState("");
  const [user, setUser] = React.useState({});
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);
  const nav = useNavigate();

  React.useEffect(() => {
    fetch(`${BASE_URL}/getinfo`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((userData) => {
        // Set the user data
        if (!userData) {
          nav("/login");
        }
        setUser(userData);

        // Fetch queries based on user data after setUser
        return fetch(`${BASE_URL}/queries`, {
          method: "GET",
          credentials: "include",
        });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          nav("/login");
          throw new Error("Failed to fetch queries");
        }
      })
      .then((queries) => {
        // Handle the queries data here
        // console.log("Queries:", queries);
        setQueries(queries);
      })
      .catch((err) => {
        console.error(err);
        nav("/login");
      });
  }, []);

  const postQueryToServer = () => {
    if (query.trim() !== "") {
      const newQuery = {
        email: user.email,
        content: query,
        author: user.name,
      };

      fetch(`${BASE_URL}/postQuery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuery),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Query posted:", data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error posting query:", error);
        });
      setQuery("");
    }
  };

  const postComment = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/postComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, comment: comment }),
        credentials: "include",
      });

      if (response.ok) {
        const updatedQuery = await response.json();
        window.location.reload();
        // console.log('Comment posted successfully:', updatedQuery);
      } else {
        throw new Error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handlePost = () => {
    postQueryToServer();
  };

  const handleComment = (id) => {
    postComment(id);
  };

  return (
    <Container className="bg-cont text-light">
      <NavBar />

      {queries.map((queryy) => (
        <Fade>
          <Card
            style={{ marginTop: "10vh" }}
            key={queryy._id}
            className="bg-post text-dark mb-3 "
          >
            <Card.Body>
              <Post
                title="Query"
                timestamp={queryy.timestamp}
                author={queryy.author}
                content={queryy.content}
              />

              <div>
                <Form.Group>
                  <Form.Control
                    className="mt-4"
                    type="text"
                    placeholder="Type Comment ..."
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="mt-2 mb-5 btn-sm"
                  variant="warning"
                  onClick={() => handleComment(queryy._id)}
                >
                  Comment
                </Button>
              </div>
              {queryy.comments.map((comment, index) => (
                <div key={index}>
                  <p>
                    <strong>{comment.author}: </strong> {comment.comment}
                  </p>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Fade>
      ))}
    </Container>
  );
};

export default Feed;
