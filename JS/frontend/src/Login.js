import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: 'master' // Default role
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
        let loginApi;
        switch (values.role) {
          case 'master':
            loginApi = 'masterlogin';
            break;
          case 'admin':
            loginApi = 'adminlogin';
            break;
          case 'teacher':
            loginApi = 'teacherlogin';
            break;
          case 'student':
            loginApi = 'studentlogin';
            break;
          default:
            loginApi = 'masterlogin'; // Default to master login if role is not recognized
        }

        const response = await axios.post(`http://localhost:8081/${loginApi}`, values);
        console.log(response);
        if (response.status === 200) {
          // Authentication successful, navigate to corresponding home page
          switch (values.role) {
            case 'master':
              navigate(`/home1`);
              break;
            case 'admin':
              navigate(`/home2`);
              break;
            case 'teacher':
              navigate(`/home3`);
              break;
            case 'student':
              navigate(`/home4`);
              break;
            default:
              navigate(`/home1`); // Default to home1 if role is not recognized
          }
        } else {
          // Authentication failed, handle error
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
          <div className='mb-3'>
            <label htmlFor='role'>
              <strong>Role</strong>
            </label>
            <select
              name='role'
              onChange={handleInput}
              value={values.role}
              className='form-control rounded-0'
            >
              <option value='master'>Master</option>
              <option value='admin'>Admin</option>
              <option value='teacher'>Teacher</option>
              <option value='student'>Student</option>
            </select>
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