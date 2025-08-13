import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEmail, MdPhone } from 'react-icons/md';
import styles from './Header.module.css';
import compassImg from '../assets/img/compas.png';
import logoLight from '../assets/img/logo-dc.png';
import logoDark from '../assets/img/logo-dcBlack.png';

// Função de inicialização do Google Translate
window.googleTranslateElementInit = function() {
  new window.google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,pt,es',
    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'EN';
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Carregar o script do Google Translate
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Restaurar idioma salvo ao carregar a página
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== 'EN') {
      // Aguardar mais tempo para garantir que o Google Translate carregue
      setTimeout(() => {
        translatePage(getLanguageCode(savedLanguage), savedLanguage);
      }, 3000);
    }
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleNavClick = () => {
    setShowMobileMenu(false);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (menuName) => {
    // Para submenus aninhados, precisamos manter o menu pai aberto
    if (menuName === 'neighborhoods-mobile') {
      // Se estamos abrindo/fechando neighborhoods, mantemos search aberto
      if (openSubmenu === 'neighborhoods-mobile') {
        setOpenSubmenu('search'); // Volta para mostrar apenas search
      } else {
        setOpenSubmenu('neighborhoods-mobile'); // Abre neighborhoods
      }
    } else {
      // Para outros menus, comportamento normal
      setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    }
  };

  const getLanguageCode = (displayName) => {
    switch (displayName) {
      case 'BR': return 'pt';
      case 'ES': return 'es';
      case 'EN': return 'en';
      default: return 'en';
    }
  };

  const translatePage = (language, displayName) => {
    setCurrentLanguage(displayName);
    localStorage.setItem('selectedLanguage', displayName);

    // Função para executar a tradução
    const executeTranslation = () => {
      const googleTranslateElement = document.querySelector('.goog-te-combo');
      
      if (googleTranslateElement) {
        console.log('Tentando traduzir para:', language);
        
        if (language === 'en') {
          // Para voltar ao inglês
          googleTranslateElement.selectedIndex = 0;
          googleTranslateElement.value = '';
        } else {
          // Para outros idiomas
          googleTranslateElement.value = language;
          googleTranslateElement.selectedIndex = Array.from(googleTranslateElement.options).findIndex(option => option.value === language);
        }

        // Disparar evento de mudança
        const changeEvent = new Event('change', { 
          bubbles: true, 
          cancelable: true 
        });
        googleTranslateElement.dispatchEvent(changeEvent);
        
        console.log('Tradução executada para:', language);
      } else {
        console.warn('Elemento Google Translate não encontrado');
      }
    };

    // Verificar se o Google Translate já está carregado
    if (document.querySelector('.goog-te-combo')) {
      executeTranslation();
    } else {
      // Aguardar o Google Translate carregar
      let attempts = 0;
      const maxAttempts = 50;
      
      const checkGoogleTranslate = setInterval(() => {
        attempts++;
        const element = document.querySelector('.goog-te-combo');
        
        if (element) {
          clearInterval(checkGoogleTranslate);
          executeTranslation();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkGoogleTranslate);
          console.warn('Google Translate não carregou após', maxAttempts, 'tentativas');
        }
      }, 100);
    }
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
                      src={scrolled ? logoDark : logoLight}
                    />
                  </div>
                  <img
                    alt=""
                    className={`ip-header-logo-broker js-header-logo-image ${styles.ipHeaderLogoBroker} ${scrolled ? styles.logoBlack : ''}`}
                    src={compassImg}
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
                      <span className={`ibc-c-language-switcher-label ip-mr-1 notranslate js-language-switcher-label ${styles.languageLabel}`}>{currentLanguage}</span>
                    </button>
                    <div className={`ibc-c-language-switcher-select ip-position-absolute js-language-switcher-select ${styles.languageSelect}`}>
                      <button
                        className={`ibc-c-language-switcher-option ip-position-relative ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-w-full body-xs ip-text-uppercase notranslate js-language-switcher-option ${styles.languageOption} ${currentLanguage === 'EN' ? styles.active : ''}`}
                        onClick={() => translatePage('en', 'EN')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <span className="ip-d-inline-block ip-text-center">EN</span>
                        <span className={`ibc-c-language-switcher-flag ip-d-inline-block ip-my-0 ip-mx-1 flag-english ${styles.flagIcon}`}>🇺🇸</span>
                      </button>
                      <button
                        className={`ibc-c-language-switcher-option ip-position-relative ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-w-full body-xs ip-text-uppercase notranslate js-language-switcher-option ${styles.languageOption} ${currentLanguage === 'BR' ? styles.active : ''}`}
                        onClick={() => translatePage('pt', 'BR')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <span className="ip-d-inline-block ip-text-center">BR</span>
                        <span className={`ibc-c-language-switcher-flag ip-d-inline-block ip-my-0 ip-mx-1 flag-portuguese ${styles.flagIcon}`}>🇧🇷</span>
                      </button>
                      <button
                        className={`ibc-c-language-switcher-option ip-position-relative ip-d-flex ibc-u-align-items-center ibc-u-justify-content-center ip-w-full body-xs ip-text-uppercase notranslate js-language-switcher-option ${styles.languageOption} ${currentLanguage === 'ES' ? styles.active : ''}`}
                        onClick={() => translatePage('es', 'ES')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <span className="ip-d-inline-block ip-text-center">ES</span>
                        <span className={`ibc-c-language-switcher-flag ip-d-inline-block ip-my-0 ip-mx-1 flag-spanish ${styles.flagIcon}`}>🇪🇸</span>
                      </button>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className={`ip-contact ${styles.ipContact}`}>
                    <div className={`ip-contact-wrap ibc-u-d-flex ibc-u-align-items-center ${styles.ipContactWrap}`}>
                      <a
                        className={`ip-contact-item ip-contact-email ibc-u-position-relative ip-d-flex ibc-u-align-items-center ${styles.ipContactItem} ${styles.ipContactEmail}`}
                        href="mailto:dayannecosta@compass.com"
                        title="dayannecosta@compass.com"
                      >
                        <MdEmail className={`ip-contact-icon ${styles.ipContactIcon}`} />
                        <span className={`ip-contact-value ip-ml-2 ${styles.ipContactValue}`}>dayannecosta@compass.com</span>
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
                        <Link to="/login" aria-label="Login" className={`lg-login ip-login-btn ${styles.ipLoginBtn}`}>
                          <span className={`ip-login-icon idx-icon-user ${styles.ipLoginIcon}`}>
                            <i className="fas fa-user"></i>
                          </span>
                          <span className={`ip-login-text ${styles.ipLoginText}`}>Login</span>
                        </Link>
                      </li>
                      <li className={`ip-login-item register ibc-u-position-relative ip-pl-2 ${styles.ipLoginItem} ${styles.register}`} data-modal="modal_login" data-tab="tabRegister">
                        <Link to="/register" aria-label="Register" className={`lg-register ip-login-btn ${styles.ipLoginBtn}`}>
                          <span className={`ip-login-text ${styles.ipLoginText}`}>Register</span>
                        </Link>
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
                        <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                          <Link to="" className={`ip-menu-link ${styles.ipMenuLink}`}>Neighborhoods</Link>
                          <ul className={`ip-submenu ${styles.ipSubmenu}`}>
                            <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                              <Link to="/neighborhoods/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                                View All
                              </Link>
                            </li>
                            <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                              <Link to="/brickell/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                                Brickell
                              </Link>
                            </li>
                            <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                              <Link to="/edgewater/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                                Edgewater
                              </Link>
                            </li>
                            <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                              <Link to="/coconut-grove/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                                Coconut Grove
                              </Link>
                            </li>
                            <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                              <Link to="/the-roads/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                                The Roads
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                      <Link to="/buy-sell" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
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
        <div className={`ip-mobile-menu-wrap ${styles.ipMobileMenuWrap} ${showMobileMenu ? styles.show : ''}`}>
          <div className={`ip-mobile-menu-header ${styles.ipMobileMenuHeader}`}>
            <button
              aria-expanded={showMobileMenu}
              aria-label="Close main menu"
              className={`ip-menu-close-x ${styles.ipMenuCloseX}`}
              onClick={toggleMobileMenu}
            >
              ×
            </button>
            <div className={`ip-mobile-menu-logo ${styles.ipMobileMenuLogo}`}>
              <img
                src={logoDark}
                alt="Dayanne Costa"
                className={`${styles.ipMobileMenuLogoImage}`}
              />
              <img
                src={compassImg}
                alt="Compass"
                className={`${styles.ipMobileMenuLogoBroker}`}
              />
            </div>
          </div>

          <nav aria-label="Mobile" className={`ip-mobile-menu ${styles.ipMobileMenu}`} role="navigation">
            <ul>
              <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <Link to="/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                    Home
                  </Link>
                </div>
              </li>

              <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <button
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => toggleSubmenu('search')}
                  >
                    <span style={{ flex: 1 }}>Search properties</span>
                    <span style={{ marginLeft: 'auto' }}>{openSubmenu === 'search' ? '−' : '+'}</span>
                  </button>
                </div>
                <ul className={`ip-submenu js-submenu ${styles.ipSubmenu} ${(openSubmenu === 'search' || openSubmenu === 'neighborhoods-mobile') ? styles.open : ''}`}>
                  <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                    <Link to="/new-developments/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                      New Developments
                    </Link>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                    <Link to="/single-family-homes/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                      Single Family Homes

        </div>
      </div>
      
      {/* Google Translate Element - Necessário mas oculto */}
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}></div>
    </>

                    </Link>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                    <Link to="/luxury-condos/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                      Luxury Condos
                    </Link>
                  </li>
                  <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                    <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                      <button
                        className={`ip-menu-link ${styles.ipMenuLink}`}
                        style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                        onClick={() => toggleSubmenu('neighborhoods-mobile')}
                      >
                        <span style={{ flex: 1 }}>Neighborhoods</span>
                        <span style={{ marginLeft: 'auto' }}>{openSubmenu === 'neighborhoods-mobile' ? '−' : '+'}</span>
                      </button>
                    </div>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem} ${openSubmenu === 'neighborhoods-mobile' ? styles.open : ''}`} style={{ display: openSubmenu === 'neighborhoods-mobile' ? 'block' : 'none' }}>
                    <Link to="/neighborhoods/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick} style={{ paddingLeft: '2rem', backgroundColor: '#e9ecef' }}>
                      All Neighborhoods
                    </Link>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem} ${openSubmenu === 'neighborhoods-mobile' ? styles.open : ''}`} style={{ display: openSubmenu === 'neighborhoods-mobile' ? 'block' : 'none' }}>
                    <Link to="/brickell/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick} style={{ paddingLeft: '2rem', backgroundColor: '#e9ecef' }}>
                      Brickell
                    </Link>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem} ${openSubmenu === 'neighborhoods-mobile' ? styles.open : ''}`} style={{ display: openSubmenu === 'neighborhoods-mobile' ? 'block' : 'none' }}>
                    <Link to="/edgewater/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick} style={{ paddingLeft: '2rem', backgroundColor: '#e9ecef' }}>
                      Edgewater
                    </Link>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem} ${openSubmenu === 'neighborhoods-mobile' ? styles.open : ''}`} style={{ display: openSubmenu === 'neighborhoods-mobile' ? 'block' : 'none' }}>
                    <Link to="/coconut-grove/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick} style={{ paddingLeft: '2rem', backgroundColor: '#e9ecef' }}>
                      Coconut Grove
                    </Link>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem} ${openSubmenu === 'neighborhoods-mobile' ? styles.open : ''}`} style={{ display: openSubmenu === 'neighborhoods-mobile' ? 'block' : 'none' }}>
                    <Link to="/the-roads/" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick} style={{ paddingLeft: '2rem', backgroundColor: '#e9ecef' }}>
                      The Roads
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <Link to="/buy-sell" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                    Buy/Sell
                  </Link>
                </div>
              </li>

              <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <button
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => toggleSubmenu('advantages')}
                  >
                    <span style={{ flex: 1 }}>Advantages</span>
                    <span style={{ marginLeft: 'auto' }}>{openSubmenu === 'advantages' ? '−' : '+'}</span>
                  </button>
                </div>
                <ul className={`ip-submenu js-submenu ${styles.ipSubmenu} ${openSubmenu === 'advantages' ? styles.open : ''}`}>
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
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <button
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => toggleSubmenu('about')}
                  >
                    <span style={{ flex: 1 }}>About</span>
                    <span style={{ marginLeft: 'auto' }}>{openSubmenu === 'about' ? '−' : '+'}</span>
                  </button>
                </div>
                <ul className={`ip-submenu js-submenu ${styles.ipSubmenu} ${openSubmenu === 'about' ? styles.open : ''}`}>
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
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <Link to="/contact" className={`ip-menu-link ${styles.ipMenuLink}`} onClick={handleNavClick}>
                    Contact
                  </Link>
                </div>
              </li>
            </ul>

            <div className={`ip-cta ${styles.ipCta}`}></div>

            {/* Mobile Menu Footer */}
            <div className={`ip-mobile-menu-footer ${styles.ipMobileMenuFooter}`}>
              {/* Social Links */}
              <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <div className={`ip-menu-link ${styles.ipMenuLink}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', padding: '1rem' }}>
                    <a
                      aria-label="Follow us on Youtube"
                      className={`ip-social-link ${styles.ipSocialLink}`}
                      href="https://www.youtube.com/@dayannecosta1958"
                      rel="nofollow noreferrer"
                      target="_blank"
                      title="Youtube"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', backgroundColor: '#000', color: '#fff', borderRadius: '50%', fontSize: '18px' }}
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a
                      aria-label="Follow us on Instagram"
                      className={`ip-social-link ${styles.ipSocialLink}`}
                      href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw=="
                      rel="nofollow noreferrer"
                      target="_blank"
                      title="Instagram"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', backgroundColor: '#000', color: '#fff', borderRadius: '50%', fontSize: '18px' }}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      aria-label="Follow us on Linked In"
                      className={`ip-social-link ${styles.ipSocialLink}`}
                      href="http://www.linkedin.com/in/dayanne-costa-66451162"
                      rel="nofollow noreferrer"
                      target="_blank"
                      title="Linked In"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', backgroundColor: '#000', color: '#fff', borderRadius: '50%', fontSize: '18px' }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </li>

              {/* Email Contact */}
              <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <a
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    href="mailto:dayannecosta@compass.com"
                    title="dayannecosta@compass.com"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                  >
                    <i className="fas fa-envelope" style={{ fontSize: '16px', width: '20px' }}></i>
                    <span>dayannecosta@compass.com</span>
                  </a>
                </div>
              </li>

              {/* Phone Contact */}
              <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <a
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    href="tel:+1 (646) 598-3588"
                    title="+1 (646) 598-3588"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                  >
                    <i className="fas fa-phone" style={{ fontSize: '16px', width: '20px' }}></i>
                    <span>+1 (646) 598-3588</span>
                  </a>
                </div>
              </li>

              {/* Login */}
              <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <Link
                    to="/login"
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
                    onClick={handleNavClick}
                  >
                    <i className="fas fa-user" style={{ fontSize: '16px', width: '20px' }}></i>
                    <span>Login</span>
                  </Link>
                </div>
              </li>

              {/* Register */}
              <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <Link
                    to="/register"
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
                    onClick={handleNavClick}
                  >
                    <i className="fas fa-user-plus" style={{ fontSize: '16px', width: '20px' }}></i>
                    <span>Register</span>
                  </Link>
                </div>
              </li>

              {/* Language Switcher */}
              <li className={`ip-menu-item ip-menu-item-has-children ${styles.ipMenuItem} ${styles.ipMenuItemHasChildren}`}>
                <div className={`ip-menu-item-wrapper ${styles.ipMenuItemWrapper}`}>
                  <button
                    className={`ip-menu-link ${styles.ipMenuLink}`}
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => toggleSubmenu('language')}
                  >
                    <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <i className="fas fa-globe" style={{ fontSize: '16px', width: '20px' }}></i>
                      <span>Language</span>
                    </span>
                    <span style={{ marginLeft: 'auto' }}>{openSubmenu === 'language' ? '−' : '+'}</span>
                  </button>
                </div>
                <ul className={`ip-submenu js-submenu ${styles.ipSubmenu} ${openSubmenu === 'language' ? styles.open : ''}`}>
                  <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                    <button
                      className={`ip-menu-link ${styles.ipMenuLink} ${currentLanguage === 'EN' ? styles.active : ''}`}
                      onClick={() => {
                        translatePage('en', 'EN');
                        handleNavClick();
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <span>🇺🇸</span>
                      <span>English</span>
                    </button>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                    <button
                      className={`ip-menu-link ${styles.ipMenuLink} ${currentLanguage === 'BR' ? styles.active : ''}`}
                      onClick={() => {
                        translatePage('pt', 'BR');
                        handleNavClick();
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <span>🇧🇷</span>
                      <span>Português</span>
                    </button>
                  </li>
                  <li className={`ip-menu-item ${styles.ipMenuItem}`}>
                    <button
                      className={`ip-menu-link ${styles.ipMenuLink} ${currentLanguage === 'ES' ? styles.active : ''}`}
                      onClick={() => {
                        translatePage('es', 'ES');
                        handleNavClick();
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <span>🇪🇸</span>
                      <span>Español</span>
                    </button>
                  </li>
                </ul>
              </li>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;