import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Timetable from './Timetable';

const HONORS = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
const SEMESTERS = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];

function TimetableManager({ faculty }) {
  const [selectedHonor, setSelectedHonor] = useState(HONORS[0]);
  const [selectedSemester, setSelectedSemester] = useState(SEMESTERS[0]);
  const [timetables, setTimetables] = useState({});

  const handleHonorChange = (event) => {
    setSelectedHonor(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleTimetableChange = (newTimetable) => {
    const key = `${selectedHonor}-${selectedSemester}`;
    setTimetables(prev => ({
      ...prev,
      [key]: newTimetable
    }));
  };

  const getCurrentTimetable = () => {
    const key = `${selectedHonor}-${selectedSemester}`;
    return timetables[key] || {};
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Honor</InputLabel>
            <Select
              value={selectedHonor}
              label="Select Honor"
              onChange={handleHonorChange}
            >
              {HONORS.map((honor) => (
                <MenuItem key={honor} value={honor}>
                  {honor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Semester</InputLabel>
            <Select
              value={selectedSemester}
              label="Select Semester"
              onChange={handleSemesterChange}
            >
              {SEMESTERS.map((sem) => (
                <MenuItem key={sem} value={sem}>
                  {sem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="h6" gutterBottom>
          {selectedHonor} - {selectedSemester} Timetable
        </Typography>

        <Timetable
          faculty={faculty}
          timetable={getCurrentTimetable()}
          onTimetableChange={handleTimetableChange}
        />
      </Paper>
    </Box>
  );
}

export default TimetableManager; 