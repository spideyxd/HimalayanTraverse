import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { Container } from "react-bootstrap";

const AddressForm = () => {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      quantity: 0,
      rentalDays: 0,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      zipCode: Yup.string().required("ZIP Code is required"),
      quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
      rentalDays: Yup.number().min(1, "Rental days must be at least 1").required("Rental days are required"),
    }),
    onSubmit: (values) => {
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date

      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbw3uXpfdLi195Ff3KilAnYiSX35BgyDAAseK4zf448kql9q0R9xedKFekUjr1wSM-9t/exec";
      
      const payload = {
        ...values,
        currentDate,
      };

      console.log(payload);

      fetch(`${process.env.REACT_APP_BASE_URL}/send-message`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Address saved successfully:", data);
          nav("/payment");
        })
        .catch((error) => {
          console.error("Error saving address:", error);
        });

      formik.resetForm(); // Reset Formik's form values
    },
  });

  return (
    <>
      <NavBar />
      &nbsp;
      <Container className="mt-5">
        <div className="container mt-5">
          <form onSubmit={formik.handleSubmit}>
          <h2>Address</h2>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-control ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="invalid-feedback">{formik.errors.fullName}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={`form-control ${
                  formik.touched.address && formik.errors.address
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="invalid-feedback">{formik.errors.address}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`form-control ${
                  formik.touched.city && formik.errors.city ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("city")}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="invalid-feedback">{formik.errors.city}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="zipCode" className="form-label">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                className={`form-control ${
                  formik.touched.zipCode && formik.errors.zipCode
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("zipCode")}
              />
              {formik.touched.zipCode && formik.errors.zipCode ? (
                <div className="invalid-feedback">{formik.errors.zipCode}</div>
              ) : null}
            </div>
            
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className={`form-control ${
                  formik.touched.quantity && formik.errors.quantity
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("quantity")}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="invalid-feedback">{formik.errors.quantity}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="rentalDays" className="form-label">
                Rental Days
              </label>
              <input
                type="number"
                id="rentalDays"
                name="rentalDays"
                className={`form-control ${
                  formik.touched.rentalDays && formik.errors.rentalDays
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("rentalDays")}
              />
              {formik.touched.rentalDays && formik.errors.rentalDays ? (
                <div className="invalid-feedback">{formik.errors.rentalDays}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary">
              Save Address
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddressForm;
