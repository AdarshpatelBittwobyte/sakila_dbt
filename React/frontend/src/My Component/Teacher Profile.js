import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing360 from './Landing360';

const TeacherProfile = ({ title }) => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchStaffId, setSearchStaffId] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchGender, setSearchGender] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/staff');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setStaff(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchStaffId = (e) => {
    setSearchStaffId(e.target.value);
  };

  const handleSearchFirstName = (e) => {
    setSearchFirstName(e.target.value);
  };

  const handleSearchGender = (e) => {
    setSearchGender(e.target.value);
  };

  const handleReset = () => {
    setSearchStaffId('');
    setSearchFirstName('');
    setSearchGender('');
  };

  const filteredStaff = staff.filter((staff) => {
    return (
      staff.Staff_ID.toString().toLowerCase().includes(searchStaffId.toLowerCase()) &&
      staff.First_Name.toLowerCase().includes(searchFirstName.toLowerCase()) &&
      (searchGender === '' || staff.Gender.toLowerCase() === searchGender.toLowerCase())
    );
  });

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
        width: 100px;
        margin-right: 15px;
        border-radius: 5px;
        padding: 8px;
      }
      .filter-container label {
        margin-right: 10px;
        font-weight: bold;
        font-family: 'Arial', sans-serif;
      }
      .filter-container .filter-group {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      .reset-button {
        flex: 0 0 auto;
      }
      .reset-button button {
        width: 50%;
      }
      .table-container {
        overflow: auto;
        max-height: 500px; /* Adjust height as needed */
        margin: 0 auto; /* Center align the table */
      }
      .table-responsive {
        overflow-x: auto;
      }
      .table {
        margin-bottom: 0;
        font-family: 'Arial', sans-serif;
      }
      .table thead {
        background-color: #343a40;
        color: #fff;
        position: sticky;
        top: 0;
      }
      .table td,
      .table th {
        border: 4px solid #dee2e6;
        padding: 10px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 'Arial', sans-serif; /* Apply font family */
      }
      @media (max-width: 768px) {
        .filter-container {
          flex-direction: column;
          align-items: stretch;
        }
        .filter-group {
          margin-bottom: 10px;
        }
        .reset-button {
          margin-top: 10px;
          width: 10vh; /* Adjusted maximum width */
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
          margin-top: 0;
          border-radius: 0;
        }
        .filter-group {
          flex-basis: 100%;
        }
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
    <div className="container-fluid">
      <Landing360 />
      <div className="container-fluid header-container" style={{ width: '100%', marginTop: '13vh', padding: 0 }}>
        <div className="header-container p-3 mb-2 d-flex justify-content-between align-items-center">
          <h1>Staff Profile</h1>
        </div>
      </div>
      <div className="filter-container d-flex justify-content-start mb-3">
        <div className="filter-group">
          <label htmlFor="staffId">Staff ID</label>
          <input
            type="text"
            id="staffId"
            className="form-control search-box"
            placeholder=""
            value={searchStaffId}
            onChange={handleSearchStaffId}
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
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            className="form-control search-box"
            value={searchGender}
            onChange={handleSearchGender}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="filter-group" style={{ marginLeft: '10px' }}>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleReset}
            style={{ background: '#0d2b84', border: 'none' }}
          >
            Reset
          </button>
        </div>
      </div>

      <hr style={{ width: '100%', height: '1px', backgroundColor: 'grey', margin: '10px 0' }} />
      <div className="table-container">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Staff ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Staff Type</th>
              <th scope="col">Designation</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Email</th>
              <th scope="col">Date Of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Postal Code</th>
              <th scope="col">Hire Date</th>
              <th scope="col">Department</th>
              <th scope="col">Qualification</th>
              <th scope="col">Experience Years</th>
              <th scope="col">Specialization</th>
              <th scope="col">Emergency Contact Number</th>
              <th scope="col">Exit Date</th>
              <th scope="col">Aadhar Number</th>
              <th scope="col">Pan Number</th>
              <th scope="col">REC CREATE DATE</th>
              <th scope="col">CREATED BY</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.Staff_ID}>
                <td>{staff.Staff_ID}</td>
                <td>{staff.First_Name}</td>
                <td>{staff.Middle_Name}</td>
                <td>{staff.Last_Name}</td>
                <td>{staff.Staff_Type}</td>
                <td>{staff.Designation}</td>
                <td>{staff.Contact_Number}</td>
                <td>{staff.Email}</td>
                <td>{staff.Date_Of_Birth}</td>
                <td>{staff.Gender}</td>
                <td>{staff.Address}</td>
                <td>{staff.City}</td>
                <td>{staff.State}</td>
                <td>{staff.Postal_Code}</td>
                <td>{staff.Hire_Date}</td>
                <td>{staff.Department}</td>
                <td>{staff.Qualification}</td>
                <td>{staff.Experience_Years}</td>
                <td>{staff.Specialization}</td>
                <td>{staff.Emergency_Contact_Number}</td>
                <td>{staff.Exit_Date}</td>
                <td>{staff.Aadhar_Number}</td>
                <td>{staff.Pan_Number}</td>
                <td>{staff.REC_CREATE_DATE}</td>
                <td>{staff.CREATED_BY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherProfile;
