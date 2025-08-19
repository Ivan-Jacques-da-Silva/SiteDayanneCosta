import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buildApiUrl } from '../config/api';
import styles from './AdminProperties.module.css';

// Elegant notification component
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.notificationContent}>
        <span className={styles.notificationIcon}>
          {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </span>
        <span className={styles.notificationMessage}>{message}</span>
        <button className={styles.notificationClose} onClick={onClose}>×</button>
      </div>
    </div>
  );
};

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    neighborhood: ''
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { value: 'NEW_DEVELOPMENTS', label: 'New Developments' },
    { value: 'SINGLE_FAMILY_HOMES', label: 'Single Family Homes' },
    { value: 'LUXURY_CONDOS', label: 'Luxury Condos' },
    { value: 'NEIGHBORHOODS', label: 'Neighborhoods' }
  ];

  const neighborhoods = [
    { value: 'BRICKELL', label: 'Brickell' },
    { value: 'EDGEWATER', label: 'Edgewater' },
    { value: 'COCONUT_GROVE', label: 'Coconut Grove' },
    { value: 'THE_ROADS', label: 'The Roads' }
  ];

  const statuses = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'SOLD', label: 'Sold' },
    { value: 'OFF_MARKET', label: 'Off Market' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'ADMIN') {
        navigate('/');
        return;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Notification helpers
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    // Automatically hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const getImageUrl = (url) => {
    if (!url) return '/default.png';
    // If it's already a full URL or starts with http, return as is
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url;
    // If it starts with uploads/ (without leading slash)
    if (url.startsWith('uploads/')) {
      return `http://localhost:5000/${url}`;
    }
    // If it starts with /uploads
    if (url.startsWith('/uploads')) {
      return `http://localhost:5000${url}`;
    }
    // Otherwise, assume it's a relative path and prepend the backend URL
    return `http://localhost:5000/uploads/properties/${url}`;
  };


  useEffect(() => {
    loadProperties();
  }, [currentPage, filters]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status })
      });

      let endpoint = '/api/admin/properties';

      if (filters.category && filters.category !== 'NEIGHBORHOODS') {
        endpoint = `/api/properties/category/${filters.category.toLowerCase()}`;
      } else if (filters.category === 'NEIGHBORHOODS' && filters.neighborhood) {
        endpoint = `/api/properties/neighborhood/${filters.neighborhood.toLowerCase()}`;
      }

      const response = await fetch(buildApiUrl(`${endpoint}?${queryParams}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        console.error('Failed to load properties');
        showNotification('Falha ao carregar propriedades', 'error');
        setProperties([]);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      showNotification('Erro ao carregar propriedades', 'error');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && value !== 'NEIGHBORHOODS' && { neighborhood: '' })
    }));
    setCurrentPage(1);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const handleDeleteProperty = async (id) => {
    setShowDeleteModal(id);
  };

  const confirmDelete = async () => {
    const id = showDeleteModal;
    setShowDeleteModal(null);

    try {
      showNotification('Excluindo propriedade...', 'info');

      const response = await fetch(buildApiUrl(`/api/admin/properties/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        showNotification('Propriedade excluída com sucesso!', 'success');
        loadProperties();
      } else {
        showNotification('Erro ao excluir propriedade', 'error');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      showNotification('Erro ao excluir propriedade', 'error');
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowEditModal(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getCategoryLabel = (category, neighborhood) => {
    if (category === 'NEIGHBORHOODS' && neighborhood) {
      const neighborhoodObj = neighborhoods.find(n => n.value === neighborhood);
      return neighborhoodObj ? neighborhoodObj.label : neighborhood;
    }
    const categoryObj = categories.find(c => c.value === category);
    return categoryObj ? categoryObj.label : category;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={hideNotification} 
          />
        )}
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={hideNotification} 
        />
      )}
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Gerenciar Propriedades</h1>
            <Link to="/admin/properties/new" className={styles.addButton}>
              Adicionar Nova Propriedade
            </Link>
          </div>

          <div className={styles.filtersContainer}>
            <div className={styles.filters}>
              <input
                type="text"
                name="search"
                placeholder="Pesquisar por título, endereço..."
                value={filters.search}
                onChange={handleFilterChange}
                className={styles.searchInput}
              />

              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className={styles.filterSelect}
              >
                <option value="">Todas as Categorias</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              {filters.category === 'NEIGHBORHOODS' && (
                <select
                  name="neighborhood"
                  value={filters.neighborhood}
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">Todos os Bairros</option>
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood.value} value={neighborhood.value}>
                      {neighborhood.label}
                    </option>
                  ))}
                </select>
              )}

              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className={styles.filterSelect}
              >
                <option value="">Todos os Status</option>
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.propertiesTable}>
            <table>
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Título</th>
                  <th>Endereço</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th>Quartos</th>
                  <th>Banheiros</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>
                      <img 
                        src={getImageUrl(property.images?.find(img => img.isPrimary)?.url || property.images?.[0]?.url)} 
                        alt={property.title}
                        className={styles.propertyImage}
                        onError={(e) => {
                          e.target.src = '/default.png';
                        }}
                      />
                    </td>
                    <td>{property.title}</td>
                    <td>{property.address}, {property.city}</td>
                    <td>{formatPrice(property.price)}</td>
                    <td>{getCategoryLabel(property.categoria, property.bairro)}</td>
                    <td>
                      <span className={`${styles.status} ${styles[property.status?.toLowerCase()]}`}>
                        {property.status}
                      </span>
                    </td>
                    <td>{property.bedrooms || '-'}</td>
                    <td>{property.bathrooms || '-'}</td>
                    <td>
                      <div className={styles.actions}>
                        <button 
                          onClick={() => handleEditProperty(property)}
                          className={styles.editButton}
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteProperty(property.id)}
                          className={styles.deleteButton}
                        >
                          Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {properties.length === 0 && (
            <div className={styles.noProperties}>
              Nenhuma propriedade encontrada.
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                Anterior
              </button>

              <span className={styles.pageInfo}>
                Página {currentPage} de {totalPages}
              </span>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </main>

      {showEditModal && (
        <PropertyEditModal 
          property={editingProperty}
          onClose={() => {
            setShowEditModal(false);
            setEditingProperty(null);
          }}
          onSave={() => {
            loadProperties(); // Reload properties after save
            setShowEditModal(false);
            setEditingProperty(null);
          }}
          showNotification={showNotification}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal 
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(null)}
        />
      )}

      <Footer />
    </div>
  );
};

// Modal de Confirmação de Exclusão
const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.confirmModal}>
        <div className={styles.modalHeader}>
          <h3>Confirmar Exclusão</h3>
        </div>
        <div className={styles.modalBody}>
          <p>Tem certeza que deseja excluir esta propriedade?</p>
          <p><strong>Esta ação não pode ser desfeita.</strong></p>
        </div>
        <div className={styles.modalActions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={onConfirm} className={styles.deleteButton}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal de Edição de Propriedade
const PropertyEditModal = ({ property, onClose, onSave, showNotification }) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    zipCode: property?.zipCode || '',
    price: property?.price || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    sqft: property?.sqft || '',
    yearBuilt: property?.yearBuilt || '',
    parkingSpaces: property?.parkingSpaces || property?.parking || '',
    status: property?.status || 'ACTIVE',
    categoria: property?.categoria || '',
    bairro: property?.bairro || '',
    pool: property?.pool || false,
    waterfront: property?.waterfront || false,
    furnished: property?.furnished || false,
    petFriendly: property?.petFriendly || false,
    isFeatured: property?.isFeatured || false
  });

  const [primaryImage, setPrimaryImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'NEW_DEVELOPMENTS', label: 'New Developments' },
    { value: 'SINGLE_FAMILY_HOMES', label: 'Single Family Homes' },
    { value: 'LUXURY_CONDOS', label: 'Luxury Condos' },
    { value: 'NEIGHBORHOODS', label: 'Neighborhoods' }
  ];

  const neighborhoods = [
    { value: 'BRICKELL', label: 'Brickell' },
    { value: 'EDGEWATER', label: 'Edgewater' },
    { value: 'COCONUT_GROVE', label: 'Coconut Grove' },
    { value: 'THE_ROADS', label: 'The Roads' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({});
    setEditingProperty(null);
    setPrimaryImage(null);
    setGalleryImages(null);

    // Clear file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      input.value = '';
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      showNotification('Salvando propriedade...', 'info');

      const formDataToSend = new FormData();

      // Add all form fields except images
      Object.keys(formData).forEach(key => {
        // Append only if the value is not null/undefined and not an empty string (unless it's a checkbox that's false)
        if (formData[key] !== null && formData[key] !== undefined) {
          if (typeof formData[key] === 'boolean' || formData[key] !== '') {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Add images with proper validation
      if (primaryImage instanceof File) {
        formDataToSend.append('primaryImage', primaryImage);
      }

      if (galleryImages && galleryImages.length > 0) {
        Array.from(galleryImages).forEach(file => {
          if (file instanceof File) {
            formDataToSend.append('galleryImages', file);
          }
        });
      }

      const url = property 
        ? `/api/admin/properties/${property.id}` 
        : '/api/admin/properties';

      const method = property ? 'PUT' : 'POST';

      const response = await fetch(buildApiUrl(url), {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        showNotification(
          property ? 'Propriedade atualizada com sucesso!' : 'Propriedade criada com sucesso!',
          'success'
        );
        onSave(); // This will call loadProperties and reset modal states
      } else {
        const errorData = await response.json();
        showNotification('error', errorData.error || 'Erro ao salvar propriedade');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification('error', 'Erro ao salvar propriedade: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{property ? 'Editar Propriedade' : 'Adicionar Nova Propriedade'}</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Preço</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Categoria</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {formData.categoria === 'NEIGHBORHOODS' && (
              <div className={styles.formGroup}>
                <label>Bairro</label>
                <select
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione um bairro</option>
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood.value} value={neighborhood.value}>
                      {neighborhood.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="ACTIVE">Ativo</option>
                <option value="PENDING">Pendente</option>
                <option value="SOLD">Vendido</option>
                <option value="OFF_MARKET">Fora do Mercado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Cidade</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Quartos</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Banheiros</label>
              <input
                type="number"
                step="0.5"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Área (sqft)</label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Ano de Construção</label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Vagas de Estacionamento</label>
              <input
                type="number"
                name="parkingSpaces"
                value={formData.parkingSpaces}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className={styles.imageSection}>
            <div className={styles.formGroup}>
              <label>Imagem Principal</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPrimaryImage(e.target.files[0])}
              />
              {property?.images?.find(img => img.isPrimary) && (
                <div className={styles.currentImage}>
                  <p><strong>Current Primary Image:</strong></p>
                  <img 
                    src={getImageUrl(property.images.find(img => img.isPrimary)?.url)} 
                    alt="Primary" 
                    className={styles.previewImage}
                    onError={(e) => {
                      e.target.src = '/default.png';
                    }}
                  />
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Galeria de Imagens</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryImages(e.target.files)}
              />
              {property?.images?.filter(img => !img.isPrimary).length > 0 && (
                <div className={styles.currentGallery}>
                  <span>Imagens atuais da galeria:</span>
                  <div className={styles.galleryPreview}>
                    {property.images.filter(img => !img.isPrimary).map((img, index) => (
                      <img 
                        key={index}
                        src={getImageUrl(img.url)} 
                        alt={`Gallery ${index + 1}`} 
                        className={styles.previewImageSmall}
                        onError={(e) => {
                          e.target.src = '/default.png';
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="pool"
                checked={formData.pool}
                onChange={handleInputChange}
              />
              Piscina
            </label>

            <label>
              <input
                type="checkbox"
                name="waterfront"
                checked={formData.waterfront}
                onChange={handleInputChange}
              />
              Frente para água
            </label>

            <label>
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished}
                onChange={handleInputChange}
              />
              Mobiliado
            </label>

            <label>
              <input
                type="checkbox"
                name="petFriendly"
                checked={formData.petFriendly}
                onChange={handleInputChange}
              />
              Pet Friendly
            </label>
            
            <label className={styles.starCheckbox}>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className={styles.starInput}
              />
              <span className={`${styles.starIcon} ${formData.isFeatured ? styles.starChecked : ''}`}>
                ⭐
              </span>
              Featured Listing
            </label>
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} className={styles.saveButton}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProperties;