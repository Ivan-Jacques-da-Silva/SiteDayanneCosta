import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = ({ user }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === 'ADMIN';

  const getRoleLabel = (role) => {
    switch (role) {
      case 'ADMIN': return 'Administrator';
      case 'AGENT': return 'Broker';
      case 'CLIENT': return 'Client';
      default: return role || '';
    }
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: 'fas fa-chart-bar',
      exact: true
    },
    ...(isAdmin ? [
      {
        label: 'Condominiums',
        path: '/admin/condominios',
        icon: 'fas fa-building'
      },
      {
        label: 'Site Editor',
        path: '/admin/site-editor',
        icon: 'fas fa-paint-brush'
      },
      {
        label: 'Users',
        path: '/admin/usuarios',
        icon: 'fas fa-users'
      }
    ] : []),
    // Comentado temporariamente - Favoritos não são necessários para admin por enquanto
    // {
    //   label: 'Favorites',
    //   path: '/admin/favoritos',
    //   icon: 'fas fa-heart'
    // },
    {
      label: 'Forms',
      path: '/admin/formularios',
      icon: 'fas fa-file-alt'
    }
  ];

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.show : ''}`}
        onClick={closeMobileMenu}
      ></div>

    <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <button 
          className={styles.closeButton}
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <div className={styles.logo}>
          <span className={styles.logoIcon}><i className="fas fa-home"></i></span>
          <span className={styles.logoText}>Admin Panel</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userRole}>{getRoleLabel(user?.role)}</span>
          </div>
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <Link
                to={item.path}
                className={`${styles.menuLink} ${
                  isActiveRoute(item.path, item.exact) ? styles.active : ''
                }`}
                onClick={closeMobileMenu}
              >
                <span className={styles.menuIcon}><i className={item.icon}></i></span>
                <span className={styles.menuLabel}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link to="/" className={styles.backToSite} onClick={closeMobileMenu}>
          <span className={styles.menuIcon}><i className="fas fa-globe"></i></span>
          <span>Back to Site</span>
        </Link>
        <button
          className={styles.logoutBtn}
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
        >
          <span className={styles.menuIcon}><i className="fas fa-sign-out-alt"></i></span>
          <span>Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default AdminSidebar;
 