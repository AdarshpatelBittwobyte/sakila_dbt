// import React, { useState, useEffect } from 'react';

// function Home() {
//   const [students, setStudents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch('http://localhost:8002/api/students');
//       if (!response.ok) {
//         throw new Error('Failed to fetch');
//       }
//       const data = await response.json();
//       setStudents(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching students:', error);
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
//       <h1>Student List</h1>
//       <ul>
//         {students.map(student => (
//           <li key={student.Student_Id}>
//             Student ID: {student.Student_Id} First Name: {student.First_Name} Middle Name: {student.Middle_Name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from 'react';

function Home() {
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentAttendance();
  }, []);

  const fetchStudentAttendance = async () => {
    try {
      const response = await fetch('http://localhost:8002/api/studentAttendance');
      if (!response.ok) {
        throw new Error('Failed to fetch student attendance');
      }
      const data = await response.json();
      setStudentAttendance(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching student attendance:', error);
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
      <h1>Student Attendance</h1>
      <ul>
        {studentAttendance.map(record => (
          <li key={record.Attendance_Id}>
            Student ID: {record.Student_Id}<br />
            First Name: {record.First_Name}<br />
            Middle Name: {record.Middle_Name}<br />
            Date: {record.Date}<br />
            Status: {record.Status}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;



