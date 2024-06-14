import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import emailjs from 'emailjs-com';
import styled from 'styled-components';


const StyledContainer = styled.div`
  background-color: #f2f3f4;
`;

const StyledContent = styled.div`
  background-image: url('teacher360.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 40px;

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




const Home = () => {

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
    <div>
      <Navbar />
      <div className="background-image shadow" style={{ 
        backgroundImage: 'url("background.avif")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '400px', 
        position: 'relative', 
        borderRadius: "20px",
      }}>
        <div className="image-text" style={{ 
          position: 'absolute', 
          top: '20%', 
          left: '50%', 
          transform: 'translate(-100%, -0%)', 
          color: 'white', 
          fontSize: '32px', 
          textAlign: 'center', 
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
          padding: '10px', 
          fontFamily: 'Playfair Display, serif', 
          fontWeight: 'bold' 
        }}>
          Simplify Your School Management<br />With B2B EDU360
        </div>
        <div className="second-background-image" style={{
          backgroundImage: 'url("Schoolyam-AboutUS (1).png")',
          backgroundSize: 'cover',
          top: '0px',
          right: '0px', // Adjusted from marginLeft to right
          width: '400px',
          height: '400px',
          position: 'absolute', // Added position
        }}>
        </div>
      </div>

      <div className="background-color" style={{ backgroundColor: '#D6DBDF', height: 'auto', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', borderRadius: "20px" }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="Schoolyam-Girl-With-Laptop.jpg" alt="" style={{ width: '300px', marginRight: '20px', borderRadius: "20px" }} />
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 'bold', color: '#2C3E50', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>About EDU360</h1>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#2C3E50' }}>
              B2B EDU360 helps you get your school online platform. You can anytime, anywhere access and ensure smooth functioning of the academic process. B2B EDU360 effectively manages your day-to-day administrative activities like managing grades, student attendance, exams & results, employee & payroll, fees & accounts, certificates, front office, transportation, etc.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div style={{ textAlign: 'center', marginBottom: '10px', marginTop: '10px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Our Services</h2>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="info-card" style={{ backgroundColor: '#F5F5F5', padding: '10px', marginTop: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', width: '100%', height: '100%' }}>
              <img src="Screenshot_24-5-2024_173836_www.skolaro.com.jpeg" alt="" style={{ width: '40px', height: '50px', marginBottom: '10px' }} />
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#333', fontSize: '18px', fontWeight: 'bold', margin: '6px 0', lineHeight: '1.2' }}>Student Management</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="info-card" style={{ backgroundColor: '#F5F5F5', padding: '10px', marginTop: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', width: '100%', height: '100%' }}>
              <img src="attandence.webp" alt="" style={{ width: '40px', height: '50px', marginBottom: '10px' }} />
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#333', fontSize: '18px', fontWeight: 'bold', margin: '7px 0', lineHeight: '1.2' }}>Attendance Management</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="info-card" style={{ backgroundColor: '#F5F5F5', padding: '10px', marginTop: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', width: '100%', height: '100%' }}>
              <img src="Screenshot 2024-05-24 180344.png" alt="" style={{ width: '40px', height: '50px', marginBottom: '10px' }} />
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#333', fontSize: '18px', fontWeight: 'bold', margin: '7px 0', lineHeight: '1.2' }}>Academic Management</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="info-card" style={{ backgroundColor: '#F5F5F5', padding: '10px', marginTop: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', width: '100%', height: '100%' }}>
              <img src="Screenshot_24-5-2024_173836_www.skolaro.com.jpeg" alt="" style={{ width: '40px', height: '50px', marginBottom: '10px' }} />
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#333', fontSize: '18px', fontWeight: 'bold', margin: '7px 0', lineHeight: '1.2' }}>Staff Management</h2>
            </div>
          </div>
        </div>
      </div>




      <StyledContainer>
      {/* <Navbar /> */}
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

    </div>
  );
};

export default Home;
