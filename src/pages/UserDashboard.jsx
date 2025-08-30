
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useSearch from '../hooks/useSearch';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const { performSearch, isLoading } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch({ search: searchTerm });
    }
  };

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
              
              {/* Quick Search Form */}
              <form onSubmit={handleQuickSearch} className={styles.quickSearchForm}>
                <div className={styles.searchInputGroup}>
                  <input
                    type="text"
                    placeholder="Search properties by location, type, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                  <button 
                    type="submit" 
                    className={styles.searchBtn}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-search"></i>
                    )}
                  </button>
                </div>
              </form>

              <div className={styles.quickActions}>
                <a href="/search" className={styles.actionBtn}>
                  <i className="fas fa-search"></i>
                  Advanced Search
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
