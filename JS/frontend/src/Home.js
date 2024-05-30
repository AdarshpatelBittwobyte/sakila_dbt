
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get('email');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/userByEmail/${userEmail}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  const handleUpdateName = async () => {
    const newName = prompt('Enter new name:');
    if (newName) {
      try {
        await axios.put(`http://localhost:8081/userByEmail/${userEmail}`, { name: newName });
        setUser({ ...user, name: newName });
      } catch (error) {
        console.error('Error updating name:', error.message);
      }
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/userByEmail/${userEmail}`);
        // Redirect to login page or perform any other action after deletion
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <button onClick={handleUpdateName}>Update Name</button>
      <button onClick={handleDeleteUser}>Delete Account</button>
    </div>
  );
}

export default Home;
