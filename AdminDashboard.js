import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Checkbox,
} from '@mui/material';
import {
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Message as MessageIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { AppContext } from '../context/AppContext';
import TimetableManager from './TimetableManager';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = [
  '8:00 - 9:00',
  '9:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 1:00',
  '1:00 - 2:00',
  '2:00 - 3:00',
  '3:00 - 4:00',
];

function AdminDashboard() {
  const { facultyList, students, addStudent, addFaculty } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [timetable, setTimetable] = useState({});
  const [newSchedule, setNewSchedule] = useState({
    day: '',
    time: '',
    class: '',
    subject: '',
    faculty: '',
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    department: '',
    email: '',
    phone: '',
  });
  const [openStudentEditDialog, setOpenStudentEditDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentEditFormData, setStudentEditFormData] = useState({
    name: '',
    sem: '',
    department: '',
    rollNumber: '',
    email: '',
    phone: '',
  });
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [messageRecipients, setMessageRecipients] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSchedule({
      day: '',
      time: '',
      class: '',
      subject: '',
      faculty: '',
    });
  };

  const handleAddSchedule = () => {
    const { day, time, class: class_, subject, faculty: faculty_ } = newSchedule;
    const key = `${day}-${time}`;
    
    setTimetable(prev => ({
      ...prev,
      [key]: {
        class: class_,
        subject,
        faculty: faculty_,
      }
    }));
    
    handleCloseDialog();
  };

  const handleAddStudent = (newStudent) => {
    addStudent(newStudent);
  };

  const handleOpenEditDialog = (faculty) => {
    setEditingFaculty(faculty);
    setEditFormData({
      name: faculty.name,
      department: faculty.department,
      email: faculty.email || '',
      phone: faculty.phone || '',
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingFaculty(null);
    setEditFormData({
      name: '',
      department: '',
      email: '',
      phone: '',
    });
  };

  const handleAddFaculty = (newFaculty) => {
    addFaculty(newFaculty);
  };

  const handleEditFaculty = () => {
    if (editingFaculty) {
      const updatedFaculty = {
        ...editingFaculty,
        ...editFormData,
      };
      
      // Update the faculty in the list
      const updatedFacultyList = facultyList.map(f => 
        f.id === editingFaculty.id ? updatedFaculty : f
      );
      
      // Update localStorage
      localStorage.setItem('faculty', JSON.stringify(updatedFacultyList));
      
      handleCloseEditDialog();
    }
  };

  const handleDeleteFaculty = (facultyId) => {
    const updatedFacultyList = facultyList.filter(f => f.id !== facultyId);
    localStorage.setItem('faculty', JSON.stringify(updatedFacultyList));
  };

  const handleOpenStudentEditDialog = (student) => {
    setEditingStudent(student);
    setStudentEditFormData({
      name: student.name,
      sem: student.sem,
      department: student.department || '',
      rollNumber: student.rollNumber || '',
      email: student.email || '',
      phone: student.phone || '',
    });
    setOpenStudentEditDialog(true);
  };

  const handleCloseStudentEditDialog = () => {
    setOpenStudentEditDialog(false);
    setEditingStudent(null);
    setStudentEditFormData({
      name: '',
      sem: '',
      department: '',
      rollNumber: '',
      email: '',
      phone: '',
    });
  };

  const handleEditStudent = () => {
    if (editingStudent) {
      const updatedStudent = {
        ...editingStudent,
        ...studentEditFormData,
      };
      
      // Update the student in the list
      const updatedStudents = students.map(s => 
        s.id === editingStudent.id ? updatedStudent : s
      );
      
      // Update localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      handleCloseStudentEditDialog();
    }
  };

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter(s => s.id !== studentId);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const handleOpenMessageDialog = () => {
    const allRecipients = [
      ...facultyList.map(f => ({ id: f.id, name: f.name, type: 'Faculty' })),
      ...students.map(s => ({ id: s.id, name: s.name, type: 'Student' }))
    ];
    setMessageRecipients(allRecipients);
    setSelectedRecipients([]);
    setMessageContent('');
    setOpenMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setOpenMessageDialog(false);
    setMessageContent('');
    setSelectedRecipients([]);
  };

  const handleRecipientSelection = (recipient) => {
    setSelectedRecipients(prev => {
      const isSelected = prev.some(r => r.id === recipient.id);
      if (isSelected) {
        return prev.filter(r => r.id !== recipient.id);
      } else {
        return [...prev, recipient];
      }
    });
  };

  const handleSendMessage = () => {
    if (messageContent.trim() && selectedRecipients.length > 0) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', {
        content: messageContent,
        recipients: selectedRecipients
      });
      handleCloseMessageDialog();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
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
            <Tab label="Faculty Management" />
            <Tab label="Student Management" />
            <Tab label="Timetable" />
            <Tab label="Messages" />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add New Faculty
                  </Typography>
                  <Button variant="contained" onClick={() => handleAddFaculty({ 
                    id: Date.now(), 
                    name: 'New Faculty', 
                    department: 'Department',
                    email: 'email@example.com',
                    phone: '1234567890'
                  })}>
                    Add Faculty
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Faculty List
                  </Typography>
                  <List>
                    {facultyList.map((faculty, index) => (
                      <React.Fragment key={faculty.id}>
                        <ListItem
                          secondaryAction={
                            <Box>
                              <IconButton
                                edge="end"
                                onClick={() => handleOpenEditDialog(faculty)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                edge="end"
                                onClick={() => handleDeleteFaculty(faculty.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          }
                        >
                          <ListItemText
                            primary={faculty.name}
                            secondary={
                              <>
                                <Typography component="span" variant="body2">
                                  Department: {faculty.department}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  Email: {faculty.email}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  Phone: {faculty.phone}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        {index < facultyList.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add New Student
                  </Typography>
                  <Button variant="contained" onClick={() => handleAddStudent({ 
                    id: Date.now(), 
                    name: 'New Student', 
                    sem: '1',
                    department: 'Computer Science',
                    rollNumber: '001',
                    email: 'student@example.com',
                    phone: '1234567890'
                  })}>
                    Add Student
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Student List
                  </Typography>
                  <List>
                    {students.map((student, index) => (
                      <React.Fragment key={student.id}>
                        <ListItem
                          secondaryAction={
                            <Box>
                              <IconButton
                                edge="end"
                                onClick={() => handleOpenStudentEditDialog(student)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                edge="end"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          }
                        >
                          <ListItemText
                            primary={student.name}
                            secondary={
                              <>
                                <Typography component="span" variant="body2">
                                  Semester: {student.sem}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  Department: {student.department}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  Roll Number: {student.rollNumber}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  Email: {student.email}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  Phone: {student.phone}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        {index < students.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
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
                  <Typography variant="h6" gutterBottom>
                    Timetable Management
                  </Typography>
                  <TimetableManager faculty={facultyList} />
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
                  <Typography variant="h6">Messages</Typography>
                  <Button 
                    variant="contained" 
                    onClick={handleOpenMessageDialog}
                    sx={{ mt: 2 }}
                  >
                    New Message
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add Schedule</DialogTitle>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="Class"
              value={newSchedule.class}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, class: e.target.value }))}
              sx={{ mt: 2 }}
            >
              {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Subject"
              value={newSchedule.subject}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, subject: e.target.value }))}
              sx={{ mt: 2 }}
            />
            <TextField
              select
              fullWidth
              label="Faculty"
              value={newSchedule.faculty}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, faculty: e.target.value }))}
              sx={{ mt: 2 }}
            >
              {facultyList.map((f) => (
                <MenuItem key={f.id} value={f.name}>
                  {f.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddSchedule} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Faculty Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={editFormData.name}
              onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Department"
              fullWidth
              value={editFormData.department}
              onChange={(e) => setEditFormData(prev => ({ ...prev, department: e.target.value }))}
            />
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
            <Button onClick={handleEditFaculty} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openStudentEditDialog} onClose={handleCloseStudentEditDialog}>
          <DialogTitle>Edit Student Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={studentEditFormData.name}
              onChange={(e) => setStudentEditFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Semester"
              fullWidth
              value={studentEditFormData.sem}
              onChange={(e) => setStudentEditFormData(prev => ({ ...prev, sem: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Department"
              fullWidth
              value={studentEditFormData.department}
              onChange={(e) => setStudentEditFormData(prev => ({ ...prev, department: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Roll Number"
              fullWidth
              value={studentEditFormData.rollNumber}
              onChange={(e) => setStudentEditFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={studentEditFormData.email}
              onChange={(e) => setStudentEditFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Phone"
              fullWidth
              value={studentEditFormData.phone}
              onChange={(e) => setStudentEditFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStudentEditDialog}>Cancel</Button>
            <Button onClick={handleEditStudent} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog 
          open={openMessageDialog} 
          onClose={handleCloseMessageDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>New Message</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Select Recipients ({selectedRecipients.length} selected)
              </Typography>
              <List>
                {messageRecipients.map((recipient) => (
                  <ListItem key={recipient.id}>
                    <ListItemText
                      primary={recipient.name}
                      secondary={recipient.type}
                    />
                    <Checkbox
                      checked={selectedRecipients.some(r => r.id === recipient.id)}
                      onChange={() => handleRecipientSelection(recipient)}
                    />
                  </ListItem>
                ))}
              </List>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessageDialog}>Cancel</Button>
            <Button 
              onClick={handleSendMessage} 
              variant="contained"
              disabled={!messageContent.trim() || selectedRecipients.length === 0}
            >
              Send Message
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default AdminDashboard; 