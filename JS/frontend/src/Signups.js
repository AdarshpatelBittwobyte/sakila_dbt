import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signups() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Additional logic if no errors
    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h3>Sign-up</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="name"><strong>Name</strong></label>
              <input 
                type="text" 
                name="name" 
                value={values.name} 
                onChange={handleInput} 
                placeholder='Enter Name' 
                className='form-control rounded-0' 
              />
              {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email</strong></label>
              <input 
                type="email" 
                name="email" 
                value={values.email} 
                onChange={handleInput} 
                placeholder='Enter email' 
                className='form-control rounded-0' 
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input 
                type="password" 
                name="password" 
                value={values.password} 
                onChange={handleInput} 
                placeholder='Enter password' 
                className='form-control rounded-0' 
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100'><strong>Sign Up</strong></button>
            <p>You agree to our terms and policies</p>
            <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signups;
