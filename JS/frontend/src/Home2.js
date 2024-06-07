import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home1 = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/students');
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div>
      <h1>Student Data</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Parent_ID</th>
            <th>First_Name</th>
            <th>Middle_Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.Parent_ID}>
              <td>{student.Parent_ID}</td>
              <td>{student.First_Name}</td>
              <td>{student.Middle_Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home1;

 