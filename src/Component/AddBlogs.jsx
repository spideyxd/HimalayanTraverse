import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ShortForm = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const nav = useNavigate();
    const [user, setUser] = useState({});
  
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
          setUser(userData);
        })
        .catch((err) => {
          nav("/login");
        });
    }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [error, setError] = useState("");

  const handleAddShort = async () => {
    // Simple validation
    if (!title || !description || !location || !imgSrc) {
      setError("All fields are required");
      return;
    }

    try {
      // Run API to save the short data
      const response = await fetch(`${BASE_URL}/addShort`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          imgSrc,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setLocation("");
        setImgSrc("");
        setError("");
        nav("/blogs");
        window.location.reload();
      } else {
        console.error("Failed to add short");
      }
    } catch (error) {
      console.error("Error adding short:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Container className="bg-light">
        <div>
          <Form.Group>
            &nbsp;
            <Form.Control
              style={{
                marginTop: "90px",
                "@media (max-width: 768px)": {
                  marginTop: "10px",
                },
                "@media (max-width: 576px)": {
                  marginTop: "5px",
                },
                height: "7vh",
              }}
              type="text"
              placeholder="Shorts Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              style={{
                height: "5vh",
              }}
              type="text"
              className="mt-5"
              placeholder="Image URL"
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
            />

            <Form.Control
              style={{
                height: "14vh",
              }}
              as="textarea"
              className="mt-5"
              placeholder="Shorts Description . . ."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              style={{
                height: "5vh",
              }}
              className="mt-5"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-2" variant="primary" onClick={handleAddShort}>
            Add Short
          </Button>

          {error && (
            <div className="text-danger mt-2">
              <strong>{error}</strong>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ShortForm;
