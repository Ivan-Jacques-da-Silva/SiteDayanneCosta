
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-dc.png';
import logoBlack from '../assets/img/logo-dcBlack.png';
import styles from './Header.module.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}
      fixed="top" 
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick} className={styles.brand}>
          <img 
            src={scrolled ? logoBlack : logo} 
            alt="Dayanne Costa" 
            className={styles.logo}
          />
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className={`${styles.navbarToggler} ${scrolled ? styles.togglerScrolled : ''}`}
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              onClick={handleNavClick}
              className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : ''}`}
            >
              Home
            </Nav.Link>
            
            <NavDropdown 
              title="Search properties" 
              id="search-dropdown"
              className={`${styles.navDropdown} ${scrolled ? styles.navDropdownScrolled : ''}`}
            >
              <NavDropdown.Item as={Link} to="/new-developments/" onClick={handleNavClick}>
                New Developments
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/single-family-homes/" onClick={handleNavClick}>
                Single Family Homes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/luxury-condos/" onClick={handleNavClick}>
                Luxury Condos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/neighborhoods/" onClick={handleNavClick}>
                Neighborhoods
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link 
              as={Link} 
              to="/buy/" 
              onClick={handleNavClick}
              className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : ''}`}
            >
              Buy
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/sell/" 
              onClick={handleNavClick}
              className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : ''}`}
            >
              Sell
            </Nav.Link>
            
            <NavDropdown 
              title="Advantages" 
              id="advantages-dropdown"
              className={`${styles.navDropdown} ${scrolled ? styles.navDropdownScrolled : ''}`}
            >
              <NavDropdown.Item as={Link} to="/compass-concierge" onClick={handleNavClick}>
                Compass Concierge
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/private-exclusive" onClick={handleNavClick}>
                Private Exclusive
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown 
              title="About" 
              id="about-dropdown"
              className={`${styles.navDropdown} ${scrolled ? styles.navDropdownScrolled : ''}`}
            >
              <NavDropdown.Item as={Link} to="/about" onClick={handleNavClick}>
                About Dayanne
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about-team" onClick={handleNavClick}>
                About Team
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link 
              href="#contact"
              onClick={handleNavClick}
              className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : ''}`}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
