import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const contactRef = useRef(null);

  const handleDropdownToggle = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const linkStyle = {
    fontFamily: 'Arial',
    color: 'black',
    fontWeight: 'normal',
    textDecoration: 'none',
    transition: 'font-weight 0.3s',
  };

  const activeLinkStyle = {
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  const handleMouseOver = (event) => {
    event.target.style.fontWeight = 'bold';
    event.target.style.textDecoration = 'none';
  };

  const handleMouseOut = (event) => {
    event.target.style.fontWeight = 'normal';
    event.target.style.textDecoration = 'none';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 shadow-sm"
          style={{ padding: '10px 20px', borderRadius: "5px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <Link className="navbar-brand student-management-link" to="/">
            <img src="02 1.jpg" alt="B2B360 Logo" style={{ width: '40px', height: '30px', marginRight: '7px' }} />
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3em', fontWeight: 'bold', backgroundImage: 'linear-gradient(to right, #012353, #27AE60)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EDU<span style={{ color: '#dc3545' }}>3</span>6<span style={{ color: '#28a745' }}>0</span></span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarDropdownServices"
            aria-expanded={activeDropdown !== null}
            aria-label="Toggle navigation"
            onClick={() => handleDropdownToggle('navbarNav')}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-end ${activeDropdown ? 'show' : ''}`} ref={contactRef}>
            <ul className="navbar-nav" style={{ fontSize: '1em', fontFamily: 'Playfair Display, serif' }}>
              <li className="nav-item">
                <button
                  className="nav-link student-management-link"
                  style={activeDropdown === 'home' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={() => handleDropdownToggle('home')}
                >
                  <FontAwesomeIcon icon={faHome} className="icon" />
                  <span style={{ fontFamily: 'Playfair Display, serif' }}> Home</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link student-management-link"
                  style={activeDropdown === 'contact' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={() => {
                    handleDropdownToggle('contact');
                    scrollToContact();
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  <span style={{ fontFamily: 'Playfair Display, serif' }}> Contact Us</span>
                </button>
              </li>
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${activeDropdown === 'services' ? 'active' : ''}`}
                  id="navbarDropdownServices"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'services'}
                  style={activeDropdown === 'services' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
                  onClick={() => handleDropdownToggle('services')}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <FontAwesomeIcon icon={faBriefcase} className="icon" /><span style={{ fontFamily: 'Playfair Display, serif' }}> Services</span>
                </button>
                <div className={`dropdown-menu ${activeDropdown === 'services' ? 'show' : ''}`} aria-labelledby="navbarDropdownServices" style={{ marginLeft: '-100px', fontFamily: 'Playfair Display, serif' }}>
                  <Link to="/service1" className="dropdown-item">Attendance</Link>
                  <Link to="/service1" className="dropdown-item">Attendance</Link>
                  <Link to="/service2" className="dropdown-item">Student</Link>
                  <Link to="/service3" className="dropdown-item">Staff</Link>
                  <Link to="/service4" className="dropdown-item">Academic</Link>
                  <Link to="/service5" className="dropdown-item">Fees</Link>
                  <Link to="/service6" className="dropdown-item">Account</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Login button placed outside of the dropdown */}
          <Link
            to="/login"
            className="btn"
            style={{
              marginLeft: '10px',
              fontWeight: 'bold',
              borderRadius: '10px',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
              background: 'linear-gradient(to right, #012353, #27AE60)',
              color: 'white',
              border: 'none',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Login
          </Link>
        </nav>
      </div>
      <div id="contact" style={{ paddingTop: '80px' }} ref={contactRef}>
        {/* Your content here */}
      </div>
    </div>
  );
};

export default Navbar;
