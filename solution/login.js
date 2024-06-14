import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Validation from './LoginValidation';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(to right, #aed6f1, #1b4f72);
  height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const FormContainer = styled.div`
  position: relative;
  width: 50%;
  padding: 50px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    border-radius: 0;
    padding: 20px;
  }
`;

const LogoImage = styled.img`
  width: 40px;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

const LogoText = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin-right: 10px;
  background: linear-gradient(to right, #012353, #27ae60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Playfair Display', serif;
`;

const Form = styled.form`
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const StyledImg = styled.img`
  max-width: 100%;
  margin-top: 90px;
  border-radius: 13px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Button = styled.button`
  width: 40%;
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
    border-radius: 10px;
    border: 2px solid #4caf50;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: red;
`;

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
        const response = await axios.post('http://13.127.57.224:2081/login', values);
        console.log(response);
        if (response.status === 200) {
          // Authentication successful, navigate based on role
          switch (values.role) {
            case 'master':
              navigate(`/Landing`);
              break;
            case 'admin':
              navigate(`/Landing`);
              break;
            case 'teacher':
              navigate(`/Landing`);
              break;
            case 'student':
              navigate(`/Landing`);
              break;
            default:
              // Handle default case
              break;
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

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Here you can use the slideIndex state if needed
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoginContainer>
      <SliderContainer>
        <Slider {...sliderSettings}>
          <div>
            <StyledImg src="teacher360.jpg" alt="Slide 1" />
            <p>Track your comprehensive performance across Text and Exam.</p>
          </div>
          <div>
            <StyledImg src="b2b360.jpg" alt="Slide 2" />
            <p>Get all the information about your kid by switching to parent profile.</p>
          </div>
          <div>
            <StyledImg src="Attendanceb2b - Copy.jpg" alt="Slide 3" />
            <p>Never miss a class! Stay informed of your upcoming classes and your attendance.</p>
          </div>
        </Slider>
      </SliderContainer>
      <FormContainer>
        <div>
          <LogoContainer>
            <LogoImage src="02 1.jpg" alt="Logo" />
            <LogoText>EDU 360</LogoText>
          </LogoContainer>
          <h2>Welcome!</h2>
        </div>
        <header>
          <h2>Login To Your Account</h2>
          <Form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <Input
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={handleInput}
                value={values.email}
              />
              {errors.email && <Message>{errors.email}</Message>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'><strong>Password</strong></label>
              <Input
                type='password'
                placeholder='Enter password'
                name='password'
                onChange={handleInput}
                value={values.password}
              />
              {errors.password && <Message>{errors.password}</Message>}
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
            <Button type="submit">Login</Button>
            <Link to='/signups'>Signup</Link>
          </Form>
        </header>
      </FormContainer>
    </LoginContainer>
  );
}

export default Login;
