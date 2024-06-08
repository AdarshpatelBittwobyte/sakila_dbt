import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing360 from './Landing360'; // Import your custom Navbar component

const Profile = ({ title }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchClass, setSearchClass] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/studentprofile');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setStudents(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchStudentId = (e) => {
    setSearchStudentId(e.target.value);
  };

  const handleSearchFirstName = (e) => {
    setSearchFirstName(e.target.value);
  };

  const handleSearchClass = (e) => {
    setSearchClass(e.target.value);
  };

  const handleReset = () => {
    setSearchStudentId('');
    setSearchFirstName('');
    setSearchClass('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Landing360 /> {/* Render your custom Navbar component */}
      <div className="container-fluid" style={{ marginTop: '13vh', width: '100%', padding: 0 }}>
        <style jsx>{`
          body, h1, h2, h3, h4, h5, h6, p, a, input, button, th, td {
            font-family: 'Arial', sans-serif;
          }
        .header-container {
    background: #34495E;
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
}

          .header-container h1 {
            font-size: 20px;
          }
          .search-box {
            width: 200px;
            margin-right: 15px;
            border-radius: 5px;
            padding: 8px;
          }
          .filter-container label {
            margin-right: 10px;
            font-weight: bold;
          }
          .filter-container .filter-group {
            display: flex;
            align-items: center;
            margin-right: 15px;
          }
          .ml-md-auto {
            margin-left: auto;
          }
          .table-responsive {
            overflow-x: auto;
          }
          .table {
            margin-bottom: 0;
            width: 100%;
          }
          .table thead {
            background-color: black; /* Change the background color here */
            color: #fff;
            position: sticky;
            top: 0;
          }
          .table td, .table th {
            border: 4px solid #dee2e6;  
            padding: 6px;
            text-align: left;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
          }
        `}</style>
        <div className="header-container p-3 mb-2 d-flex justify-content-between align-items-center">
          <h1>Student Profile</h1>
        </div>
        <div className="filter-container d-flex flex-wrap justify-content-start mb-3">
          <div className="filter-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              className="form-control search-box"
              placeholder=""
              value={searchStudentId}
              onChange={handleSearchStudentId}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-control search-box"
              placeholder=""
              value={searchFirstName}
              onChange={handleSearchFirstName}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              className="form-control search-box"
              placeholder=""
              value={searchClass}
              onChange={handleSearchClass}
            />
          </div>
          <div className="ml-md-auto mt-3 mt-md-0">
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
        <hr style={{ width: '100%', height: '1px', margin: '10px 0' }} />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead style={{ backgroundColor: 'black' }}>
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
              {students.map(student => (
                <tr key={student.Student_Id}>
                  <td>{student.Student_Id}</td>
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
    </>
  );
};

export default Profile;
