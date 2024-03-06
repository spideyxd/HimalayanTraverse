import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AddTreks = () => {
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


  const handleAddTrek = async () => {
    const email=user.email;
    if (!title || !description || !location || !imgSrc) {
        setError("All fields are required");
        return;
      }

      try {
        
        const response = await fetch(`${BASE_URL}/addTrek`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            location,
            imgSrc,
            email
          }),
        });
  
        if (response.ok) {
            setTitle("");
            setImgSrc("");
            setDescription("");
            setLocation("");
            setError("");
          nav("/HiddenGems");
          window.location.reload();
        } else {
          console.error("Failed to add this hidden gem");
        }
      } catch (error) {
        console.error("Error adding this hidden gem:", error);
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
              placeholder="Title"
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
              placeholder="Google Map Link"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-2" variant="primary" onClick={handleAddTrek}>
            List this Hidden Gem
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

export default AddTreks;
