
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="ip ip-theme-compass">
      <Header />
      
      <main className={styles.mainContainer}>
        <div className={styles.dashboardContainer}>
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeContent}>
              <h1 className={styles.welcomeTitle}>
                Welcome, {user?.name || 'User'}!
              </h1>
              <p className={styles.welcomeText}>
                Thank you for being part of our community. Explore luxury properties and find your dream home.
              </p>
              <div className={styles.quickActions}>
                <a href="/search" className={styles.actionBtn}>
                  <i className="fas fa-search"></i>
                  Search Properties
                </a>
                <a href="/favorites" className={styles.actionBtn}>
                  <i className="fas fa-heart"></i>
                  My Favorites
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
