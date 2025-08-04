import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminCondominios.module.css';

const AdminCondominios = () => {
  const [condominios, setCondominios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCondominio, setEditingCondominio] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    description: '',
    amenities: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    loadCondominios();
  }, []);

  const loadCondominios = async () => {
    try {
      // Mock data for now - replace with API call
      setCondominios([
        {
          id: 1,
          name: 'Residencial Sunset',
          address: 'Rua das Flores, 123',
          city: 'Miami',
          state: 'FL',
          description: 'Luxury condominium with ocean view',
          amenities: 'Pool, Gym, Party Room',
          status: 'ACTIVE',
          totalUnits: 45,
          availableUnits: 12
        },
        {
          id: 2,
          name: 'Torre Brickell',
          address: 'Brickell Avenue, 456',
          city: 'Miami',
          state: 'FL',
          description: 'Modern apartments in the heart of Brickell',
          amenities: 'Rooftop, Spa, Concierge',
          status: 'ACTIVE',
          totalUnits: 120,
          availableUnits: 8
        }
      ]);
    } catch (error) {
      console.error('Error loading condominios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCondominio) {
        // Update existing
        console.log('Updating condominio:', formData);
      } else {
        // Create new
        console.log('Creating condominio:', formData);
      }

      setShowForm(false);
      setEditingCondominio(null);
      resetForm();
      loadCondominios();
    } catch (error) {
      console.error('Error saving condominio:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      description: '',
      amenities: '',
      status: 'ACTIVE'
    });
  };

  const handleEdit = (condominio) => {
    setEditingCondominio(condominio);
    setFormData(condominio);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this condominium?')) {
      try {
        console.log('Deleting condominio:', id);
        loadCondominios();
      } catch (error) {
        console.error('Error deleting condominio:', error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading condominiums...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.condominiosPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Manage Condominiums</h1>
            <p>Register and manage available condominiums</p>
          </div>
          <button 
            className={styles.addBtn}
            onClick={() => {
              resetForm();
              setEditingCondominio(null);
              setShowForm(true);
            }}
          >
            <span>+</span> Add New Condominium
          </button>
        </div>

        {showForm && (
          <div className={styles.formModal}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{editingCondominio ? 'Edit Condominium' : 'New Condominium'}</h2>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Condominium Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Amenities</label>
                  <textarea
                    value={formData.amenities}
                    onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                    rows="2"
                    placeholder="Pool, Gym, Party Room..."
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={() => setShowForm(false)} className={styles.cancelBtn}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    {editingCondominio ? 'Update' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.condominiosList}>
          {condominios.map((condominio) => (
            <div key={condominio.id} className={styles.condominioCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{condominio.name}</h3>
                  <p className={styles.endereco}>{condominio.address}, {condominio.city} - {condominio.state}</p>
                </div>
                <div className={styles.cardActions}>
                  <span className={`${styles.status} ${styles[condominio.status.toLowerCase()]}`}>
                    {condominio.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                  </span>
                  <button onClick={() => handleEdit(condominio)} className={styles.editBtn}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(condominio.id)} className={styles.deleteBtn}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.descricao}>{condominio.description}</p>
                <div className={styles.amenidades}>
                  <strong>Amenities:</strong> {condominio.amenities}
                </div>
                <div className={styles.unidades}>
                  <span className={styles.unidadeInfo}>
                    <strong>{condominio.availableUnits}</strong> available of <strong>{condominio.totalUnits}</strong> units
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCondominios;