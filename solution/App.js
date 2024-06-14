import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Landing from './My Component/Landing';
import Navbar from './Navbar';
import Home from './Home';
import Acadmic from './My Component/Acadmic';
import StudentAttendance from './My Component/Student_Attendance';
import Profile from './My Component/profile';
import TeacherProfile from './My Component/Teacher_Profile';
import TeacherAttendance from './My Component/Teacher_Attendance';
import TimeTable from './My Component/Time_Table';
import ExamSheduling from './My Component/Exam_Sheduling';
 
import Signup from './Signup';
import Event from './My Component/Event';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* Private Routes */}
        <Route
          path="/Landing"
          element={
            isAuthenticated ? <Landing /> : <Navigate to="/Login" replace />
          }
        />
        <Route
          path="/Navbar"
          element={
            isAuthenticated ? <Navbar /> : <Navigate to="/Login" replace />
          }
        />
        <Route
          path="/Student_Attendance"
          element={
            isAuthenticated ? <StudentAttendance /> : <Navigate to="/Login" replace />
          }
        /> 
        <Route
          path="/Acadmic"
          element={isAuthenticated ? <Acadmic /> : <Navigate to="/Login" replace />}
        />
        {/* <Route path="/Student Attendance" element={<StudentAttendance />} /> */}
        <Route
          path="/Profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/Login" replace />}
        />
        <Route
          path="/Teacher_Profile"
          element={
            isAuthenticated ? <TeacherProfile /> : <Navigate to="/Login" replace />
          }
        />
        <Route
          path="/Teacher_Attendance"
          element={
            isAuthenticated ? <TeacherAttendance /> : <Navigate to="/Login" replace />
          }
        />
        <Route
          path="/Time_Table"
          element={
            isAuthenticated ? <TimeTable /> : <Navigate to="/Login" replace />
          }
        />
        <Route
          path="/Exam_Sheduling"
          element={
            isAuthenticated ? <ExamSheduling /> : <Navigate to="/Login" replace />
          }
        />
        <Route
          path="/Event"
          element={
            isAuthenticated ? <Event /> : <Navigate to="/Login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
