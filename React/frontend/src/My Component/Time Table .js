import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing360 from './Landing360';

const Timetable = ({ title }) => {
  const [classList, setClassList] = useState(['All']);
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');

  const [studentAcademic, setStudentAcademic] = useState([]);
  const [filteredStudentAcademic, setFilteredStudentAcademic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentAcademic();
  }, []);

  const fetchStudentAcademic = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/studentTimetable');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setStudentAcademic(data);
      setFilteredStudentAcademic(data);
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

    if (searchStudentId) {
      filteredData = filteredData.filter(student =>
        student.TimeTableID && student.TimeTableID.toString().toLowerCase().includes(searchStudentId.toLowerCase())
      );
    }

    if (searchFirstName) {
      filteredData = filteredData.filter(student =>
        student.Section && student.Section.toLowerCase().includes(searchFirstName.toLowerCase())
      );
    }

    setFilteredStudentAcademic(filteredData);
  }, [selectedClass, searchStudentId, searchFirstName, studentAcademic]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  useEffect(() => {
    const uniqueClassList = ['All', ...new Set(studentAcademic.map(student => student.Class))];
    setClassList(uniqueClassList);
  }, [studentAcademic]);

  const handleReset = () => {
    setSelectedClass('All');
    setSearchStudentId('');
    setSearchFirstName('');
    setFilteredStudentAcademic(studentAcademic);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', time: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

      .table td, .table th {
        border: 3px solid #dee2e6;  /* Add border to all table cells */
        padding: 5px;
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

      .search-input {
        background-color: grey; /* Set the background color */
      }

      .search-input {
        background-color: transparent; /* Remove the background color */
      }

      .table-container {
        max-height: 80vh; /* Set max height for the table */
        overflow-y: auto; /* Enable vertical scrolling */
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
      <Landing360 /> {/* Render your custom Navbar component */}
      <div className="container-fluid" style={{ marginTop: '13vh', width: '100%', padding: 0 }}>
        <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className="p-2 mb-2 d-flex justify-content-between align-items-center" style={{ background: '#34495E', color: '#FFFFFF' }}>
            <h1 style={{ fontSize: '1.5rem' }}>Time Table Management</h1>
          </div>
          <div className="filter-container d-flex justify-content-start mb-3 flex-wrap">
            <div className="filter-group d-flex align-items-center">
              <label htmlFor="studentId" className="mr-2" style={{ fontWeight: 'bold' }}>TimeTableID</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input black-border"
                value={searchStudentId}
                onChange={(e) => setSearchStudentId(e.target.value)}
              />
            </div>
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="firstName" className="mr-2" style={{ fontWeight: 'bold' }}>Section</label>
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
          <div className="table-responsive table-container">
            <table className="table table-striped">
              <thead className="thead-dark sticky-header">
                <tr>
                  <th scope="col">TimeTableID</th>
                  <th scope="col">Class</th>
                  <th scope="col">Section</th>
                  <th scope="col">DayOfWeek</th>
                  <th scope="col">Period1</th>
                  <th scope="col">Period2</th>
                  <th scope="col">Period3</th>
                  <th scope="col">Period4</th>
                  <th scope="col">Period5</th>
                  <th scope="col">Period6</th>
                  <th scope="col">Period7</th>
                  <th scope="col">Period8</th>
                  <th scope="col">Stream</th>
                  <th scope="col">Rec CreateDate</th>
                  <th scope="col">Create By</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudentAcademic.map(student => (
                  <tr key={student.TimeTableID}>
                    <td>{student.TimeTableID}</td>
                    <td>{student.Class}</td>
                    <td>{student.Section}</td>
                    <td>{student.DayOfWeek}</td>
                    <td>{student.Period1}</td>
                    <td>{student.Period2}</td>
                    <td>{student.Period3}</td>
                    <td>{student.Period4}</td>
                    <td>{student.Period5}</td>
                    <td>{student.Period6}</td>
                    <td>{student.Period7}</td>
                    <td>{student.Period8}</td>
                    <td>{student.Stream}</td>
                    <td>{formatDate(student.REC_CREATE_DATE)}</td>
                    <td>{student.CREATED_BY}</td>
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

export default Timetable;
