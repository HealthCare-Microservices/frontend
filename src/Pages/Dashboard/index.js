import React, { useEffect } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import NavigationBar from "../../Components/NavigationBar";
import { useNavigate } from "react-router-dom";
import useGetPatients from "./hooks/useGetPatients";
import useGetAppointments from "./hooks/useGetAppointments";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: appointments } = useGetAppointments();
  const { data: patients } = useGetPatients();

  const handleAddPatient = () => {
    navigate("/register/patient");
  };

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/");
    }
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      {/* Navigation Bar */}
      <NavigationBar />

      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Patient Profile Section */}

        <Grid item xs={12} md={5}>
          <Box
            sx={{
              padding: "16px",
              overflowY: "auto",
              borderRight: "3px solid #f8bbd0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="h6">Patients</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "#f8a5c2", maxWidth: "200px" }}
                onClick={handleAddPatient}
              >
                Add Patient
              </Button>
            </Box>
            <List>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <ListItem
                    key={patient.id}
                    sx={{
                      backgroundColor: "#ffffff",
                      marginBottom: "8px",
                      borderRadius: "8px",
                      boxShadow: "2px 2px 5px #ccc",
                    }}
                  >
                    <ListItemText primary={patient.fullName} />
                  </ListItem>
                ))
              ) : (
                <div style={{ color: "#bbb", fontWeight: "bold" }}>
                  No Patients
                </div>
              )}
            </List>
          </Box>
        </Grid>

        {/* Appointments Section */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Appointments</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#f8a5c2", maxWidth: "200px" }}
              onClick={() => navigate("/appointment")}
            >
              Add Appointment
            </Button>
          </Box>

          {/* List of Appointments */}
          <List>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <ListItem
                  key={appointment.id}
                  sx={{
                    border: "1px solid #f9c2d9",
                    marginBottom: 1,
                    borderRadius: "8px",
                  }}
                >
                  <ListItemText
                    primary={`${appointment.patientName} - ${appointment.appointmentDate}`}
                    secondary={appointment.appointmentTime}
                  />
                </ListItem>
              ))
            ) : (
              <div style={{ color: "#bbb", fontWeight: "bold" }}>
                No Appointments
              </div>
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
