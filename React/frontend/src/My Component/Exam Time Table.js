import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing360 from './Landing360';

const ExamTimeTable = ({ title }) => {
  const [classList, setClassList] = useState(['All']);
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchExamID, setSearchExamID] = useState('');
  const [searchExamType, setSearchExamType] = useState('');
  const [searchSubject, setSearchSubject] = useState('');

  const [studentAcademic, setStudentAcademic] = useState([]);
  const [filteredStudentAcademic, setFilteredStudentAcademic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examTypes, setExamTypes] = useState([]);

  useEffect(() => {
    fetchStudentAcademic();
  }, []);

  const fetchStudentAcademic = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/examtimetable');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setStudentAcademic(data);
      setFilteredStudentAcademic(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching exam timetable:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const filterData = useCallback(() => {
    let filteredData = studentAcademic;

    if (selectedClass !== 'All') {
      filteredData = filteredData.filter(student => student.Class.toString() === selectedClass);
    }

    if (searchExamID) {
      filteredData = filteredData.filter(student => 
        student.Exam_ID.toString().toLowerCase().includes(searchExamID.toLowerCase())
      );
    }

    if (searchExamType) {
      filteredData = filteredData.filter(student => 
        student.Exam_Type.toLowerCase().includes(searchExamType.toLowerCase())
      );
    }

    if (searchSubject) {
      filteredData = filteredData.filter(student => 
        student.Subject.toLowerCase().includes(searchSubject.toLowerCase())
      );
    }

    setFilteredStudentAcademic(filteredData);
  }, [selectedClass, searchExamID, searchExamType, searchSubject, studentAcademic]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  useEffect(() => {
    const uniqueClassList = ['All', ...new Set(studentAcademic.map(student => student.Class))];
    setClassList(uniqueClassList);
  }, [studentAcademic]);

  useEffect(() => {
    const uniqueExamTypes = [...new Set(studentAcademic.map(student => student.Exam_Type))];
    setExamTypes(uniqueExamTypes);
  }, [studentAcademic]);

  const handleReset = () => {
    setSelectedClass('All');
    setSearchExamID('');
    setSearchExamType('');
    setSearchSubject('');
    setFilteredStudentAcademic(studentAcademic);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', time: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
        height: calc(100vh - 250px); /* Adjust height to make table body scrollable */
        overflow-y: auto; /* Enable vertical scrolling */
      }

      .search-input {
        background-color: grey; /* Set the background color */
      }

      .search-input {
        background-color: transparent; /* Remove the background color */
      }

      .table thead th {
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 10;
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
      <Landing360 />
      <div className="container-fluid" style={{ marginTop: '13vh', width: '100%', padding: 0 }}>
        <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className="p-2 mb-2 d-flex justify-content-between align-items-center" style={{ background: '#34495E', color: '#FFFFFF' }}>
            <h1 style={{ fontSize: '1.5rem' }}>Exam Scheduling</h1>
          </div>
          <div className="filter-container d-flex justify-content-start mb-3 flex-wrap">
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="firstName" className="mr-2" style={{ fontWeight: 'bold' }}>Exam ID</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input"
                value={searchExamID}
                onChange={(e) => setSearchExamID(e.target.value)}
              />
            </div>
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="firstName" className="mr-2" style={{ fontWeight: 'bold' }}>Subject</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input"
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
              />
            </div>
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="class" className="mr-2" style={{ fontWeight: 'bold' }}>Exam Type</label>
              <select
                id="class"
                className="form-control filter-dropdown"
                value={searchExamType}
                onChange={(e) => setSearchExamType(e.target.value)}
              >
                <option value="">All</option>
                {examTypes.map((examType, index) => (
                  <option key={index} value={examType}>{examType}</option>
                ))}
              </select>
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
          <div className="table-container table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark sticky-header">
                <tr>
                  <th scope="col">Exam ID</th>
                  <th scope="col">Exam Type</th>
                  <th scope="col">Class</th>
                  <th scope="col">Exam Date</th>
                  <th scope="col">Exam Time</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Rec Create Date</th>
                  <th scope="col">Created By</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudentAcademic.map(student => (
                  <tr key={student.Exam_ID}>
                    <td>{student.Exam_ID}</td>
                    <td>{student.Exam_Type}</td>
                    <td>{student.Class}</td>
                    <td>{formatDate(student.Exam_Date)}</td>
                    <td>{student.Exam_Time}</td>
                    <td>{student.Subject}</td>
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

export default ExamTimeTable;
