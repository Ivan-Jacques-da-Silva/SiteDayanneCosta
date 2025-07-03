
import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-dc.png';
import styles from './Header.module.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar 
      expand="lg" 
      className={styles.navbar} 
      fixed="top" 
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          <img 
            src={logo} 
            alt="Dayanne Costa" 
            className={styles.logo}
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            
            <NavDropdown title="Search properties" id="search-dropdown">
              <NavDropdown.Item href="/new-developments/" onClick={handleNavClick}>
                New Developments
              </NavDropdown.Item>
              <NavDropdown.Item href="/single-family-homes/" onClick={handleNavClick}>
                Single Family Homes
              </NavDropdown.Item>
              <NavDropdown.Item href="/luxury-condos/" onClick={handleNavClick}>
                Luxury Condos
              </NavDropdown.Item>
              <NavDropdown.Item href="/neighborhoods/" onClick={handleNavClick}>
                Neighborhoods
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="/buy/" onClick={handleNavClick}>
              Buy
            </Nav.Link>
            
            <Nav.Link href="/sell/" onClick={handleNavClick}>
              Sell
            </Nav.Link>
            
            <NavDropdown title="Advantages" id="advantages-dropdown">
              <NavDropdown.Item as={Link} to="/compass-concierge" onClick={handleNavClick}>
                Compass Concierge
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/private-exclusive" onClick={handleNavClick}>
                Private Exclusive
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="About" id="about-dropdown">
              <NavDropdown.Item as={Link} to="/about" onClick={handleNavClick}>
                About Dayanne
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about-team" onClick={handleNavClick}>
                About Team
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link onClick={handleNavClick}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
