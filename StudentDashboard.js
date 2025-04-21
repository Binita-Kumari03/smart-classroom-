import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import {
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  Event as EventIcon,
  Download as DownloadIcon,
  Quiz as QuizIcon,
} from '@mui/icons-material';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState(5);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Dashboard
        </Typography>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="My Profile" icon={<PersonIcon />} />
            <Tab label="Attendance" icon={<EventIcon />} />
            <Tab label="Report Card" icon={<AssessmentIcon />} />
            <Tab label="Upcoming Tests" />
            <Tab label="Download Lectures" />
            <Tab label="Quiz" icon={<QuizIcon />} />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Personal Information</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Name" secondary="Jane Smith" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Class" secondary="10th Grade" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Roll Number" secondary="2023001" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Email" secondary="jane.smith@school.edu" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Attendance Records</Typography>
                  <List>
                    {/* Attendance records will be populated here */}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Report Card</Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    startIcon={<AssessmentIcon />}
                  >
                    View Report Card
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Upcoming Tests</Typography>
                  <List>
                    {/* Upcoming tests will be populated here */}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 4 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Available Lectures</Typography>
                  <List>
                    {/* Available lectures will be populated here */}
                  </List>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                  >
                    Download Lecture
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 5 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Quiz Section</Typography>
                  <Button
                    component="a"
                    href="http://localhost:8080/smartclassroom/quiz.html"
                    target="_blank"
                    rel="noopener"
                    variant="contained"
                    startIcon={<QuizIcon />}
                    sx={{ mt: 2 }}
                  >
                    Take the Quiz
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

      </Box>
    </Container>
  );
}

export default StudentDashboard;