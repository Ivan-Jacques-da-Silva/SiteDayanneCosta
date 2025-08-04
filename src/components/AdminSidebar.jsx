import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = ({ user }) => {
  const location = useLocation();

  const isAdmin = user?.role === 'ADMIN';

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: '📊',
      exact: true
    },
    ...(isAdmin ? [
      {
        label: 'Condominiums',
        path: '/admin/condominios',
        icon: '🏢'
      },
      {
        label: 'Users',
        path: '/admin/usuarios',
        icon: '👥'
      }
    ] : []),
    {
      label: 'Favorites',
      path: '/admin/favoritos',
      icon: '❤️'
    },
    {
      label: 'Forms',
      path: '/admin/formularios',
      icon: '📝'
    }
  ];

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🏠</span>
          <span className={styles.logoText}>Admin Panel</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userRole}>{user?.role}</span>
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
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link to="/" className={styles.backToSite}>
          <span className={styles.menuIcon}>🌐</span>
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
          <span className={styles.menuIcon}>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;