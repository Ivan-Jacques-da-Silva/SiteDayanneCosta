
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useSearch from '../hooks/useSearch';
import { buildApiUrl } from '../config/api';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const { performSearch, isLoading } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const response = await fetch(buildApiUrl(`/api/favorites/${user.id}`));
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const removeFavorite = async (propertyId) => {
    try {
      const response = await fetch(
        buildApiUrl(`/api/favorites/${user.id}/${propertyId}`),
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav.propertyId !== propertyId));
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch({ search: searchTerm });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
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
            </div>
          </div>

          {/* Favorites Section */}
          <div className={styles.favoritesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Favorites</h2>
              <p className={styles.sectionSubtitle}>
                Properties you've saved for later
              </p>
            </div>

            {favoritesLoading ? (
              <div className={styles.loading}>Loading your favorites...</div>
            ) : favorites.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <i className="fas fa-heart"></i>
                </div>
                <h3>No favorites yet</h3>
                <p>Start exploring properties and save your favorites here.</p>
                <a href="/new-developments" className={styles.exploreBtn}>
                  Explore Properties
                </a>
              </div>
            ) : (
              <div className={styles.favoritesGrid}>
                {favorites.map((favorite) => (
                  <div key={favorite.id} className={styles.favoriteCard}>
                    <div className={styles.cardImage}>
                      {favorite.property.images && favorite.property.images[0] ? (
                        <img
                          src={favorite.property.images[0].url}
                          alt={favorite.property.title}
                        />
                      ) : (
                        <div className={styles.noImage}>
                          <i className="fas fa-home"></i>
                        </div>
                      )}
                      <button
                        onClick={() => removeFavorite(favorite.propertyId)}
                        className={styles.removeBtn}
                        title="Remove from favorites"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.price}>
                        {formatPrice(favorite.property.price)}
                      </div>

                      <h3 className={styles.title}>{favorite.property.title}</h3>

                      <p className={styles.address}>
                        {favorite.property.address}, {favorite.property.city},{" "}
                        {favorite.property.state}
                      </p>

                      <div className={styles.propertyDetails}>
                        <span>
                          <i className="fas fa-bed"></i>
                          {favorite.property.bedrooms} bed
                        </span>
                        <span>
                          <i className="fas fa-bath"></i>
                          {favorite.property.bathrooms} bath
                        </span>
                        <span>
                          <i className="fas fa-expand-arrows-alt"></i>
                          {favorite.property.sqft?.toLocaleString()} sqft
                        </span>
                      </div>

                      <div className={styles.cardActions}>
                        <a
                          href={`/property/${favorite.property.id}`}
                          className={styles.viewBtn}
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
