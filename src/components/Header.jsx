
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Header.module.css";
import { FaInstagram, FaLinkedin, FaUser, FaPhone, FaBars, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import logo from "../assets/img/logo-dc.png";
import compassLogo from "../assets/img/compas.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  return (
    <div className={`${styles.ipHeader} ${styles.headerDesign1}`} id="ip-header">
      <div className={styles.headerWrap}>
        {/* Header Top */}
        <div className={`${styles.headerTop} d-none d-lg-flex`}>
          {/* Social Media */}
          <div className={styles.socialSection}>
            <a 
              href="https://www.youtube.com/@dayannecosta1958" 
              target="_blank" 
              rel="nofollow noreferrer" 
              className={styles.socialLink}
              aria-label="Follow us on Youtube"
            >
              <BsYoutube />
            </a>
            <a 
              href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw==" 
              target="_blank" 
              rel="nofollow noreferrer" 
              className={styles.socialLink}
              aria-label="Follow us on Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="http://www.linkedin.com/in/dayanne-costa-66451162" 
              target="_blank" 
              rel="nofollow noreferrer" 
              className={styles.socialLink}
              aria-label="Follow us on LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Language Switcher */}
          <div className={`${styles.languageSwitcher} ${isLanguageOpen ? styles.active : ''}`}>
            <button 
              className={styles.languageButton}
              onClick={toggleLanguage}
            >
              <span className={styles.languageLabel}>EN</span>
              <span className={styles.languageFlag}></span>
            </button>
            {isLanguageOpen && (
              <div className={styles.languageSelect}>
                <a href="javascript:void(0)" className={`${styles.languageOption} ${styles.active}`}>
                  <span>EN</span>
                  <span className={styles.flagEnglish}></span>
                </a>
                <a href="javascript:void(0)" className={styles.languageOption}>
                  <span>BR</span>
                  <span className={styles.flagPortuguese}></span>
                </a>
                <a href="javascript:void(0)" className={styles.languageOption}>
                  <span>ES</span>
                  <span className={styles.flagSpanish}></span>
                </a>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <a 
              href="mailto:dayanne.costa@compass.com" 
              className={styles.contactItem}
              title="dayanne.costa@compass.com"
            >
              <MdEmail />
              <span className={styles.contactText}>EMAIL</span>
              <span className={styles.contactValue}>dayanne.costa@compass.com</span>
            </a>
            <a 
              href="tel:+1 (646) 598-3588" 
              className={styles.contactItem}
              title="+1 (646) 598-3588"
            >
              <FaPhone />
              <span className={styles.contactText}>PHONE</span>
              <span className={styles.contactValue}>+1 (646) 598-3588</span>
            </a>
          </div>

          {/* Login Section */}
          <div className={styles.loginSection}>
            <button className={styles.loginBtn} aria-label="Login">
              <FaUser className={styles.loginIcon} />
              <span className={styles.loginText}>Login</span>
            </button>
            <span className={styles.separator}>|</span>
            <button className={styles.registerBtn} aria-label="Register">
              <span className={styles.loginText}>Register</span>
            </button>
          </div>
        </div>

        {/* Header Bottom */}
        <div className={styles.headerBottom}>
          <Container className="d-flex justify-content-between align-items-center">
            {/* Logo Section */}
            <div className={styles.logoSection}>
              <a href="/" className={styles.headerLogo} title="Home">
                <div className={styles.logoWrapper}>
                  <img 
                    src={logo} 
                    alt="Dayanne Costa Logo" 
                    className={styles.logoImage}
                  />
                </div>
                <img 
                  src={compassLogo} 
                  alt="Compass Logo" 
                  className={styles.logoBroker}
                />
              </a>
              <span className={styles.logoSeparator}>|</span>
              <span className={styles.compassText}>COMPASS</span>
            </div>

            {/* Desktop Navigation */}
            <nav className={`${styles.navigation} d-none d-lg-block`}>
              <ul className={styles.menu}>
                <li className={styles.menuItem}>
                  <a href="/" className={styles.menuLink}>Home</a>
                </li>
                <li className={`${styles.menuItem} ${styles.hasChildren}`}>
                  <a href="#" className={styles.menuLink}>Search properties</a>
                  <ul className={styles.submenu}>
                    <li className={styles.menuItem}>
                      <a href="#" className={styles.menuLink}>New Developments</a>
                    </li>
                    <li className={styles.menuItem}>
                      <a href="/single-family-homes/" className={styles.menuLink}>Single Family Homes</a>
                    </li>
                    <li className={styles.menuItem}>
                      <a href="/luxury-condos/" className={styles.menuLink}>Luxury Condos</a>
                    </li>
                    <li className={styles.menuItem}>
                      <a href="#" className={styles.menuLink}>Neighborhoods</a>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem}>
                  <a href="/buy/" className={styles.menuLink}>Buy</a>
                </li>
                <li className={styles.menuItem}>
                  <a href="/sell/" className={styles.menuLink}>Sell</a>
                </li>
                <li className={`${styles.menuItem} ${styles.hasChildren}`}>
                  <a href="#" className={styles.menuLink}>Advantages</a>
                  <ul className={styles.submenu}>
                    <li className={styles.menuItem}>
                      <a href="/compass-concierge" className={styles.menuLink}>Compass Concierge</a>
                    </li>
                    <li className={styles.menuItem}>
                      <a href="/private-exclusive" className={styles.menuLink}>Private Exclusive</a>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.menuItem} ${styles.hasChildren}`}>
                  <a href="#" className={styles.menuLink}>About</a>
                  <ul className={styles.submenu}>
                    <li className={styles.menuItem}>
                      <a href="/about" className={styles.menuLink}>About Dayanne</a>
                    </li>
                    <li className={styles.menuItem}>
                      <a href="/about-team/" className={styles.menuLink}>About Team</a>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem}>
                  <a href="/contact" className={styles.menuLink}>Contact</a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className={`${styles.menuButton} d-lg-none`}
              onClick={toggleNavbar}
              aria-expanded={isOpen}
              aria-label="Show main menu"
            >
              <span className={styles.menuButtonIcon}>
                {isOpen ? <FaTimes /> : <FaBars />}
              </span>
              <span className={styles.menuButtonText}>Menu</span>
            </button>
          </Container>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenuWrap} ${isOpen ? styles.active : ''} d-lg-none`}>
          <button 
            className={styles.mobileMenuClose}
            onClick={toggleNavbar}
            aria-expanded={isOpen}
            aria-label="Close main menu"
          >
            <span className={styles.menuButtonText}>Close Menu</span>
            <span className={styles.menuButtonIcon}><FaTimes /></span>
          </button>

          <nav className={styles.mobileMenu}>
            <ul>
              <li className={styles.mobileMenuItem}>
                <a href="/" className={styles.mobileMenuLink}>Home</a>
              </li>
              <li className={styles.mobileMenuItem}>
                <div className={styles.mobileMenuHeader}>
                  <a href="#" className={styles.mobileMenuLink}>Search properties</a>
                  <button className={styles.submenuToggle}></button>
                </div>
                <ul className={styles.mobileSubmenu}>
                  <li><a href="#" className={styles.mobileMenuLink}>New Developments</a></li>
                  <li><a href="/single-family-homes/" className={styles.mobileMenuLink}>Single Family Homes</a></li>
                  <li><a href="/luxury-condos/" className={styles.mobileMenuLink}>Luxury Condos</a></li>
                  <li><a href="#" className={styles.mobileMenuLink}>Neighborhoods</a></li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <a href="/buy/" className={styles.mobileMenuLink}>Buy</a>
              </li>
              <li className={styles.mobileMenuItem}>
                <a href="/sell/" className={styles.mobileMenuLink}>Sell</a>
              </li>
              <li className={styles.mobileMenuItem}>
                <div className={styles.mobileMenuHeader}>
                  <a href="#" className={styles.mobileMenuLink}>Advantages</a>
                  <button className={styles.submenuToggle}></button>
                </div>
                <ul className={styles.mobileSubmenu}>
                  <li><a href="/compass-concierge" className={styles.mobileMenuLink}>Compass Concierge</a></li>
                  <li><a href="/private-exclusive" className={styles.mobileMenuLink}>Private Exclusive</a></li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <div className={styles.mobileMenuHeader}>
                  <a href="#" className={styles.mobileMenuLink}>About</a>
                  <button className={styles.submenuToggle}></button>
                </div>
                <ul className={styles.mobileSubmenu}>
                  <li><a href="/about" className={styles.mobileMenuLink}>About Dayanne</a></li>
                  <li><a href="/about-team/" className={styles.mobileMenuLink}>About Team</a></li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <a href="/contact" className={styles.mobileMenuLink}>Contact</a>
              </li>
            </ul>

            {/* Mobile Contact Info */}
            <div className={styles.mobileContactInfo}>
              <div className={styles.mobileContactItem}>
                <MdEmail />
                <span>dayanne.costa@compass.com</span>
              </div>
              <div className={styles.mobileContactItem}>
                <FaPhone />
                <span>+1 (646) 598-3588</span>
              </div>
              <div className={styles.mobileSocial}>
                <BsYoutube />
                <FaInstagram />
                <FaLinkedin />
              </div>
            </div>
          </nav>
        </div>

        {/* Overlay */}
        {isOpen && <div className={styles.overlay} onClick={toggleNavbar}></div>}
      </div>
    </div>
  );
};

export default Header;
