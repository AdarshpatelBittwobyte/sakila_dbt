import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
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
            <th>actor_id</th>
            <th>first_name</th>
            <th>last_name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.actor_id}>
              <td>{student.actor_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
