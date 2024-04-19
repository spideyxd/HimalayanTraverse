import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import NavBar from "./Navbar";
import "./PostStyle.css";
import Fade from "react-reveal/Fade";

const Queries = () => {
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
        console.log(userData);
        setUser(userData);

        // Fetch queries based on user data after setUser
        return fetch(`${BASE_URL}/allQueries`, {
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
        author: user.name,
        content: query,
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
    <>
      <Container className="bg-light">
        <NavBar />
        <div>
          <Form.Group>
            <Form.Control
              // className="mt-5"
              style={{
                marginTop: "90px", // Default margin for larger screens
                "@media (max-width: 768px)": {
                  marginTop: "10px", // Adjust margin for screens smaller than or equal to 768px
                },
                "@media (max-width: 576px)": {
                  marginTop: "5px", // Adjust margin for screens smaller than or equal to 576px
                },
                height: "90px",
              }}
              type="text"
              placeholder="What's your query?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" onClick={handlePost}>
            Post Query
          </Button>
        </div>
        
        {queries.map((queryy) => (
          <Fade>
          <Card key={queryy._id} className="bg-post text-dark mb-3 mt-5">
            <Card.Body>
         
              <Post title="Query" timestamp={queryy.timestamp} author={queryy.author} content={queryy.content} />
             
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
    </>
  );
};

export default Queries;
