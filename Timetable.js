import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

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

function Timetable({ faculty, timetable: initialTimetable, onTimetableChange }) {
  const [timetable, setTimetable] = useState(initialTimetable || {});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [newSchedule, setNewSchedule] = useState({
    day: '',
    time: '',
    subject: '',
    faculty: '',
  });

  const handleOpenDialog = (day, time, schedule = null) => {
    if (schedule) {
      setDialogMode('edit');
      setNewSchedule({
        day,
        time,
        subject: schedule.subject,
        faculty: schedule.faculty,
      });
    } else {
      setDialogMode('add');
      setNewSchedule({
        day,
        time,
        subject: '',
        faculty: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSchedule({
      day: '',
      time: '',
      subject: '',
      faculty: '',
    });
  };

  const handleAddSchedule = () => {
    const { day, time, subject, faculty: faculty_ } = newSchedule;
    const key = `${day}-${time}`;
    
    const updatedTimetable = {
      ...timetable,
      [key]: {
        subject,
        faculty: faculty_,
      }
    };
    
    setTimetable(updatedTimetable);
    onTimetableChange(updatedTimetable);
    handleCloseDialog();
  };

  const handleDeleteSchedule = (day, time) => {
    const key = `${day}-${time}`;
    const updatedTimetable = { ...timetable };
    delete updatedTimetable[key];
    
    setTimetable(updatedTimetable);
    onTimetableChange(updatedTimetable);
  };

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, p: 2 }}>
          <Box sx={{ fontWeight: 'bold' }}>Time</Box>
          {DAYS.map(day => (
            <Box key={day} sx={{ fontWeight: 'bold' }}>{day}</Box>
          ))}
          
          {TIME_SLOTS.map(time => (
            <React.Fragment key={time}>
              <Box sx={{ p: 1, border: '1px solid #ddd' }}>{time}</Box>
              {DAYS.map(day => {
                const key = `${day}-${time}`;
                const schedule = timetable[key];
                return (
                  <Box
                    key={key}
                    sx={{
                      p: 1,
                      border: '1px solid #ddd',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    {schedule ? (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">{schedule.subject}</Typography>
                          <Box>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDialog(day, time, schedule);
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSchedule(day, time);
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Typography variant="caption" display="block">
                          {schedule.faculty}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        onClick={() => handleOpenDialog(day, time)}
                        sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Click to add
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </React.Fragment>
          ))}
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMode === 'add' ? 'Add Schedule' : 'Edit Schedule'}</DialogTitle>
        <DialogContent>
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
            {faculty.map((f) => (
              <MenuItem key={f.id} value={f.name}>
                {f.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddSchedule} variant="contained">
            {dialogMode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Timetable; 