import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [facultyList, setFacultyList] = useState([]);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Load data from localStorage on initial load
  useEffect(() => {
    const savedFaculty = localStorage.getItem('faculty');
    const savedStudents = localStorage.getItem('students');
    const savedMessages = localStorage.getItem('messages');
    const savedLectures = localStorage.getItem('lectures');
    const savedAttendance = localStorage.getItem('attendance');

    if (savedFaculty) setFacultyList(JSON.parse(savedFaculty));
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedLectures) setLectures(JSON.parse(savedLectures));
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('faculty', JSON.stringify(facultyList));
  }, [facultyList]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('lectures', JSON.stringify(lectures));
  }, [lectures]);

  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }, [attendance]);

  const addFaculty = (newFaculty) => {
    setFacultyList([...facultyList, { ...newFaculty, id: Date.now() }]);
  };

  const addStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: Date.now() }]);
  };

  const addMessage = (newMessage) => {
    setMessages([...messages, { ...newMessage, id: Date.now(), timestamp: new Date().toISOString() }]);
  };

  const addLecture = (newLecture) => {
    setLectures([...lectures, { ...newLecture, id: Date.now(), timestamp: new Date().toISOString() }]);
  };

  const addAttendance = (newAttendance) => {
    setAttendance([...attendance, { ...newAttendance, id: Date.now(), timestamp: new Date().toISOString() }]);
  };

  const setFaculty = (faculty) => {
    setCurrentFaculty(faculty);
  };

  return (
    <AppContext.Provider
      value={{
        faculty: currentFaculty,
        facultyList,
        students,
        messages,
        lectures,
        attendance,
        addFaculty,
        addStudent,
        addMessage,
        addLecture,
        addAttendance,
        setFaculty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}; 