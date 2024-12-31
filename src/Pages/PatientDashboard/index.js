import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from "@mui/material";
import { Avatar } from "@mui/material";
import NavigationBar from "../../Components/NavigationBar";

const PatientDashboard = () => {
  const [view, setView] = useState("upcoming");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Smith",
      description: "General Checkup",
      time: "10:00 AM",
      type: "upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Jane",
      description: "Dental Cleaning",
      time: "3:00 PM",
      type: "upcoming",
    },
    {
      id: 3,
      doctor: "Dr. Doe",
      description: "Eye Exam",
      time: "Last Week",
      type: "previous",
    },
  ]);

  const handleViewChange = (event, newView) => {
    if (newView) {
      setView(newView);
    }
  };

  const handleCancelAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <Box sx={{height:"100vh"}}>
      {/* Navigation Bar */}
      <NavigationBar />

      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Patient Profile Section */}
        
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              backgroundColor: "#f6d1e6", // Background color for card
              opacity: 0.8, // Reduced opacity for card
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a soft shadow for better appearance
            }}
          >
            <CardContent sx={{ padding: 5 }}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Patient Profile
              </Typography>
              <Avatar
                alt="Patient Avatar"
                src="/broken-image.jpg"
                sx={{
                  width: 150,
                  height: 150,
                  margin: "0 auto",
                  marginBottom: 2,
                }}
              />
              <Typography style={{ fontSize: "1rem" }}>Full Name: John Doe</Typography>
              <Typography style={{ fontSize: "1rem" }}>Gender: M</Typography>
              <Typography style={{ fontSize: "1rem" }}>Age: 23</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments Section */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Appointments</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#f8a5c2" }}
            // sx={{backgroundColor:"#5a98f2"}}
            >
              Add Appointment
            </Button>
          </Box>

          {/* Toggle View for Appointments */}
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value="upcoming" sx={{ backgroundColor: "#f6d1e6" }}>
              Upcoming
            </ToggleButton>
            <ToggleButton value="previous" sx={{ backgroundColor: "#f9c2d9" }}>
              Previous
            </ToggleButton>
          </ToggleButtonGroup>

          {/* List of Appointments */}
          <List>
            {appointments
              .filter((appointment) => appointment.type === view)
              .map((appointment) => (
                <ListItem
                  key={appointment.id}
                  sx={{
                    border: "1px solid #f9c2d9",
                    marginBottom: 1,
                    borderRadius: "8px",
                  }}
                  secondaryAction={
                    view === "upcoming" && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: "#f8a5c2", color: "white" }}
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancel
                      </Button>
                    )
                  }
                >
                  <ListItemText
                    primary={`${appointment.doctor} - ${appointment.description}`}
                    secondary={appointment.time}
                  />
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
