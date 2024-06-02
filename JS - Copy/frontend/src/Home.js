
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// function Home() {
//   const [user, setUser] = useState({});
//   const location = useLocation();
//   const userEmail = new URLSearchParams(location.search).get('email');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8081/userByEmail/${userEmail}`);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error('Error fetching user data:', error.message);
//       }
//     };

//     if (userEmail) {
//       fetchUserData();
//     }
//   }, [userEmail]);

//   const handleUpdateName = async () => {
//     const newName = prompt('Enter new name:');
//     if (newName) {
//       try {
//         await axios.put(`http://localhost:8081/userByEmail/${userEmail}`, { name: newName });
//         setUser({ ...user, name: newName });
//       } catch (error) {
//         console.error('Error updating name:', error.message);
//       }
//     }
//   };

//   const handleDeleteUser = async () => {
//     const confirmDelete = window.confirm('Are you sure you want to delete your account?');
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:8081/userByEmail/${userEmail}`);
//         // Redirect to login page or perform any other action after deletion
//       } catch (error) {
//         console.error('Error deleting user:', error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <p>Email: {user.email}</p>
//       <p>Name: {user.name}</p>
//       <button onClick={handleUpdateName}>Update Name</button>
//       <button onClick={handleDeleteUser}>Delete Account</button>
//     </div>
//   );
// }

// export default Home;








import React, { useState, useEffect } from 'react';

function Home() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/students');
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            Student ID: {student.id} First Name: {student.name} Middle Name: {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;


// import React, { useState, useEffect } from 'react';

// function Home() {
//   const [studentAttendance, setStudentAttendance] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchStudentAttendance();
//   }, []);

//   const fetchStudentAttendance = async () => {
//     try {
//       const response = await fetch('http://localhost:8002/api/studentAttendance');
//       if (!response.ok) {
//         throw new Error('Failed to fetch student attendance');
//       }
//       const data = await response.json();
//       setStudentAttendance(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching student attendance:', error);
//       setError(error.message);
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Student Attendance</h1>
//       <ul>
//         {studentAttendance.map(record => (
//           <li key={record.Attendance_Id}>
//             Student ID: {record.Student_Id}<br />
//             First Name: {record.First_Name}<br />
//             Middle Name: {record.Middle_Name}<br />
//             Date: {record.Date}<br />
//             Status: {record.Status}<br />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;



