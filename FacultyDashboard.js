import React, { useState, useContext, useEffect } from 'react';
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
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  Upload as UploadIcon,
  Message as MessageIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { AppContext } from '../context/AppContext';

function FacultyDashboard() {
  const { students, messages, lectures, attendance, addMessage, addLecture, addAttendance, faculty } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({
    email: faculty?.email || '',
    phone: faculty?.phone || '',
  });
  const [myStudents, setMyStudents] = useState([]);

  
  // Add these new states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add new function to fetch students
  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      if (faculty?.department) {
        setMyStudents(data.filter(student => student.department === faculty.department));
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching students:', error);
    } finally {
      setIsLoading(false);
    }
  };





  useEffect(() => {
    if (faculty?.department) {
      fetchStudents();
    }
  }, [faculty]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      addLecture({
        title: file.name,
        file: file,
        uploadedBy: 'Faculty',
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage({
        content: newMessage,
        sender: 'Faculty',
        receiver: 'Students',
      });
      setNewMessage('');
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: attendanceDate,
          studentId: myStudents.map(student => ({
            id: student._id,
            status: 'present'
          })),
          markedBy: faculty._id
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark attendance');
      }
      const data = await response.json();
      console.log('Attendance marked:', data);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const handleOpenEditDialog = () => {
    setEditFormData({
      email: faculty?.email || '',
      phone: faculty?.phone || '',
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/faculty/${faculty._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      if (!response.ok) {
        throw new Error('Failed to update details');
      }
      const data = await response.json();
      console.log('Updated details:', data);
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  const handleViewPerformance = (studentId) => {
    // Implement the logic to view performance for a student
    console.log('View performance for student:', studentId);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" color="error" gutterBottom>
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!faculty) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            No faculty data available
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Faculty Dashboard
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
            <Tab label="My Profile" />
            <Tab label="My Students" />
            <Tab label="Attendance" />
            <Tab label="Report Cards" />
            <Tab label="Upload Lectures" />
            <Tab label="Messages" />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Personal Information</Typography>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleOpenEditDialog}
                    >
                      Edit
                    </Button>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Name"
                        secondary={faculty.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Department"
                        secondary={faculty.department}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={editFormData.email || faculty.email || 'Not provided'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone"
                        secondary={editFormData.phone || faculty.phone || 'Not provided'}
                      />
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
                  <Typography variant="h6" gutterBottom>
                    My Students ({myStudents.length})
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Semester</TableCell>
                          <TableCell>Roll Number</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.sem}</TableCell>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleViewPerformance(student.id)}
                              >
                                View Performance
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
                  <Typography variant="h6">Attendance Records</Typography>
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      type="date"
                      label="Date"
                      value={attendanceDate}
                      onChange={(e) => setAttendanceDate(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleMarkAttendance}>
                      Mark Attendance
                    </Button>
                  </Box>
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
                  <Typography variant="h6">Upload Lectures</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<UploadIcon />}
                    >
                      Upload File
                      <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    {selectedFile && (
                      <Typography sx={{ mt: 2 }}>
                        Selected: {selectedFile.name}
                      </Typography>
                    )}
                  </Box>
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
                  <Typography variant="h6">Messages</Typography>
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="New Message"
                      variant="outlined"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      startIcon={<MessageIcon />}
                      onClick={handleSendMessage}
                    >
                      Send Message
                    </Button>
                  </Box>
                  <List sx={{ mt: 2 }}>
                    {messages.map((message) => (
                      <ListItem key={message.id}>
                        <ListItemText
                          primary={message.content}
                          secondary={`Sent on: ${new Date(message.timestamp).toLocaleString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Personal Details</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={editFormData.email}
              onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Phone"
              fullWidth
              value={editFormData.phone}
              onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleEditDetails} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default FacultyDashboard; 