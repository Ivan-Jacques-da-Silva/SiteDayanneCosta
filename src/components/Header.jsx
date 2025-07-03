import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from './Header.module.css';
import { FaInstagram, FaLinkedin, FaUser, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { MdOutlineAppRegistration } from 'react-icons/md';
import { BsYoutube } from 'react-icons/bs';
import usaFlag from '../assets/img/usa-flag.png'; // bandeira EUA
import logo from '../assets/img/logo-dc.png';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={`py-2 ${styles.navbarCustom}`}> 
      <Container className="d-flex flex-column">
        {/* Linha superior */}
        <div className="d-flex w-100 justify-content-between align-items-center mb-1">
          <div className="d-flex align-items-center gap-3">
            <BsYoutube size={14} className="text-white" />
            <FaInstagram size={14} className="text-white" />
            <FaLinkedin size={14} className="text-white" />
            <span className="text-white small">EN</span>
            {/* <img src={usaFlag} alt="EN" style={{ width: 20, height: 13 }} /> */}
            <MdEmail className="text-white" size={14} />
            <span className="text-white small">dayannecosta@compass.com</span>
            <FaPhone className="text-white" size={14} />
            <span className="text-white small">+1 (646) 598-3588</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaUser className="text-white" size={14} />
            <span className="text-white small">Login</span>
            <span className="text-white small">|</span>
            <span className="text-white small">Register</span>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="d-flex w-100 justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="Logo DC" style={{ height: 40 }} />
            <span className="text-white">|</span>
            <span className="text-white fw-bold fs-5">COMPASS</span>
          </div>

          <Nav className="d-flex gap-3">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/search" className="text-white">Search Properties</Nav.Link>
            <Nav.Link href="/buy" className="text-white">Buy</Nav.Link>
            <Nav.Link href="/sell" className="text-white">Sell</Nav.Link>
            <Nav.Link href="/advantages" className="text-white">Advantages</Nav.Link>
            <Nav.Link href="/about" className="text-white">About</Nav.Link>
            <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
