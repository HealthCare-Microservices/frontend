import React, { useState } from "react";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./DoctorRegister.css";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    opDays: [],
    specialization: [],
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map((option) => option.value);
    setFormData({ ...formData, [name]: values });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (formData.opDays.length === 0) newErrors.opDays = "Operation days are required";
    if (formData.specialization.length === 0)
      newErrors.specialization = "Specialization is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await apiClient.post("/api/v1/doctors", formData);
        console.log("API Response:", response);
        setSuccessMessage("Doctor registered successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect to doctor login
        }, 2000);
      } catch (error) {
        setErrors({
          apiError: error.response?.data || "An unexpected error occurred during registration",
        });
      }
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Doctor Registration</h2>
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
            {errors.fullName && <span className="error">{errors.fullName}</span>}
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
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
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
            {errors.phone && <span className="error">{errors.phone}</span>}
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
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label>Operation Days</label>
            <select
              name="opDays"
              multiple
              value={formData.opDays}
              onChange={handleMultiSelectChange}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            {errors.opDays && <span className="error">{errors.opDays}</span>}
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <textarea
              name="specialization"
              placeholder="Enter Specialization (comma-separated)"
              rows="2"
              value={formData.specialization}
              onChange={(e) =>
                setFormData({ ...formData, specialization: e.target.value.split(",") })
              }
            ></textarea>
            {errors.specialization && <span className="error">{errors.specialization}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;


