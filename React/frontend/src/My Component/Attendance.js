import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing360 from './Landing360';

const Attendance = ({ title }) => {
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchStudentID, setSearchStudentID] = useState('');
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
      const response = await axios.get('http://localhost:8081/api/studentAttendance');
      setStudentAcademic(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const filterData = useCallback(() => {
    let filteredData = studentAcademic;

    if (selectedClass !== 'All') {
      filteredData = filteredData.filter(student => student.Class && student.Class.toString() === selectedClass);
    }

    if (searchStudentID) {
      filteredData = filteredData.filter(student =>
        student.Student_ID && student.Student_ID.toString().toLowerCase().includes(searchStudentID.toLowerCase())
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
  }, [selectedClass, searchStudentID, searchAttendanceDate, selectedStatus, studentAcademic]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const handleReset = () => {
    setSelectedClass('All');
    setSearchStudentID('');
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
    <div className="header-container">
      <Landing360 />
      <div className="container-fluid" style={{ marginTop: '13vh', width: '100%', padding: 0 }}>
        <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className=" p-2 mb-2 d-flex justify-content-between align-items-center" style={{ background: '#34495E', color: '#FFFFFF' }}>
            <h1 style={{ fontSize: '1.5rem' }}>Student Attendance</h1>
          </div>
          <div className="filter-container d-flex justify-content-start mb-3 flex-wrap" style={{ position: 'sticky', top: '64px', background: 'white', zIndex: 1 }}>
            <div className="filter-group d-flex align-items-center p-2 pl-md-4">
              <label htmlFor="studentID" className="mr-2" style={{ fontWeight: 'bold', padding: '10px' }}>Student</label>
              <label htmlFor="studentID" className="mr-2" style={{ fontWeight: 'bold', padding: '10px', display: 'inline' }}>ID</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input black-border"
                value={searchStudentID}
                onChange={(e) => setSearchStudentID(e.target.value)}
              />
            </div>

            <div className="filter-group d-flex align-items-center ml-md-3 p-2">
              <label htmlFor="attendanceDate" className="mr-2" style={{ fontWeight: 'bold', padding: '10px' }}>Attendance</label>
              <label htmlFor="attendanceDate" className="mr-2" style={{ fontWeight: 'bold', padding: '10px', display: 'inline' }}>Date</label>
              <input
                type="date"
                className="form-control search-box search-input"
                value={searchAttendanceDate}
                onChange={(e) => setSearchAttendanceDate(e.target.value)}
              />
            </div>

            <div className="filter-group d-flex align-items-center ml-md-3 p-3">
              <label htmlFor="status" className="mr-2" style={{ fontWeight: 'bold', padding: '10px' }}>Status</label>
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

            <div className="ml-md-3 mt-3 mt-md-0 p-5">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReset}
                style={{ background: '#0d2b84', border: 'none' }}
              >
                Reset
              </button>
            </div>
          </div>
          <hr style={{ width: '100%', height: '1px', backgroundColor: 'grey', margin: '10px 0' }} />
          <div className="table-container" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 230px)' }}>
            <table className="table table-striped">
              <thead className="thead-dark" style={{ position: 'sticky', top: '0', zIndex: '2' }}>
                <tr>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '0', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>Attendance ID</th>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '150px', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>Student ID</th>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '300px', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>First Name</th>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '450px', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>Middle Name</th>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '600px', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>Last Name</th>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '750px', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>Class</th>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '900px', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>Status</th>
                  <th scope="col" style={{ width: '150px', position: 'sticky', left: '1050px', backgroundColor: '#f3f4f6', zIndex: '1', textAlign: 'center', paddingLeft: '15px' }}>Attendance Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudentAcademic.map((record, idx) => (
                  <tr key={idx}>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '0', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.Attendance_ID}</td>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '150px', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.Student_ID}</td>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '300px', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.First_Name}</td>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '450px', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.Middle_Name}</td>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '600px', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.Last_Name}</td>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '750px', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.Class}</td>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '900px', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.Status}</td>
                    <td style={{ border: '4px solid #dee2e6', padding: '5px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px', position: 'sticky', left: '1050px', zIndex: '1', backgroundColor: '#f3f4f6' }}>{record.Attendance_Date}</td>
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

export default Attendance;

