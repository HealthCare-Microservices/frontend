import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";

const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#f8a5c2" }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1,fontWeight:"bold",fontStyle:"italic" }}>
          Health Care
        </Typography>
        <Avatar
          alt="User Avatar"
          src="/broken-image.jpg"
          onClick={handleMenuOpen}
          sx={{ cursor: "pointer" }}
        />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
