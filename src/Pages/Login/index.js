import React, { useState } from "react";
import "./css/login.css"; // External CSS file for styles
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    const newErrors = { ...errors };

    if (name === "username" && !updatedValue) {
      newErrors.username = "Username is required";
    } else if (name === "username") {
      delete newErrors.username;
    }

    if (name === "password" && !updatedValue) {
      newErrors.password = "Password is required";
    } else if (name === "password") {
      delete newErrors.password;
    }

    if (name === "termsAccepted" && !updatedValue) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    } else if (name === "termsAccepted") {
      delete newErrors.termsAccepted;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-group terms">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label htmlFor="termsAccepted">Accept Terms and Conditions</label>
            {errors.termsAccepted && (
              <span className="error">{errors.termsAccepted}</span>
            )}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="register-link">
            Don’t have an account?{" "}
            <Link to={"/register/patient"}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

/* CSS for the Login component */
