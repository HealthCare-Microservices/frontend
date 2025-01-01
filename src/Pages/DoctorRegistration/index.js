import React, { useState } from "react";
import "./DoctorRegister.css";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.speciality) newErrors.speciality = "Speciality is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Doctor Registered:", formData);
      // Call the backend API here
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Doctor Registration</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
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
            {errors.email && <span className="text-danger">{errors.email}</span>}
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
            {errors.phone && <span className="text-danger">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Speciality</label>
            <input
              type="text"
              name="speciality"
              placeholder="Enter Speciality"
              value={formData.speciality}
              onChange={handleChange}
            />
            {errors.speciality && (
              <span className="text-danger">{errors.speciality}</span>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;

