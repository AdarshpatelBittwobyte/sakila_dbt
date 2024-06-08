import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './My Component/Login.js';
import Landing360 from './My Component/Landing360.js';
import Contact from './My Component/contact360.js';
import HomePage from './My Component/Homepage360.js';
import Home360 from './My Component/home360.js';
import Header from './My Component/Acadmic.js';
import Attendance from './My Component/Attendance.js';
import Profile from './My Component/profile.js';
import TeacherProfile from './My Component/Teacher Profile.js';
import TeacherAttendance from './My Component/Teacher Attendance.js';
import Timetable from './My Component/Time Table .js';
import ExamTimeTable from './My Component/Exam Time Table.js';
import Events from './My Component/Event360.js';


const App = () => {
  return (
   
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/contact360" element={<Contact />} />
          <Route path="/Landing360" element={<Landing360 />} />
          <Route path="/Homepage360" element={<HomePage />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Acadmic" element={<Header />} />
          <Route path="/profile" element={< Profile/>} />
          <Route path="/Teacher Profile" element={< TeacherProfile/>} />
          <Route path="/Teacher Attendance" element={< TeacherAttendance/>} />
          <Route path="/Time Table" element={< Timetable/>} />
          <Route path="/Exam Time Table" element={< ExamTimeTable/>} />
          <Route path="/Event360" element={< Events/>} />
          <Route path="/" element={<Home360 />} />
        </Routes>
      </Router>
   
  );
};

export default App;

