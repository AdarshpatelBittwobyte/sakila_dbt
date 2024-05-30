
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
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

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
    setServerError('');

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      axios.post('http://localhost:8081/signups', values)
        .then(res => {
          setLoading(false);
          navigate('/');
        })
        .catch(err => {
          setLoading(false);
          if (err.response?.status === 409) {
            setServerError('Email already exists.');
          } else {
            setServerError('Something went wrong, please try again.');
          }
        });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h3>Sign-up</h3>
        {serverError && <div className='alert alert-danger'>{serverError}</div>}
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
                aria-invalid={!!errors.name}
                aria-describedby="nameError"
              />
              {errors.name && <span id="nameError" className='text-danger'>{errors.name}</span>}
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
                aria-invalid={!!errors.email}
                aria-describedby="emailError"
              />
              {errors.email && <span id="emailError" className='text-danger'>{errors.email}</span>}
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
                aria-invalid={!!errors.password}
                aria-describedby="passwordError"
              />
              {errors.password && <span id="passwordError" className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100' disabled={loading}>
              <strong>{loading ? 'Signing Up...' : 'Sign Up'}</strong>
            </button>
            <p>You agree to our terms and policies</p>
            <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signups;
