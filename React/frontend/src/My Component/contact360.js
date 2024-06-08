import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import HomePage from './Homepage360';
import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: #f2f3f4;
`;

const StyledContent = styled.div`
  background-image: url('teacher360.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom right, rgba(0, 128, 0, 0.6), rgba(0, 0, 255, 0.6)); /* Green and blue gradient */
    /* You can adjust the color and opacity here */
    z-index: 1;
  }
`;

const StyledHeading = styled.h1`
  font-size: 3.1em;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

const StyledDescription = styled.div`
  font-size: calc(5px + 2vmin);
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
`;
const StyledFormContainer = styled.div`
  margin-top: 30px;
  padding: 30px;
  background-color: #85929E;
  max-width: 450px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a box shadow */
  border: 2px solid #2980b9; /* Add a border */
  position: relative;
  z-index: 2;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f2f3f4;
  border: none;
  font-size: 16px;
  color: black;
  font-family: Arial, sans-serif;
  border-radius: 10px;
`;

const StyledSubmitButton = styled.button`
  width: 40%;
  padding: 10px 50px;
  font-size: 16px;
  background-color: ${props => props.formComplete ? '#27ae60' : 'white'};
  color: ${props => props.formComplete ? 'white' : 'black'};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.2s;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.formComplete ? '#27ae60' : '#f2f3f4'};
    color: ${props => props.formComplete ? 'white' : 'black'};
  }
`;

const StyledSuccessMessage = styled.div`
  text-align: center;
  margin-top: 50px;

  & h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
`;

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const [formFields, setFormFields] = useState({
    fullName: '',
    email: '',
    schoolName: '',
    schoolAddress: ''
  });

  useEffect(() => {
    generateCode('USA');
  }, []);

  useEffect(() => {
    const allFieldsFilled = Object.values(formFields).every(field => field !== '') && phoneNumber !== '';
    setFormComplete(allFieldsFilled);
  }, [formFields, phoneNumber]);

  const generateCode = (country) => {
    let code = '';
    switch (country) {
      default:
        code = ''; // Default country code
        break;
    }
    setGeneratedCode(code);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const newPhoneNumber = value.startsWith(generatedCode) ? value.substring(generatedCode.length) : value;
    setPhoneNumber(generatedCode + newPhoneNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_a6w89qh', 'template_r079207', form.current, 'ruNn-W1LNZy9t1sLM')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          form.current.reset();
          setPhoneNumber('');
          setFormFields({
            fullName: '',
            email: '',
            schoolName: '',
            schoolAddress: ''
          });
          setFormSubmitted(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send email. Please try again.');
        }
      );
  };

  return (
    <StyledContainer>
      <HomePage />
      <StyledContent>
        <StyledHeading>CONTACT US</StyledHeading>
        <StyledDescription> Get in touch with BitTwoByte </StyledDescription>
        <StyledFormContainer>
          {formSubmitted ? (
            <StyledSuccessMessage>
              <h2>Thank you for your submission!</h2>
              <p>We'll get back to you as soon as possible.</p>
            </StyledSuccessMessage>
          ) : (
            <StyledForm ref={form} onSubmit={sendEmail}>
              <StyledInput
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formFields.fullName}
                onChange={handleInputChange}
                required
              />
              <StyledInput
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formFields.email}
                onChange={handleInputChange}
                required
              />
              <StyledInput
                type="tel"
                placeholder="Enter your number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
              <StyledInput
                type="text"
                placeholder="School Name"
                name="schoolName"
                value={formFields.schoolName}
                onChange={handleInputChange}
                required
              />
              <StyledInput
                type="text"
                placeholder="School Address"
                name="schoolAddress"
                value={formFields.schoolAddress}
                onChange={handleInputChange}
                required
              />
              <StyledSubmitButton type="submit" formComplete={formComplete}>Submit</StyledSubmitButton>
            </StyledForm>
          )}
        </StyledFormContainer>
      </StyledContent>
    </StyledContainer>
  );
};

export default Contact;
