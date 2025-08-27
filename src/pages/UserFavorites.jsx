import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { buildApiUrl } from "../config/api";
import styles from "./UserFavorites.module.css";

const UserFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0, // remove os centavos
    }).format(price);
  };

  if (loading) {
    return (
      <div className="ip ip-theme-compass">
        <Header />
        <main className={styles.mainContainer}>
          <div className={styles.loading}>Loading your favorites...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ip ip-theme-compass">
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.favoritesContainer}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>My Favorites</h1>
            <p className={styles.pageSubtitle}>
              Properties you've saved for later
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <i className="fas fa-heart"></i>
              </div>
              <h3>No favorites yet</h3>
              <p>Start exploring properties and save your favorites here.</p>
              <a href="/search" className={styles.exploreBtn}>
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
      </main>

      <Footer />
    </div>
  );
};

export default UserFavorites;
