import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import NavBar from "./Navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login(purpose) {
  const initialValues = {
    email: "",
    password: "",
  };
  const nav = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const onSubmit = (values, { resetForm }) => {
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "error") alert("Invalid credentials");
        else {
          nav("/dashboard");
        }
      })
      .catch((error) => {
        alert("Retry");
      });

    // console.log('Form submitted with values:', values);
    resetForm(initialValues);
  };
  const [isHovered, setHovered] = useState(false);

  return (
    <>
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            perspective: "1000px",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            transform: isHovered ? "rotateY(10deg)" : "rotateY(0)",
            boxShadow: isHovered ? "0 15px 30px rgba(0, 0, 0, 1)" : "none",
          }}
          container
          spacing={0}
          columns={12}
        >
          <Grid item xs={4}>
            <Item
              style={{
                background:
                  'url("https://c4.wallpaperflare.com/wallpaper/384/818/513/himalayas-mountains-landscape-nature-wallpaper-preview.jpg")',
                backgroundPosition: "center",
                height: "100%",
                width: "100%",

                backgroundRepeat: "no-repeat",
              }}
            ></Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Card style={{ backgroundColor: "#f4f4f4" }}>
                <Card.Body>
                  <h2
                    className="text-center"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    Login
                  </h2>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary mt-3"
                          disabled={isSubmitting}
                        >
                          Login
                        </button>
                        <center className="mt-2"><GoogleLogin
  onSuccess={credentialResponse => {
    const decode=jwtDecode(credentialResponse?.credential);
    console.log(decode);
    const requestBody = {
      email: decode.email, // Assuming decode is an object with an email property
    };
    
    fetch(`${BASE_URL}/Googlelogin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "error") {
          alert("Invalid credentials");
        } else {
          nav("/dashboard");
        }
      })
      .catch((error) => {
        alert("Retry");
      });
    
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;</center>
                        
                        <p className="mt-3">
                          Don't have an account?{" "}
                          <a
                            href="/signup"
                            onClick={() => {
                              // Redirect to the signup page
                              window.location.href = "/signup";
                            }}
                          >
                            Sign up
                          </a>
                        </p>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;
