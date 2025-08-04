
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
        alert('Propriedade cadastrada com sucesso!');
        // Redirecionar ou limpar formulário
      } else {
        alert('Erro ao cadastrar propriedade');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar propriedade');
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
        <h1>Cadastrar Nova Propriedade</h1>
        <button 
          type="button" 
          onClick={loadExampleData}
          className={styles.exampleButton}
        >
          Carregar Dados de Exemplo (Brickell)
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Informações Básicas */}
        <section className={styles.section}>
          <h2>Informações Básicas</h2>
          
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
            <label htmlFor="title">Título</label>
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
            <label htmlFor="description">Descrição</label>
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
          <h2>Endereço</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="address">Endereço</label>
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
              <label htmlFor="city">Cidade</label>
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
              <label htmlFor="state">Estado</label>
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
              <label htmlFor="zipCode">CEP</label>
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
              <label htmlFor="neighborhood">Bairro</label>
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
          <h2>Detalhes da Propriedade</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="propertyType">Tipo</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="CONDO">Condomínio</option>
                <option value="SINGLE_FAMILY">Casa Individual</option>
                <option value="TOWNHOUSE">Townhouse</option>
                <option value="LUXURY_CONDO">Condomínio de Luxo</option>
                <option value="NEW_DEVELOPMENT">Novo Desenvolvimento</option>
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
                <option value="ACTIVE">Ativo</option>
                <option value="PENDING">Pendente</option>
                <option value="SOLD">Vendido</option>
                <option value="OFF_MARKET">Fora do Mercado</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Preço ($)</label>
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
              <label htmlFor="pricePerSqft">Preço por Sq.Ft ($)</label>
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
              <label htmlFor="bedrooms">Quartos</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bathrooms">Banheiros</label>
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
              <label htmlFor="sqft">Área (Sq.Ft)</label>
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
          <h2>Características</h2>
          
          <div className={styles.checkboxGrid}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="pool"
                checked={formData.pool || false}
                onChange={handleInputChange}
              />
              Piscina
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="waterfront"
                checked={formData.waterfront || false}
                onChange={handleInputChange}
              />
              Vista para Água
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished || false}
                onChange={handleInputChange}
              />
              Mobiliado
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
          <h2>Localização (GPS)</h2>
          
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
          <h2>Mídia</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="virtualTour">Tour Virtual (URL)</label>
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
          <h2>Amenidades (Exemplo)</h2>
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
            {loading ? 'Cadastrando...' : 'Cadastrar Propriedade'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyForm;
