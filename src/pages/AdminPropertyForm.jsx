import React, { useState } from 'react';
import { propertyExampleData, convertToApiFormat } from '../data/propertyExample';
import styles from './AdminPropertyForm.module.css';

const AdminPropertyForm = () => {
  const [formData, setFormData] = useState(propertyExampleData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));

      const apiData = convertToApiFormat(formData, userData.id);

      const response = await fetch('http://0.0.0.0:5000/api/properties', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
      });

      if (response.ok) {
        alert('Property added successfully!');
        // Redirecionar ou limpar formulário
      } else {
        alert('Error adding property');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding property');
    } finally {
      setLoading(false);
    }
  };

  const loadExampleData = () => {
    setFormData(propertyExampleData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1>Add New Property</h1>
        <button 
          type="button" 
          onClick={loadExampleData}
          className={styles.exampleButton}
        >
          Load Example Data (Brickell)
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Informações Básicas */}
        <section className={styles.section}>
          <h2>Basic Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="mlsId">MLS ID</label>
            <input
              type="text"
              id="mlsId"
              name="mlsId"
              value={formData.mlsId || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
        </section>

        {/* Endereço */}
        <section className={styles.section}>
          <h2>Address</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="neighborhood">Neighborhood</label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Detalhes da Propriedade */}
        <section className={styles.section}>
          <h2>Property Details</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="propertyType">Type</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="CONDO">Condo</option>
                <option value="SINGLE_FAMILY">Single Family</option>
                <option value="TOWNHOUSE">Townhouse</option>
                <option value="LUXURY_CONDO">Luxury Condo</option>
                <option value="NEW_DEVELOPMENT">New Development</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status || ''}
                onChange={handleInputChange}
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="SOLD">Sold</option>
                <option value="OFF_MARKET">Off Market</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pricePerSqft">Price per Sq.Ft ($)</label>
              <input
                type="number"
                id="pricePerSqft"
                name="pricePerSqft"
                value={formData.pricePerSqft || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                type="number"
                step="0.5"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sqft">Area (Sq.Ft)</label>
              <input
                type="number"
                id="sqft"
                name="sqft"
                value={formData.sqft || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Características */}
        <section className={styles.section}>
          <h2>Features</h2>

          <div className={styles.checkboxGrid}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="pool"
                checked={formData.pool || false}
                onChange={handleInputChange}
              />
              Pool
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="waterfront"
                checked={formData.waterfront || false}
                onChange={handleInputChange}
              />
              Waterfront
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished || false}
                onChange={handleInputChange}
              />
              Furnished
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="petFriendly"
                checked={formData.petFriendly || false}
                onChange={handleInputChange}
              />
              Pet Friendly
            </label>
          </div>
        </section>

        {/* Coordenadas */}
        <section className={styles.section}>
          <h2>Location (GPS)</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                value={formData.latitude || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                value={formData.longitude || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Tour Virtual */}
        <section className={styles.section}>
          <h2>Media</h2>

          <div className={styles.formGroup}>
            <label htmlFor="virtualTour">Virtual Tour (URL)</label>
            <input
              type="url"
              id="virtualTour"
              name="virtualTour"
              value={formData.virtualTour || ''}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Amenidades (Preview) */}
        <section className={styles.section}>
          <h2>Amenities (Example)</h2>
          <div className={styles.amenitiesList}>
            {formData.amenities?.map((amenity, index) => (
              <span key={index} className={styles.amenityTag}>
                {amenity.name}
              </span>
            ))}
          </div>
        </section>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyForm;