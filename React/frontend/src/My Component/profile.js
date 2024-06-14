import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing';
 
const Profile = () => {
  const [classList, setClassList] = useState(['All']);
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
 
  const [studentAcademic, setStudentAcademic] = useState([]);
  const [filteredStudentAcademic, setFilteredStudentAcademic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchStudentAcademic();
  }, []);
 
  const fetchStudentAcademic = async () => {
    try {
      const response = await fetch('http://localhost:2001/api/studentprofile');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setStudentAcademic(data);
      setFilteredStudentAcademic(data); // Initialize filtered data with full data set
 
      // Fetch unique class values
      const uniqueClasses = Array.from(new Set(data.map(student => student.Class)));
      setClassList(['All', ...uniqueClasses]); // Add 'All' option and set class list state
 
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
      filteredData = filteredData.filter(student => student.Class.toString() === selectedClass);
    }
 
    if (selectedAcademicYear !== 'All') {
      filteredData = filteredData.filter(student => student.ACADEMIC_SESSION === selectedAcademicYear);
    }
 
    if (searchStudentId) {
      filteredData = filteredData.filter(student =>
        student.Student_Id.toString().toLowerCase().includes(searchStudentId.toLowerCase())
      );
    }
 
    if (searchFirstName) {
      filteredData = filteredData.filter(student =>
        student.First_Name.toLowerCase().includes(searchFirstName.toLowerCase())
      );
    }
 
    if (searchTerm) {
      filteredData = filteredData.filter(student =>
        student.Student_Id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.First_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Last_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Major.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
 
    setFilteredStudentAcademic(filteredData);
  }, [selectedClass, selectedAcademicYear, searchStudentId, searchFirstName, searchTerm, studentAcademic]);
 
  useEffect(() => {
    filterData();
  }, [filterData]);
 
  const handleReset = () => {
    setSelectedClass('All');
    setSelectedAcademicYear('All');
    setSearchStudentId('');
    setSearchFirstName('');
    setSearchTerm('');
    setFilteredStudentAcademic(studentAcademic);
  };
 
  const formatEnrollmentDate = (dateString) => {
    console.log("dateString:", dateString); // Log the dateString parameter
    if (dateString) {
      return dateString.slice(0, 10); // Extracts the date part (YYYY-MM-DD)
    } else {
      return ''; // Return an empty string or handle the case appropriately
    }
  };
 
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body, h1, h2, h3, h4, h5, h6, p, a, input, button, th, td, label, select {
        font-family: 'Arial', sans-serif;
      }
 
      .header-input {
        background-color: #009CE0;
        color: white;
        border: 2px solid #ccc;
        padding: 5px;
        border-radius: 3px;
        box-shadow: inset 0 1px 2px rgba(234, 218, 218, 0.1);
        text-align: center;
        margin-right: 15px;
      }
 
      .header-input::placeholder {
        color: white;
      }
 
      .filter-dropdown, .search-box {
        width: 140px; /* Adjust the width as needed */
        margin-right: 15px; /* Adjust the margin as needed */
      }
 
      .filter-container label {
        margin-right: 5px;
      }
 
      .table-container {
        display: flex;
        justify-content: center;
      }
 
      .table {
        margin: 0 auto;
        width: 90%; /* Adjust the width as needed */
      }
 
      .table th {
        border: 3px solid #dee2e6;  /* Add border to table header cells */
        padding: 10px;
        text-align: center; /* Center align the text in table header cells */
        white-space: nowrap; /* Ensure content in columns doesn't wrap */
        overflow: hidden; /* Hide content if it overflows */
        text-overflow: ellipsis; /* Show ellipsis (...) if content overflows */
      }
 
      .table td {
        border: 3px solid #dee2e6;  /* Add border to table data cells */
        padding: 4px;
        text-align: center; /* Center align the text in table data cells */
        white-space: nowrap; /* Ensure content in columns doesn't wrap */
        overflow: hidden; /* Hide content if it overflows */
        text-overflow: ellipsis; /* Show ellipsis (...) if content overflows */
      }
     
      .sticky-header th {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: #ffffff; /* Set background color for sticky header */
      }
 
      .table-container {
        max-height: 80vh; /* Set max height for the table */
        overflow-y: auto; /* Enable vertical scrolling */
      }

      .header {
        background: #34495E;
        color: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header h1 {
        font-size: 1.5rem;
        margin: 0;
      }
   
    `;
    document.head.appendChild(style);
 
    return () => {
      document.head.removeChild(style);
    };
  }, []);
 
  if (isLoading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div className="header-container">
      <Landing /> 
      <div className="container-fluid" style={{ marginTop: '12vh', width: '100%', padding: 0 }}>
        <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
        <div className="header">
            <h1>Student Profile</h1>
          </div>
          <div className="filter-container d-flex justify-content-start mb-3 flex-wrap">
            <div className="filter-group d-flex align-items-center">
              <label htmlFor="studentId" className="mr-2" style={{ fontWeight: 'bold' }}>Student ID</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input black-border"
                value={searchStudentId}
                onChange={(e) => setSearchStudentId(e.target.value)}
              />
            </div>
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="firstName" className="mr-2" style={{ fontWeight: 'bold' }}>First Name</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
              />
            </div>
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="class" className="mr-2" style={{ fontWeight: 'bold' }}>Class</label>
              <select
                id="class"
                className="form-control filter-dropdown"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classList.map((classNumber, index) => (
                  <option key={index} value={classNumber}>{classNumber}</option>
                ))}
              </select>
            </div>
            {/* <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="academicYear" className="mr-2" style={{ fontWeight: 'bold' }}>Academic Year</label>
              <select
                id="academicYear"
                className="form-control filter-dropdown"
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
              >
                {Array.from(new Set(studentAcademic.map(student => student.ACADEMIC_SESSION))).map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div> */}
            <div className="ml-3">
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
          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="sticky-header thead-dark"> {/* Adding sticky-header class */}
               <tr>
                <th scope="col">Student ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Middle Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Postal Code</th>
                <th scope="col">Date Of Birth</th>
                <th scope="col">Father Name</th>
                <th scope="col">Email</th>
                <th scope="col">Enrollment Date</th>
                <th scope="col">Nationality</th>
                <th scope="col">Emergency Contact Name</th>
                <th scope="col">Emergency Contact Number</th>
                <th scope="col">Aaadhar Number</th>
                <th scope="col">Class</th>
              </tr>
                </thead>
                <tbody>
                {filteredStudentAcademic.map(student => ( // Changed 'event' to 'student'
                <tr key={student.EVENT_ID}>
                <td className="sticky-column">{student.Student_Id}</td> {/* Updated 'student' here */}
                  <td>{student.First_Name}</td>
                  <td>{student.Middle_Name}</td>
                  <td>{student.Last_Name}</td>
                  <td>{student.Gender}</td>
                  <td>{student.Contact_Number}</td>
                  <td>{student.Address}</td>
                  <td>{student.City}</td>
                  <td>{student.Postal_Code}</td>
                  <td>{student.Date_Of_Birth}</td>
                  <td>{student.Father_Name}</td>
                  <td>{student.Email}</td>
                  <td>{student.Enrollment_Date}</td>
                  <td>{student.Nationality}</td>
                  <td>{student.Emergency_Contact_Name}</td>
                  <td>{student.Emergency_Contact_Number}</td>
                  <td>{student.Aaadhar_Number}</td>
                  <td>{student.Class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
 
export default Profile;