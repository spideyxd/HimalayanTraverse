import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useLocation } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone is required"),
  address: Yup.string().required("State is required"),
  sex: Yup.string().required("Sex is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(18, "Age must be at least 18")
    .max(100, "Age must be at most 100"),
  bio: Yup.string().optional(), // Optional, you can customize the validation if needed
  experienceLevel: Yup.string().required("Experience Level is required"),
  // Add validation for other fields as needed
  medicalConditions: Yup.array().optional(), // Optional, adjust the validation as needed
});

const medicalConditions = [
  "Hypertension",
  "Diabetes",
  "Asthma",
  "Heart Disease",
  "Allergies",
  "Arthritis",
  "Thyroid Disorders",
  "Cancer",
  "Chronic Kidney Disease",
  "Depression",
  "Epilepsy",
  "Gastrointestinal Disorders",
  "High Altitude Sickness",
  "Respiratory Disorders",
  "Musculoskeletal Injuries",
  "Dehydration",
  "Heat Exhaustion",
  "Frostbite",
  "Severe Anemia",
  "Pregnancy",
];

const pastTreks = [
  "Everest Base Camp",
  "K2 Base Camp",
];

function getStyles(name, selectedConditions, theme) {
  return {
    fontWeight:
      selectedConditions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ProfileDetails() {
  const theme = useTheme();
  const [selectedConditions, setSelectedConditions] = React.useState([]);
  const [selectedPastTreks, setSelectedPastTreks] = React.useState([]);

  const location = useLocation();
  const { email } = location.state || {};
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    setSelectedConditions( [...value]);
    console.log(selectedConditions);  
};

  const handlePastTreksChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPastTreks([...value]);
  };

  const nav = useNavigate();

  const initialValues = {
    email: "",
    phone: "",
    address: "",
    sex: "", // Add default value or leave it empty based on your preference
    age: 0, // Add default value or leave it as per your requirement
    bio: "", // Add default value or leave it empty based on your preference
    experienceLevel: "", // Add default value or leave it empty based on your preference
    // Add other fields with default values if needed
    medicalHistory: [], // An array to store selected medical conditions, starts empty
    pastTreks: [],
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const onSubmit = (values, { resetForm }) => {
    values.email = email;
    values.medicalHistory = selectedConditions;
  values.pastTreks = selectedPastTreks;
    fetch(`${BASE_URL}/updateProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "error") alert("error");
        else {
          alert("Registration Successfull");
          
          nav("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    resetForm(initialValues);
  };

  return (
    <>
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card>
          <Card.Body>
            <h2 className="text-center">Details</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">State</label>
                    <Field
                      as="select"
                      id="address"
                      name="address"
                      className="form-control"
                    >
                      <option value=""></option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </Field>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sex">Sex</label>
                    <Field
                      as="select"
                      id="sex"
                      name="sex"
                      className="form-control"
                    >
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="sex"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <Field
                      type="number"
                      id="age"
                      name="age"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <Field
                      as="textarea"
                      id="bio"
                      name="bio"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experienceLevel">Experience Level</label>
                    <Field
                      as="select" // Use "as" attribute to render a select element
                      id="experienceLevel"
                      name="experienceLevel"
                      className="form-control"
                    >
                      <option value=""></option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </Field>
                    <ErrorMessage
                      name="experienceLevel"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <label htmlFor="medicalCondition">Medical History</label>
                      <Select
                        id="medical-conditions"
                        multiple
                        value={selectedConditions}
                        onChange={handleChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {medicalConditions.map((condition) => (
                          <MenuItem
                            key={condition}
                            value={condition}
                            style={getStyles(
                              condition,
                              selectedConditions,
                              theme
                            )}
                          >
                            {condition}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <label htmlFor="pastTreks">Past Treks</label>
                      <Select
                        id="past-treks"
                        multiple
                        value={selectedPastTreks}
                        onChange={handlePastTreksChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {pastTreks.map((trek) => (
                          <MenuItem
                            key={trek}
                            value={trek}
                            style={getStyles(trek, selectedPastTreks, theme)}
                          >
                            {trek}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ProfileDetails;
