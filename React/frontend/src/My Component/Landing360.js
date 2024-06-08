import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown, faUsers, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = styled.nav`
  background: linear-gradient(to right, #27AE60, #012353);
  color: white;
  height:auto;
  border-radius: 5px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 10px;
  width: 100%;
  z-index: 1000;

  @media only screen and (max-width: 768px) {
    padding: 0px;
    flex-direction: column;
    align-items: center;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  position: relative;
  padding: 0;
  margin: 0;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavLinkItem = styled.li`
  position: relative;
  margin-right: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif;

  &:hover {
    font-weight: bold; /* Bold font on hover */
  }

  @media only screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const DropdownMenu = styled.ul`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  top: ${({ isVisible }) => (isVisible ? '100%' : 'auto')};
  left: 0;
  background-color: #f8f9fa;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1;
`;

const DropdownItem = styled.li`
  padding: 10px 20px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: black;

  &:hover {
    background-color: #d5dbdb;
    color: black;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

const Icon = styled.span`
  margin-right: 5px; /* Adjust the margin between icon and text */
`;

const Landing360 = () => {
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const handleMouseEnter = (menu) => setVisibleDropdown(menu);
  const handleMouseLeave = () => setVisibleDropdown(null);

  return (
    <Navbar>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial', fontSize: '1.1em' }}>
        {/* Logo or any other content */}
      </Link>
      <NavLinks>
        <NavLinkItem
          onMouseEnter={() => handleMouseEnter('student')}
          onMouseLeave={handleMouseLeave}
        >
          <Icon>
            <FontAwesomeIcon icon={faUser} className="icon" />
          </Icon>
          Student Management <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '5px' }} />
          <DropdownMenu isVisible={visibleDropdown === 'student'}>
            <DropdownItem><StyledLink to="/profile">Profile</StyledLink></DropdownItem>
            <DropdownItem><StyledLink to="/Acadmic">Academic</StyledLink></DropdownItem>
            <DropdownItem><StyledLink to="/Attendance ">Attendance</StyledLink></DropdownItem>
          </DropdownMenu>
        </NavLinkItem>

        <NavLinkItem onMouseEnter={() => handleMouseEnter('staff')} onMouseLeave={handleMouseLeave}>
          <Icon>
            <FontAwesomeIcon icon={faUsers} className="icon" />
          </Icon>
          Staff Management <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '5px' }} />
          <DropdownMenu isVisible={visibleDropdown === 'staff'}>
            <DropdownItem><StyledLink to="/Teacher Profile">Teacher Profile</StyledLink></DropdownItem>
            <DropdownItem><StyledLink to="/Teacher Attendance">Attendance</StyledLink></DropdownItem>
          </DropdownMenu>
        </NavLinkItem>

        <NavLinkItem onMouseEnter={() => handleMouseEnter('Academics')} onMouseLeave={handleMouseLeave}>
          <Icon>
            <FontAwesomeIcon icon={faGraduationCap} className="icon" />
          </Icon>
          Academics Management <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '5px' }} />
          <DropdownMenu isVisible={visibleDropdown === 'Academics'}>
            <DropdownItem><StyledLink to="/Time Table">Time Table Management</StyledLink></DropdownItem>
            <DropdownItem><StyledLink to="/Exam Time Table">Exam Scheduling</StyledLink></DropdownItem>
            <DropdownItem><StyledLink to="/Event360">Event Planning</StyledLink></DropdownItem>
          </DropdownMenu>
        </NavLinkItem>
      </NavLinks>
    </Navbar>
  );
};

export default Landing360;
