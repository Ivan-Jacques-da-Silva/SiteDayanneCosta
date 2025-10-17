
import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, buildApiUrl, authenticatedFetch } from '../config/apiConfig';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminFavoritos.module.css';

const AdminFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadFavoritos();
  }, [currentPage, filter]);

  const loadFavoritos = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = {
        page: currentPage,
        limit: 10,
        ...(filter && { userId: filter })
      };

      const response = await authenticatedFetch(buildApiUrl(API_ENDPOINTS.ADMIN_FAVORITES, params));

      if (response.ok) {
        const data = await response.json();
        setFavoritos(data.favorites);
        setTotalPages(data.pagination.pages);
      } else {
        // Mock data for development
        setFavoritos([
          {
            id: 1,
            userId: 1,
            propertyId: 1,
            createdAt: '2024-01-15T10:30:00Z',
            user: {
              name: 'João Silva',
              email: 'joao@email.com'
            },
            property: {
              title: 'Luxury Condo in Brickell',
              address: '2101 Brickell Ave, Unit 905',
              city: 'Miami',
              state: 'FL',
              price: 850000,
              propertyType: 'CONDO',
              bedrooms: 2,
              bathrooms: 2,
              images: [{
                url: '/api/placeholder/300/200',
                isPrimary: true
              }]
            }
          },
          {
            id: 2,
            userId: 2,
            propertyId: 2,
            createdAt: '2024-01-10T14:20:00Z',
            user: {
              name: 'Maria Santos',
              email: 'maria@email.com'
            },
            property: {
              title: 'Waterfront Villa in Coconut Grove',
              address: '3450 Main Highway',
              city: 'Coconut Grove',
              state: 'FL',
              price: 2500000,
              propertyType: 'HOUSE',
              bedrooms: 4,
              bathrooms: 3,
              images: [{
                url: '/api/placeholder/300/200',
                isPrimary: true
              }]
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id) => {
    if (window.confirm('Are you sure you want to remove this favorite?')) {
      try {
        const token = localStorage.getItem('token');
        await authenticatedFetch(`${API_ENDPOINTS.ADMIN_FAVORITES}/${id}`, {
          method: 'DELETE'
        });
        loadFavoritos();
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading favorites...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.favoritosPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>User Favorites</h1>
            <p>View and manage user favorite properties</p>
          </div>
        </div>

        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by user name or email..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.favoritosList}>
          {favoritos.map((favorito) => (
            <div key={favorito.id} className={styles.favoritoCard}>
              <div className={styles.propertyImage}>
                {favorito.property.images && favorito.property.images[0] ? (
                  <img 
                    src={favorito.property.images[0].url} 
                    alt={favorito.property.title}
                  />
                ) : (
                  <div className={styles.noImage}>
                    <i className="fas fa-image"></i>
                  </div>
                )}
              </div>

              <div className={styles.cardContent}>
                <div className={styles.propertyInfo}>
                  <h3>{favorito.property.title}</h3>
                  <p className={styles.address}>
                    {favorito.property.address}, {favorito.property.city}, {favorito.property.state}
                  </p>
                  <div className={styles.price}>
                    {formatPrice(favorito.property.price)}
                  </div>
                  <div className={styles.propertyDetails}>
                    <span><i className="fas fa-bed"></i> {favorito.property.bedrooms} bed</span>
                    <span><i className="fas fa-bath"></i> {favorito.property.bathrooms} bath</span>
                    <span><i className="fas fa-home"></i> {favorito.property.propertyType}</span>
                  </div>
                </div>

                <div className={styles.userInfo}>
                  <div className={styles.userDetails}>
                    <span className={styles.userName}>{favorito.user.name}</span>
                    <span className={styles.userEmail}>{favorito.user.email}</span>
                  </div>
                  <div className={styles.favoriteDate}>
                    <i className="fas fa-heart"></i>
                    <span>Added {formatDate(favorito.createdAt)}</span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button 
                    onClick={() => handleRemoveFavorite(favorito.id)}
                    className={styles.removeBtn}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {favoritos.length === 0 && (
          <div className={styles.noResults}>
            <h3>No favorites found</h3>
            <p>Users haven't added any properties to their favorites yet.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.paginationBtn}
            >
              Previous
            </button>

            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFavoritos;
