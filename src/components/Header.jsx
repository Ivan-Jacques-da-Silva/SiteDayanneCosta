
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
    <>
      {/* Header Top */}
      <div className={`${styles.headerTop} ${scrolled ? styles.headerTopScrolled : ''}`}>
        <Container>
          <div className={styles.headerTopContent}>
            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a href="https://www.youtube.com/@dayannecosta1958" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw==" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="http://www.linkedin.com/in/dayanne-costa-66451162" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            {/* Language Switcher */}
            <div className={styles.languageSwitcher}>
              <button className={styles.languageButton}>
                <span>EN</span>
                <span className={styles.flagIcon}>🇺🇸</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <a href="mailto:dayanne.costa@compass.com" className={styles.contactItem}>
                <span>EMAIL</span>
                <span>dayanne.costa@compass.com</span>
              </a>
              <a href="tel:+16465983588" className={styles.contactItem}>
                <span>PHONE</span>
                <span>+1 (646) 598-3588</span>
              </a>
            </div>

            {/* Login */}
            <div className={styles.loginSection}>
              <button className={styles.loginBtn}>
                <i className="fas fa-user"></i>
                <span>Login</span>
              </button>
              <button className={styles.registerBtn}>
                <span>Register</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar 
        expand="lg" 
        className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}
        fixed="top" 
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleNavClick} className={styles.brand}>
            <div className={styles.logoWrapper}>
              <img 
                src={scrolled ? logoBlack : logo} 
                alt="Dayanne Costa" 
                className={styles.logo}
              />
            </div>
            <img 
              src={scrolled ? 
                "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/942207c45d8a02752b0a81240bb7c35d.png" : 
                "https://api-cms.idxboost.com/assets/images/logo-compass-white.png"
              } 
              alt="Compass" 
              className={styles.brokerLogo}
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
                as={Link}
                to="/contact"
                onClick={handleNavClick}
                className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : ''}`}
              >
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
