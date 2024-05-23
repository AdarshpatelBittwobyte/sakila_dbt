import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';

function Logins() {
  const [values, setValues] = useState({
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Additional logic if no errors
    if (Object.keys(validationErrors).length === 0) {
      // Submit form or perform further actions here
      console.log('Form is valid');
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
          <button type='submit' className='btn btn-success w-100'>
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

export default Logins;
