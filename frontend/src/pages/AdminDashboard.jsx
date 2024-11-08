import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

const drawerWidth = 240;

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  minHeight: '100vh',
}));

function AdminDashboard() {
  const theme = useTheme();
  const [selectedPage, setSelectedPage] = React.useState('Users');

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  // Render content based on selected page
  const renderContent = () => {
    switch (selectedPage) {
      case 'Users':
        return <Typography>All Users Data Goes Here</Typography>;
      case 'Courses':
        return <Typography>All Courses Data Goes Here</Typography>;
      default:
        return <Typography>Select a section to view data</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Sidebar Navigation Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
        <List>
          <ListItem
            button
            onClick={() => handleSelectPage('Users')}
            sx={{
              backgroundColor: selectedPage === 'Users' ? theme.palette.primary.main : 'transparent',
              color: selectedPage === 'Users' ? '#fff' : 'inherit',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: '#fff',
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedPage === 'Users' ? '#fff' : 'inherit' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleSelectPage('Courses')}
            sx={{
              backgroundColor: selectedPage === 'Courses' ? theme.palette.primary.main : 'transparent',
              color: selectedPage === 'Courses' ? '#fff' : 'inherit',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: '#fff',
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedPage === 'Courses' ? '#fff' : 'inherit' }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <MainContent component="main">
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          {selectedPage}
        </Typography>
        <Box sx={{ padding: theme.spacing(2), backgroundColor: '#fff', borderRadius: 2 }}>
          {renderContent()}
        </Box>
      </MainContent>
    </Box>
  );
}

export default AdminDashboard;
