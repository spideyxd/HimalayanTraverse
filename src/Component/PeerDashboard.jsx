import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { Button } from "react-bootstrap";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../stylesheets/Dashboard.css";
import { useLocation } from "react-router-dom";

export default function PeerDashboard() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();

  const location = useLocation();
  const { responseData } = location.state;
  const [user, setUser] = useState(responseData);
    
  const handleItemClick = () => {
    console.log("yaha");
    // Call the API to add the notification ID and user data to the database as conversations
    fetch(`${BASE_URL}/addNotificationAsConversation/${responseData._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
      body: JSON.stringify({ user }), // Send user data in the request body
    })
      .then((response) => {
        if (response.ok) {
          console.log(
            "Notification ID and user data added as conversation successfully"
          );
          nav("/AllChat");
        } else {
          console.error(
            "Failed to add notification ID and user data as conversation"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <NavBar />

      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <MDBTypography tag="h5">{user.name}</MDBTypography>
                    <MDBCardText>{user.bio}</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">About</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Sex</MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.sex}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Age</MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.age}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Current Residence
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.address}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Medical History
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.medicalHistory ? (
                              user.medicalHistory.map((condition, index) => (
                                <React.Fragment key={index}>
                                  {condition}
                                  <br />
                                </React.Fragment>
                              ))
                            ) : (
                              <span>No medical history available</span>
                            )}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6">Treks</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Experience</MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.experienceLevel}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Past Treks</MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.pastTreks ? (
                              user.pastTreks.map((trek, index) => (
                                <React.Fragment key={index}>
                                  {trek}
                                  <br />
                                </React.Fragment>
                              ))
                            ) : (
                              <span>No past treks available</span>
                            )}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="twitter me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow style={{marginTop:"-15vh"}} className="justify-content-center">
            <MDBCol className="text-center">
              <Button color="primary" onClick={handleItemClick}>Direct Message</Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
