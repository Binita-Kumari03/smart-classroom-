import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App; 