import React, { useState } from "react";
import "./PatientRegister.css";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await apiClient.post("/api/v1/patients", formData);
        console.log("API Response:", response);
        setSuccessMessage("Patient registered successfully!");
        setErrors({});
        setTimeout(() => {
          navigate("/"); // Redirect to login
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors); // Display field errors
        } else {
          setErrors({ apiError: "An unexpected error occurred" });
        }
      }
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Patient Registration</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.apiError && <p className="error-message">{errors.apiError}</p>}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <small className="error">{errors.fullName}</small>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <small className="error">{errors.dob}</small>}
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Enter Address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            {errors.address && <small className="error">{errors.address}</small>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;


