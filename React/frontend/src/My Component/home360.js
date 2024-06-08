import React from 'react';
import HomePage from './Homepage360';

const Navbar = () => {
  return (
    <div>
      <HomePage />
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
    </div>
  );
};

export default Navbar;
