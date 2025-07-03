
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEmail, MdPhone } from 'react-icons/md';
import styles from './Header.module.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleNavClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <div className={`ip ip-theme-compass ${styles.ip}`} id="ip">
        <header 
          className={`ip-header ibc-t-design-1 js-header ${styles.ipHeader} ${scrolled ? styles.activeFixed : ''}`} 
          id="ip-header" 
          role="banner"
        >
          <div className={`ip-header-wrap ${styles.ipHeaderWrap}`}>
            
            {/* Header Bottom */}
            <div className={`ip-header-bottom ${styles.ipHeaderBottom}`}>
              {/* Left Column - Logos */}
              <div className={`ip-header-left ${styles.ipHeaderLeft}`}>
                <Link to="/" className={`ip-header-logo ${styles.ipHeaderLogo}`} title="Home">
                  <div className={`ip-header-logo-wrapper ${styles.ipHeaderLogoWrapper}`}>
                    <img 
                      alt="" 
                      className={`ip-header-logo-image ip-h-auto js-header-logo-image ${styles.ipHeaderLogoImage}`} 
                      data-logo-dark="/src/assets/img/logo-dcBlack.png" 
                      data-logo-light="/src/assets/img/logo-dc.png" 
                      src={scrolled ? "/src/assets/img/logo-dcBlack.png" : "/src/assets/img/logo-dc.png"}
                    />
                  </div>
                  <img 
                    alt="" 
                    className={`ip-header-logo-broker js-header-logo-image ${styles.ipHeaderLogoBroker}`} 
                    data-logo-dark="https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/942207c45d8a02752b0a81240bb7c35d.png" 
                    data-logo-light="https://api-cms.idxboost.com/assets/images/logo-compass-white.png" 
                    src={scrolled ? "https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/942207c45d8a02752b0a81240bb7c35d.png" : "https://api-cms.idxboost.com/assets/images/logo-compass-white.png"}
                  />
                </Link>
              </div>

              {/* Right Column - Navigation and Contact */}
              <div className={`ip-header-right ${styles.ipHeaderRight}`}>
                {/* Top Row - Social, Language, Contact, Login */}
                <div className={`ip-header-top-row ${styles.ipHeaderTopRow}`}>
                  {/* Social Links */}
                  <div className={`ip-social ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-mx-0 ${styles.ipSocial}`}>
                    <a 
                      aria-label="Follow us on Youtube" 
                      className={`ip-social-link ip-youtube idx-icon-youtube ibc-u-position-relative ${styles.ipSocialLink}`} 
                      href="https://www.youtube.com/@dayannecosta1958" 
                      rel="nofollow noreferrer" 
                      target="_blank" 
                      title="Youtube"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a 
                      aria-label="Follow us on Instagram" 
                      className={`ip-social-link ip-instagram idx-icon-instagram ibc-u-position-relative ${styles.ipSocialLink}`} 
                      href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw==" 
                      rel="nofollow noreferrer" 
                      target="_blank" 
                      title="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a 
                      aria-label="Follow us on Linked In" 
                      className={`ip-social-link ip-linkedin idx-icon-linkedin2 ibc-u-position-relative ${styles.ipSocialLink}`} 
                      href="http://www.linkedin.com/in/dayanne-costa-66451162" 
                      rel="nofollow noreferrer" 
                      target="_blank" 
                      title="Linked In"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>

                  {/* Language Switcher */}
                  <div className={`ibc-c-language-switcher ip-position-relative notranslate js-language-switcher ${styles.languageSwitcher}`}>
                    <button className={`ibc-c-language-switcher-button ip-position-relative ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-h-full body-xs ip-text-uppercase js-language-switcher-button ${styles.languageButton}`}>
                      <span className={`ibc-c-language-switcher-flag ip-d-inline-block ip-my-0 ip-mr-1 flag-english js-language-switcher-flag ${styles.flagIcon}`}>
                        <i className="fas fa-globe"></i>
                      </span>
                      <span className={`ibc-c-language-switcher-label ip-mr-1 notranslate js-language-switcher-label ${styles.languageLabel}`}>EN</span>
                    </button>
                    <div className={`ibc-c-language-switcher-select ip-position-absolute js-language-switcher-select ${styles.languageSelect}`}>
                      <a className={`ibc-c-language-switcher-option ip-position-relative ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-w-full body-xs ip-text-uppercase notranslate ibc-is-active js-language-switcher-option ${styles.languageOption} ${styles.active}`} data-iso="en" href="#" rel="nofollow">
                        <span className="ip-d-inline-block ip-text-center">EN</span>
                        <span className={`ibc-c-language-switcher-flag ip-d-inline-block ip-my-0 ip-mx-1 flag-english ${styles.flagIcon}`}>🇺🇸</span>
                      </a>
                      <a className={`ibc-c-language-switcher-option ip-position-relative ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-w-full body-xs ip-text-uppercase notranslate js-language-switcher-option ${styles.languageOption}`} data-iso="pt" href="#" rel="nofollow">
                        <span className="ip-d-inline-block ip-text-center">BR</span>
                        <span className={`ibc-c-language-switcher-flag ip-d-inline-block ip-my-0 ip-mx-1 flag-portuguese ${styles.flagIcon}`}>🇧🇷</span>
                      </a>
                      <a className={`ibc-c-language-switcher-option ip-position-relative ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-w-full body-xs ip-text-uppercase notranslate js-language-switcher-option ${styles.languageOption}`} data-iso="es" href="#" rel="nofollow">
                        <span className="ip-d-inline-block ip-text-center">ES</span>
                        <span className={`ibc-c-language-switcher-flag ip-d-inline-block ip-my-0 ip-mx-1 flag-spanish ${styles.flagIcon}`}>🇪🇸</span>
                      </a>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className={`ip-contact ${styles.ipContact}`}>
                    <div className={`ip-contact-wrap ibc-u-d-flex ibc-u-align-items-center ${styles.ipContactWrap}`}>
                      <a 
                        className={`ip-contact-item ip-contact-email ibc-u-position-relative ip-d-flex ibc-u-align-items-center ${styles.ipContactItem} ${styles.ipContactEmail}`} 
                        href="mailto:dayanne.costa@compass.com" 
                        title="dayanne.costa@compass.com"
                      >
                        <MdEmail className={`ip-contact-icon ${styles.ipContactIcon}`} />
                        <span className={`ip-contact-value ip-ml-2 ${styles.ipContactValue}`}>dayanne.costa@compass.com</span>
                      </a>
                      <a 
                        className={`ip-contact-item ip-contact-phone ibc-u-position-relative ip-d-flex ibc-u-align-items-center ${styles.ipContactItem} ${styles.ipContactPhone}`} 
                        href="tel:+1 (646) 598-3588" 
                        title="+1 (646) 598-3588"
                      >
                        <MdPhone className={`ip-contact-icon ${styles.ipContactIcon}`} />
                        <span className={`ip-contact-value ip-ml-2 ${styles.ipContactValue}`}>+1 (646) 598-3588</span>
                      </a>
                    </div>
                  </div>

                  {/* Login Section */}
                  <div className={`ip-login js-login ${styles.ipLogin}`}>
                    <ul className={`ip-login-wrap item-no-hea ibc-u-d-flex ibc-u-align-items-center ${styles.ipLoginWrap}`} id="user-options">
                      <li className={`ip-login-item login ${styles.ipLoginItem}`} data-modal="modal_login" data-tab="tabLogin">
                        <button aria-label="Login" className={`lg-login ip-login-btn ${styles.ipLoginBtn}`}>
                          <span className={`ip-login-icon idx-icon-user ${styles.ipLoginIcon}`}>
                            <i className="fas fa-user"></i>
                          </span>
                          <span className={`ip-login-text ${styles.ipLoginText}`}>Login</span>
                        </button>
                      </li>
                      <li className={`ip-login-item register ibc-u-position-relative ip-pl-2 ${styles.ipLoginItem} ${styles.register}`} data-modal="modal_login" data-tab="tabRegister">
                        <button aria-label="Register" className={`lg-register ip-login-btn ${styles.ipLoginBtn}`}>
                          <span className={`ip-login-text ${styles.ipLoginText}`}>Register</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Row - Navigation Menu */}
                <div className={`ip-header-bottom-row ${styles.ipHeaderBottomRow}`}>
                  <div className={`ip-header-navigation ${styles.ipHeaderNavigation}`}>
                <nav aria-label="Main" className={`ip-menu-wrap ${styles.ipMenuWrap}`} role="navigation">
                  <ul className={`ip-menu ${styles.ipMenu}`}>
                    <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                      <Link to="/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                        Home
                      </Link>
                    </li>
                    
                    <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                      <Link to="" className={`ip-menu-link ${styles.ipMenuLink}`}>Search properties</Link>
                      <ul className={`ip-submenu ${styles.ipSubmenu}`}>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/new-developments/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            New Developments
                          </Link>
                        </li>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/single-family-homes/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            Single Family Homes
                          </Link>
                        </li>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/luxury-condos/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            Luxury Condos
                          </Link>
                        </li>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/neighborhoods/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            Neighborhoods
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                      <Link to="/search" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                        Buy/Sell
                      </Link>
                    </li>

                    <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                      <Link to="" className={`ip-menu-link ${styles.ipMenuLink}`}>Advantages</Link>
                      <ul className={`ip-submenu ${styles.ipSubmenu}`}>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/compass-concierge" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            Compass Concierge
                          </Link>
                        </li>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/private-exclusive" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            Private Exclusive
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                      <Link to="" className={`ip-menu-link ${styles.ipMenuLink}`}>About</Link>
                      <ul className={`ip-submenu ${styles.ipSubmenu}`}>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/about" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            About Dayanne
                          </Link>
                        </li>
                        <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                          <Link to="/about-team" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                            About Team
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                      <Link to="/contact" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>

                <button 
                  aria-expanded={showMobileMenu}
                  aria-label="Show main menu" 
                  className={`ip-menu-button ${styles.ipMenuButton}`} 
                  id="show-mobile-menu"
                  onClick={toggleMobileMenu}
                >
                  <span className={`ip-menu-button-icon ${styles.ipMenuButtonIcon}`}>
                    <span></span>
                  </span>
                  <span className={`ip-menu-button-text ${styles.ipMenuButtonText}`}>Menu</span>
                </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`ms-overlay r-overlay js-toggle-menu ${styles.overlay} ${showMobileMenu ? styles.show : ''}`} onClick={toggleMobileMenu}></div>
          </div>
        </header>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenuSidebar} ${showMobileMenu ? styles.show : ''}`}>
          {/* Logo Section */}
          <div className={styles.mobileMenuHeader}>
            <Link to="/" className={styles.mobileMenuLogo} onClick={handleNavClick}>
              <img 
                src="/src/assets/img/logo-dcBlack.png" 
                alt="Dayanne Costa Logo" 
                className={styles.mobileLogoImage}
              />
              <img 
                src="https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/942207c45d8a02752b0a81240bb7c35d.png" 
                alt="Compass Logo" 
                className={styles.mobileCompassImage}
              />
            </Link>
            <button 
              aria-label="Close menu" 
              className={styles.mobileMenuClose}
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className={styles.mobileNavigation}>
            <ul className={styles.mobileMenuList}>
              <li className={styles.mobileMenuItem}>
                <Link to="/" className={styles.mobileMenuLink} onClick={handleNavClick}>
                  <i className="fas fa-home"></i>
                  <span>Home</span>
                </Link>
              </li>

              <li className={styles.mobileMenuItem}>
                <div className={styles.mobileMenuParent}>
                  <span className={styles.mobileMenuLink}>
                    <i className="fas fa-search"></i>
                    <span>Search Properties</span>
                  </span>
                </div>
                <ul className={styles.mobileSubmenu}>
                  <li>
                    <Link to="/new-developments/" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      New Developments
                    </Link>
                  </li>
                  <li>
                    <Link to="/single-family-homes/" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      Single Family Homes
                    </Link>
                  </li>
                  <li>
                    <Link to="/luxury-condos/" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      Luxury Condos
                    </Link>
                  </li>
                  <li>
                    <Link to="/neighborhoods/" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      Neighborhoods
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={styles.mobileMenuItem}>
                <Link to="/search" className={styles.mobileMenuLink} onClick={handleNavClick}>
                  <i className="fas fa-handshake"></i>
                  <span>Buy/Sell</span>
                </Link>
              </li>

              <li className={styles.mobileMenuItem}>
                <div className={styles.mobileMenuParent}>
                  <span className={styles.mobileMenuLink}>
                    <i className="fas fa-star"></i>
                    <span>Advantages</span>
                  </span>
                </div>
                <ul className={styles.mobileSubmenu}>
                  <li>
                    <Link to="/compass-concierge" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      Compass Concierge
                    </Link>
                  </li>
                  <li>
                    <Link to="/private-exclusive" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      Private Exclusive
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={styles.mobileMenuItem}>
                <div className={styles.mobileMenuParent}>
                  <span className={styles.mobileMenuLink}>
                    <i className="fas fa-info-circle"></i>
                    <span>About</span>
                  </span>
                </div>
                <ul className={styles.mobileSubmenu}>
                  <li>
                    <Link to="/about" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      About Dayanne
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-team" className={styles.mobileSubmenuLink} onClick={handleNavClick}>
                      About Team
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={styles.mobileMenuItem}>
                <Link to="/contact" className={styles.mobileMenuLink} onClick={handleNavClick}>
                  <i className="fas fa-envelope"></i>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Links Section */}
          <div className={styles.mobileSocialSection}>
            <div className={styles.mobileSocialLinks}>
              <a 
                href="https://www.youtube.com/@dayannecosta1958" 
                target="_blank" 
                rel="nofollow noreferrer"
                className={styles.mobileSocialLink}
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a 
                href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw==" 
                target="_blank" 
                rel="nofollow noreferrer"
                className={styles.mobileSocialLink}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="http://www.linkedin.com/in/dayanne-costa-66451162" 
                target="_blank" 
                rel="nofollow noreferrer"
                className={styles.mobileSocialLink}
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Contact & Login Section */}
          <div className={styles.mobileContactSection}>
            <div className={styles.mobileContactItem}>
              <a href="mailto:dayanne.costa@compass.com" className={styles.mobileContactLink}>
                <MdEmail className={styles.mobileContactIcon} />
                <span>dayanne.costa@compass.com</span>
              </a>
            </div>
            <div className={styles.mobileContactItem}>
              <a href="tel:+1 (646) 598-3588" className={styles.mobileContactLink}>
                <MdPhone className={styles.mobileContactIcon} />
                <span>+1 (646) 598-3588</span>
              </a>
            </div>
            <div className={styles.mobileLoginSection}>
              <button className={styles.mobileLoginBtn}>
                <i className="fas fa-user"></i>
                <span>Login</span>
              </button>
              <button className={styles.mobileRegisterBtn}>
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
