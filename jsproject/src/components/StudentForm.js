import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function StudentForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/students', { name, age, grade }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Student added successfully!');
      history.push('/students');
    } catch (error) {
      console.error(error);
      alert('Error adding student');
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Student</button>
    </div>
  );
}

export default StudentForm;
