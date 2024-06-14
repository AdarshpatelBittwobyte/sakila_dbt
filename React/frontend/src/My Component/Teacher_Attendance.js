import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing';

const TeacherAttendance = ({ title }) => {
    const [selectedClass, setSelectedClass] = useState('All');
    const [searchStaffID, setSearchStaffID] = useState('');
    const [searchAttendanceDate, setSearchAttendanceDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
  
    const [studentAcademic, setStudentAcademic] = useState([]);
    const [filteredStudentAcademic, setFilteredStudentAcademic] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchStudentAcademic();
    }, []);
  
    const fetchStudentAcademic = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/staffAttendance');
        setStudentAcademic(response.data);
        setFilteredStudentAcademic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      filterData();
    }, [selectedClass, searchStaffID, searchAttendanceDate, selectedStatus, studentAcademic]); // Added dependencies here
  
    const filterData = () => {
      let filteredData = studentAcademic;
  
      if (selectedClass !== 'All') {
        filteredData = filteredData.filter(student => student.Class && student.Class.toString() === selectedClass);
      }
  
      if (searchStaffID) {
        filteredData = filteredData.filter(student =>
          student.Staff_ID && student.Staff_ID.toString().toLowerCase().includes(searchStaffID.toLowerCase())
        );
      }
  
      if (searchAttendanceDate) {
        filteredData = filteredData.filter(student =>
          student.Attendance_Date && student.Attendance_Date.toString().toLowerCase().includes(searchAttendanceDate.toLowerCase())
        );
      }
  
      if (selectedStatus !== 'All') {
        filteredData = filteredData.filter(student =>
          student.Status && student.Status.toString().toLowerCase() === selectedStatus.toLowerCase()
        );
      }
  
      setFilteredStudentAcademic(filteredData);
    };
  
    const handleReset = () => {
      setSelectedClass('All');
      setSearchStaffID('');
      setSearchAttendanceDate('');
      setSelectedStatus('All');
      setFilteredStudentAcademic(studentAcademic);
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="header-container" style={{ fontFamily: 'Arial, sans-serif' }}>
        <Landing />
        <div className="container-fluid header-container" style={{ width: '100%', marginTop: '12vh', padding: 0 }}>
          <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div className="p-2 mb-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#34495E', fontFamily: 'Arial, sans-serif', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <h1 style={{ fontSize: '1.5rem', backgroundColor: '#34495E', color: '#FFFFFF', borderRadius: '10px', padding: '10px 10px' }}>Teacher Attendance</h1>
            </div>

            <div className="filter-container d-flex justify-content-start mb-3 flex-wrap">
              <div className="filter-group d-flex align-items-center p-2 pl-md-4">
                <label htmlFor="staffID" className="mr-2" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Staff ID</label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control search-box search-input black-border"
                  value={searchStaffID}
                  onChange={(e) => setSearchStaffID(e.target.value)}
                />
              </div>
  
              <div className="filter-group d-flex align-items-center ml-md-3 p-2">
                <label htmlFor="attendanceDate" className="mr-2" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Attendance Date</label>
                <input
                  type="date"
                  className="form-control search-box search-input"
                  value={searchAttendanceDate}
                  onChange={(e) => setSearchAttendanceDate(e.target.value)}
                />
              </div>
  
              <div className="filter-group d-flex align-items-center ml-md-3 p-2">
                <label htmlFor="status" className="mr-2" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Status</label>
                <select
                  id="status"
                  className="form-control filter-dropdown"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="P">P</option>
                  <option value="A">A</option>
                  <option value="L">L</option>
                  <option value="P/2">P/2</option>
                </select>
              </div>
  
              <div className="ml-md-3 mt-3 mt-md-0 p-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                  style={{ background: '#0d2b84', border: 'none', fontFamily: 'Arial, sans-serif' }}
                >
                  Reset
                </button>
              </div>
            </div>
            <hr style={{ width: '100%', height: '0px', backgroundColor: 'grey', margin: '10px 0' }} />
            <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <table className="table table-striped">
                <thead className="thead-dark" style={{ position: 'sticky', top: 0 }}>
                  <tr>
                    <th scope="col" style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>Attendance_ID</th>
                    <th scope="col" style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>Staff_ID</th>
                    <th scope="col" style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>Attendance_Date</th>
                    <th scope="col" style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>Status</th>
                    <th scope="col" style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>Rec_Create_Date</th>
                    <th scope="col" style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>Created_By</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudentAcademic.map((record, idx) => (
                    <tr key={idx}>
                      <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>{record.Attendance_ID}</td>
                      <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>{record.Staff_ID}</td>
                      <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>{record.Attendance_Date}</td>
                      <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>{record.Status}</td>
                      <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>{record.REC_CREATE_DATE}</td>
                      <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Arial, sans-serif' }}>{record.CREATED_BY}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default TeacherAttendance;
