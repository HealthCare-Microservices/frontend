import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import PatientDashboard from "./Pages/PatientDashboard";
import PatientRegister from "./Pages/PatientRegistration";
import DoctorRegister from "./Pages/DoctorRegistration";

function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PatientDashboard/>} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />
        {/* <Route path="*" element={<div>404</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
