import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8081/login', values);
        console.log(response);
        if (response.status === 200) {
          // Authentication successful, redirect to home page with email query parameter
          // const userEmail = response.data.user.email;
          navigate(`/home`);
        } else {
          // Authentication failed, handle errortart
          console.log('Authentication failed:', response.data.message);
        }
      } catch (error) {
        // Handle network errors or other errors
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0'
              value={values.email}
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0'
              value={values.password}
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            <strong>Login</strong>
          </button>
          <Link to='/signups' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;