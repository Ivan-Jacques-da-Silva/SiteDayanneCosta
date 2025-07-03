
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-dc.png';
import logoBlack from '../assets/img/logo-dcBlack.png';
import styles from './Header.module.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    searchProperties: false,
    advantages: false,
    about: false
  });

  const handleNavClick = () => {
    setExpanded(false);
    setShowMobileMenu(false);
    setDropdownStates({
      searchProperties: false,
      advantages: false,
      about: false
    });
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
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
        <div className={styles.container}>
          <div className={styles.headerTopContent}>
            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a href="https://www.youtube.com/@dayannecosta1958" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Follow us on Youtube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw==" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Follow us on Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="http://www.linkedin.com/in/dayanne-costa-66451162" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Follow us on Linked In">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            {/* Language Switcher */}
            <div className={styles.languageSwitcher}>
              <button className={styles.languageButton}>
                <span className={styles.languageLabel}>EN</span>
                <span className={styles.flagIcon}>🇺🇸</span>
              </button>
              <div className={styles.languageSelect}>
                <a href="#" className={`${styles.languageOption} ${styles.active}`}>
                  <span>EN</span>
                  <span className={styles.flagIcon}>🇺🇸</span>
                </a>
                <a href="#" className={styles.languageOption}>
                  <span>BR</span>
                  <span className={styles.flagIcon}>🇧🇷</span>
                </a>
                <a href="#" className={styles.languageOption}>
                  <span>ES</span>
                  <span className={styles.flagIcon}>🇪🇸</span>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <a href="mailto:dayanne.costa@compass.com" className={styles.contactItem} title="dayanne.costa@compass.com">
                <span className={styles.contactText}>EMAIL</span>
                <span className={styles.contactValue}>dayanne.costa@compass.com</span>
              </a>
              <a href="tel:+16465983588" className={styles.contactItem} title="+1 (646) 598-3588">
                <span className={styles.contactText}>PHONE</span>
                <span className={styles.contactValue}>+1 (646) 598-3588</span>
              </a>
            </div>

            {/* Login */}
            <div className={styles.loginSection}>
              <button className={styles.loginBtn} aria-label="Login">
                <i className="fas fa-user"></i>
                <span>Login</span>
              </button>
              <button className={styles.registerBtn}>
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`${styles.header} ${scrolled ? styles.activeFixed : ''}`}>
        <div className={styles.container}>
          <div className={styles.headerWrap}>
            <div className={styles.headerBottom}>
              <Link to="/" className={styles.headerLogo} onClick={handleNavClick}>
                <div className={styles.headerLogoWrapper}>
                  <img 
                    src={scrolled ? logoBlack : logo} 
                    alt="Dayanne Costa" 
                    className={styles.headerLogoImage}
                  />
                </div>
                <img 
                  src={scrolled ? 
                    "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/942207c45d8a02752b0a81240bb7c35d.png" : 
                    "https://api-cms.idxboost.com/assets/images/logo-compass-white.png"
                  } 
                  alt="Compass" 
                  className={styles.headerLogoBroker}
                />
              </Link>

              <div className={styles.headerNavigation}>
                <nav className={styles.menuWrap} role="navigation" aria-label="Main">
                  <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                      <Link to="/" className={styles.menuLink} onClick={handleNavClick}>
                        Home
                      </Link>
                    </li>
                    
                    <li className={`${styles.menuItem} ${styles.menuItemHasChildren}`}>
                      <span className={styles.menuLink}>Search properties</span>
                      <ul className={styles.submenu}>
                        <li className={styles.menuItem}>
                          <Link to="/new-developments/" className={styles.menuLink} onClick={handleNavClick}>
                            New Developments
                          </Link>
                        </li>
                        <li className={styles.menuItem}>
                          <Link to="/single-family-homes/" className={styles.menuLink} onClick={handleNavClick}>
                            Single Family Homes
                          </Link>
                        </li>
                        <li className={styles.menuItem}>
                          <Link to="/luxury-condos/" className={styles.menuLink} onClick={handleNavClick}>
                            Luxury Condos
                          </Link>
                        </li>
                        <li className={styles.menuItem}>
                          <Link to="/neighborhoods/" className={styles.menuLink} onClick={handleNavClick}>
                            Neighborhoods
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className={styles.menuItem}>
                      <Link to="/buy/" className={styles.menuLink} onClick={handleNavClick}>
                        Buy
                      </Link>
                    </li>

                    <li className={styles.menuItem}>
                      <Link to="/sell/" className={styles.menuLink} onClick={handleNavClick}>
                        Sell
                      </Link>
                    </li>

                    <li className={`${styles.menuItem} ${styles.menuItemHasChildren}`}>
                      <span className={styles.menuLink}>Advantages</span>
                      <ul className={styles.submenu}>
                        <li className={styles.menuItem}>
                          <Link to="/compass-concierge" className={styles.menuLink} onClick={handleNavClick}>
                            Compass Concierge
                          </Link>
                        </li>
                        <li className={styles.menuItem}>
                          <Link to="/private-exclusive" className={styles.menuLink} onClick={handleNavClick}>
                            Private Exclusive
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className={`${styles.menuItem} ${styles.menuItemHasChildren}`}>
                      <span className={styles.menuLink}>About</span>
                      <ul className={styles.submenu}>
                        <li className={styles.menuItem}>
                          <Link to="/about" className={styles.menuLink} onClick={handleNavClick}>
                            About Dayanne
                          </Link>
                        </li>
                        <li className={styles.menuItem}>
                          <Link to="/about-team" className={styles.menuLink} onClick={handleNavClick}>
                            About Team
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className={styles.menuItem}>
                      <Link to="/contact" className={styles.menuLink} onClick={handleNavClick}>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>

                <button 
                  className={styles.menuButton} 
                  onClick={toggleMobileMenu}
                  aria-expanded={showMobileMenu}
                  aria-label="Show main menu"
                >
                  <span className={styles.menuButtonIcon}>
                    <span></span>
                  </span>
                  <span className={styles.menuButtonText}>Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && <div className={styles.overlay} onClick={toggleMobileMenu}></div>}
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenuWrap} ${showMobileMenu ? styles.show : ''}`}>
        <button 
          className={styles.menuButtonClose}
          onClick={toggleMobileMenu}
          aria-expanded={showMobileMenu}
          aria-label="Close main menu"
        >
          <span className={styles.menuButtonText}>Close Menu</span>
          <span className={styles.menuButtonIcon}></span>
        </button>

        <nav className={styles.mobileMenu} role="navigation" aria-label="Mobile">
          <ul>
            <li className={styles.menuItem}>
              <div className={styles.menuItemWrapper}>
                <Link to="/" className={styles.menuLink} onClick={handleNavClick}>
                  Home
                </Link>
              </div>
            </li>

            <li className={`${styles.menuItem} ${styles.menuItemHasChildren}`}>
              <div className={styles.menuItemWrapper}>
                <span className={styles.menuLink}>Search properties</span>
                <button 
                  className={styles.submenuToggle}
                  onClick={() => toggleDropdown('searchProperties')}
                >
                  {dropdownStates.searchProperties ? '-' : '+'}
                </button>
              </div>
              <ul className={`${styles.submenu} ${dropdownStates.searchProperties ? styles.open : ''}`}>
                <li className={styles.menuItem}>
                  <Link to="/new-developments/" className={styles.menuLink} onClick={handleNavClick}>
                    New Developments
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/single-family-homes/" className={styles.menuLink} onClick={handleNavClick}>
                    Single Family Homes
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/luxury-condos/" className={styles.menuLink} onClick={handleNavClick}>
                    Luxury Condos
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/neighborhoods/" className={styles.menuLink} onClick={handleNavClick}>
                    Neighborhoods
                  </Link>
                </li>
              </ul>
            </li>

            <li className={styles.menuItem}>
              <div className={styles.menuItemWrapper}>
                <Link to="/buy/" className={styles.menuLink} onClick={handleNavClick}>
                  Buy
                </Link>
              </div>
            </li>

            <li className={styles.menuItem}>
              <div className={styles.menuItemWrapper}>
                <Link to="/sell/" className={styles.menuLink} onClick={handleNavClick}>
                  Sell
                </Link>
              </div>
            </li>

            <li className={`${styles.menuItem} ${styles.menuItemHasChildren}`}>
              <div className={styles.menuItemWrapper}>
                <span className={styles.menuLink}>Advantages</span>
                <button 
                  className={styles.submenuToggle}
                  onClick={() => toggleDropdown('advantages')}
                >
                  {dropdownStates.advantages ? '-' : '+'}
                </button>
              </div>
              <ul className={`${styles.submenu} ${dropdownStates.advantages ? styles.open : ''}`}>
                <li className={styles.menuItem}>
                  <Link to="/compass-concierge" className={styles.menuLink} onClick={handleNavClick}>
                    Compass Concierge
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/private-exclusive" className={styles.menuLink} onClick={handleNavClick}>
                    Private Exclusive
                  </Link>
                </li>
              </ul>
            </li>

            <li className={`${styles.menuItem} ${styles.menuItemHasChildren}`}>
              <div className={styles.menuItemWrapper}>
                <span className={styles.menuLink}>About</span>
                <button 
                  className={styles.submenuToggle}
                  onClick={() => toggleDropdown('about')}
                >
                  {dropdownStates.about ? '-' : '+'}
                </button>
              </div>
              <ul className={`${styles.submenu} ${dropdownStates.about ? styles.open : ''}`}>
                <li className={styles.menuItem}>
                  <Link to="/about" className={styles.menuLink} onClick={handleNavClick}>
                    About Dayanne
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/about-team" className={styles.menuLink} onClick={handleNavClick}>
                    About Team
                  </Link>
                </li>
              </ul>
            </li>

            <li className={styles.menuItem}>
              <div className={styles.menuItemWrapper}>
                <Link to="/contact" className={styles.menuLink} onClick={handleNavClick}>
                  Contact
                </Link>
              </div>
            </li>
          </ul>

          {/* Contact info in mobile menu */}
          <div className={styles.mobileContactInfo}>
            <div className={styles.contactItem}>
              <i className="fas fa-envelope"></i>
              <span>dayanne.costa@compass.com</span>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-phone"></i>
              <span>+1 (646) 598-3588</span>
            </div>
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
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
