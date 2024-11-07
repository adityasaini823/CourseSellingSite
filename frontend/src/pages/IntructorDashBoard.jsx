import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
function Settings() {
  return <div>HelloSettings</div>;
}
export default Settings;

const drawerWidth = 240;

const InstructorDashBoard = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Typography variant="h4" gutterBottom>
            Welcome to the Dashboard!
          </Typography>
        );
      case "settings":
        return <Settings />;
      case "logout":
        return (
          <Typography variant="h4" gutterBottom>
            Are you sure you want to logout?
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem
            button
            onClick={() => handleTabClick("dashboard")}
            sx={{
              backgroundColor:
                activeTab === "dashboard" ? "#f5f5f5" : "transparent",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleTabClick("settings")}
            sx={{
              backgroundColor:
                activeTab === "settings" ? "#f5f5f5" : "transparent",
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleTabClick("logout")}
            sx={{
              backgroundColor:
                activeTab === "logout" ? "#f5f5f5" : "transparent",
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: `${drawerWidth}px`,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg">
          {renderContent()} {/* Render the content based on activeTab */}
        </Container>
      </Box>
    </Box>
  );
};

export default InstructorDashBoard;
