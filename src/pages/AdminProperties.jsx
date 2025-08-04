
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './AdminProperties.module.css';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      window.location.href = '/login';
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'ADMIN') {
        window.location.href = '/';
        return;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    loadProperties();
  }, [currentPage, filter]);

  const loadProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filter && { status: filter })
      });

      const response = await fetch(`http://0.0.0.0:5000/api/admin/properties?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties);
        setTotalPages(data.pagination.pages);
      } else {
        console.error('Failed to load properties');
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://0.0.0.0:5000/api/admin/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        loadProperties(); // Reload the list
      } else {
        alert('Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.adminPage}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Property Management</h1>
            <Link to="/admin/properties/new" className={styles.addButton}>
              Add New Property
            </Link>
          </div>

          <div className={styles.filters}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Properties</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="SOLD">Sold</option>
              <option value="OFF_MARKET">Off Market</option>
            </select>
          </div>

          <div className={styles.propertiesTable}>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Address</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Bedrooms</th>
                  <th>Bathrooms</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>
                      {property.images.find(img => img.isPrimary) ? (
                        <img 
                          src={property.images.find(img => img.isPrimary).url} 
                          alt={property.title}
                          className={styles.propertyImage}
                        />
                      ) : (
                        <div className={styles.noImage}>No Image</div>
                      )}
                    </td>
                    <td>{property.title}</td>
                    <td>{property.address}, {property.city}</td>
                    <td>{formatPrice(property.price)}</td>
                    <td>{property.propertyType}</td>
                    <td>
                      <span className={`${styles.status} ${styles[property.status.toLowerCase()]}`}>
                        {property.status}
                      </span>
                    </td>
                    <td>{property.bedrooms || '-'}</td>
                    <td>{property.bathrooms || '-'}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/admin/properties/edit/${property.id}`} className={styles.editButton}>
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteProperty(property.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                Previous
              </button>
              
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProperties;
