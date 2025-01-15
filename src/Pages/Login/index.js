import React, { useEffect, useState } from "react";
import "./css/login.css"; // External CSS file for styles
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { apiClientDoctor } from "../../api/axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const newErrors = { ...errors };

    if (name === "email" && !value) {
      newErrors.email = "Email is required";
    } else if (name === "email") {
      delete newErrors.email;
    }

    if (name === "password" && !value) {
      newErrors.password = "Password is required";
    } else if (name === "password") {
      delete newErrors.password;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await apiClientDoctor.post("/api/v1/doctors/login", null, {
          params: { email: formData.email, password: formData.password },
        });
        console.log("Login Response:", response.data);
        if(response.data){
          localStorage.setItem("id",response.data)
        }
        setSuccessMessage("Login successful!");

        // Redirect to doctor dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        setErrors({
          apiError:
            error.response?.data ||
            "Invalid email or password. Please try again.",
        });
      }
    }
  };

  useEffect(() => {
    if(localStorage.getItem("id")){
      navigate("/dashboard")
    }
  }, [])
  
  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Doctor Login</h2>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errors.apiError && (
            <p className="error-message">{errors.apiError}</p>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
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
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="register-link">
            Don’t have an account?{" "}
            <Link to={"/register/doctor"}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

/* CSS for the Login component */
