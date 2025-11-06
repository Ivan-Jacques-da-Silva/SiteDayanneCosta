import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminCondominios.module.css';

// Import the centralized getImageUrl function
import { buildApiUrl, getImageUrl } from '../config/api';

const AdminCondominios = () => {
  const MAX_GALLERY_IMAGES = 50;
  const [condominios, setCondominios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCondominio, setEditingCondominio] = useState(null);
  const [formData, setFormData] = useState({
    // Basic Information
    mlsId: '',
    title: '',
    description: '',
    propertyType: 'CONDO',
    status: 'ACTIVE',
    categoria: '', // Categoria principal
    bairro: '', // Subcategoria (quando categoria = "Neighborhoods")

    // Address
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    neighborhood: '',
    subdivision: '',

    // Property Details
    price: '',
    pricePerSqft: '',
    bedrooms: '',
    bathrooms: '',
    halfBathrooms: '',
    sqft: '',
    adjustedSqft: '',
    yearBuilt: '',
    daysOnMarket: '',
    dateListed: '',

    // Features
    furnished: false,
    waterfront: false,
    waterfrontDescription: '',
    pool: false,
    parking: false,
    parkingSpaces: '',
    parkingDescription: '',

    // Interior Features
    interiorFeatures: '',

    // Exterior Features
    exteriorFeatures: '',

    // Property Financial
    hoaFees: '',
    taxAmount: '',
    taxYear: '',

    // Location
    latitude: '',
    longitude: '',

    // Media
    primaryImage: null,
    galleryImages: [],

    virtualTour: '',

    // Amenities
    amenities: '',

    // Listing Information
    listingCourtesy: '',
    listingAgent: '',
    listingOffice: '',

    // Additional Details
    shortSale: 'Regular Sale',
    newConstruction: false,
    petFriendly: false
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [removedImageIndexes, setRemovedImageIndexes] = useState([]);

  // PDF file states
  const [pricingPdf, setPricingPdf] = useState(null);
  const [factSheetPdf, setFactSheetPdf] = useState(null);
  const [brochurePdf, setBrochurePdf] = useState(null);

  // PDF removal states
  const [removePricingPdf, setRemovePricingPdf] = useState(false);
  const [removeFactSheetPdf, setRemoveFactSheetPdf] = useState(false);
  const [removeBrochurePdf, setRemoveBrochurePdf] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    pages: 0
  });
  const [currentPage, setCurrentPage] = useState(1);

  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    neighborhood: ''
  });

  // State for notification modal
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success'); // 'success' or 'error'

  // Helper function to extract filename from path
  const getFileName = (filePath) => {
    if (!filePath) return '';
    return filePath.split('/').pop() || filePath;
  };

  // Categorias fixas
  const PROPERTY_CATEGORIES = [
    { value: 'NEW_DEVELOPMENTS', label: 'New Developments' },
    { value: 'SINGLE_FAMILY_HOMES', label: 'Single Family Homes' },
    { value: 'LUXURY_CONDOS', label: 'Luxury Condos' },
    { value: 'NEIGHBORHOODS', label: 'Neighborhoods' }
  ];

  const NEIGHBORHOODS = [
    { value: 'BRICKELL', label: 'Brickell' },
    { value: 'EDGEWATER', label: 'Edgewater' },
    { value: 'COCONUT_GROVE', label: 'Coconut Grove' },
    { value: 'THE_ROADS', label: 'The Roads' }
  ];

  useEffect(() => {
    console.log('🔁 useEffect currentPage changed:', currentPage);
    loadCondominios(currentPage);
  }, [currentPage]);

  const loadCondominios = async (page = 1) => {
    try {
      setLoading(true);
      console.log('🟦 loadCondominios:start', { page, when: new Date().toISOString() });

      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        setCondominios([]);
        setLoading(false);

        return;
      }

      let url = buildApiUrl('/api/admin/properties');
      console.log('🟦 baseURL:', url);
      console.log('🟦 filters at call:', JSON.parse(JSON.stringify(filters)));


      // Apply filters if any
      const params = new URLSearchParams();
      if (filters.search && filters.search.length >= 3) params.append('search', filters.search);
      if (filters.category) params.append('categoria', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.neighborhood) params.append('bairro', filters.neighborhood);

      // Add current page to params if we were to re-introduce pagination
      // params.append('page', page.toString());
      // params.append('limit', pagination.limit.toString());

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log('🟦 final URL:', url);
      console.log('🟦 has token?', !!token);


      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('🟩 response.status:', response.status);


      if (response.ok) {
        const data = await response.json();
        console.log('🟩 data keys:', Object.keys(data));
        console.log('🟩 properties is array?', Array.isArray(data.properties), 'len:', data.properties?.length);


        if (data.properties && Array.isArray(data.properties)) {
          // Manter URLs originais do banco para exibição
          const formattedCondominios = data.properties.map(property => ({
            ...property,
            images: property.images?.map(img => ({
              ...img,
              url: getImageUrl(img.url)
            })) || [],
            pricingPdf: property.pricingPdf ? buildApiUrl(property.pricingPdf) : null,
            factSheetPdf: property.factSheetPdf ? buildApiUrl(property.factSheetPdf) : null,
            brochurePdf: property.brochurePdf ? buildApiUrl(property.brochurePdf) : null,
          }));
          console.log('🟩 formatted len:', formattedCondominios.length);

          setCondominios(formattedCondominios);
          // Remove pagination dependency since we're loading all properties
          setPagination({ ...pagination, total: data.properties.length, pages: 1 });
        } else {
          console.warn('Unexpected data format for properties:', data);
          setCondominios([]);
          setPagination({ page: 1, limit: 12, total: 0, pages: 0 });
        }
      } else {
        const errorText = await response.text();
        console.log('🟥 body text:', errorText);

        console.error('Failed to load properties:', response.status, errorText);
        setCondominios([]);
        setPagination({ page: 1, limit: 12, total: 0, pages: 0 });
      }
    } catch (error) {
      console.error('🟥 loadCondominios:catch', error);
      console.error('Error loading properties:', error);
      setCondominios([]);
      setPagination({ page: 1, limit: 12, total: 0, pages: 0 });
    } finally {
      console.log('🟨 loadCondominios:finally -> setLoading(false)');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('🟦 handleSubmit:start', { editingId: editingCondominio?.id || null });

    try {
      const token = localStorage.getItem('token');

      // Prepare the data to be sent
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        pricePerSqft: parseFloat(formData.pricePerSqft) || 0,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseFloat(formData.bathrooms) || 0,
        halfBathrooms: parseInt(formData.halfBathrooms) || 0,
        sqft: parseInt(formData.sqft) || 0,
        adjustedSqft: parseInt(formData.adjustedSqft) || 0,
        yearBuilt: parseInt(formData.yearBuilt) || 0,
        daysOnMarket: parseInt(formData.daysOnMarket) || 0,
        hoaFees: parseFloat(formData.hoaFees) || 0,
        taxAmount: parseFloat(formData.taxAmount) || 0,
        taxYear: parseInt(formData.taxYear) || 0,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        parkingSpaces: parseInt(formData.parkingSpaces) || 0,
      };

      // Remove undefined or null values from propertyData to avoid sending them if not needed
      Object.keys(propertyData).forEach(key => {
        if (propertyData[key] === undefined || propertyData[key] === null) {
          delete propertyData[key];
        }
      });


      let response;
      const editingId = editingCondominio ? editingCondominio.id : null;
      const url = editingId ? buildApiUrl(`/api/admin/properties/${editingId}`) : buildApiUrl('/api/admin/properties');

      if (editingId) {
        const formDataToSend = new FormData();

        // Adicionar dados do formulário (exceto arquivos)
        Object.keys(propertyData).forEach(key => {
          if (
            key !== 'images' &&
            key !== 'primaryImage' &&
            key !== 'galleryImages' &&
            key !== 'pricingPdf' && // Excluir PDFs dos dados gerais
            key !== 'factSheetPdf' &&
            key !== 'brochurePdf' &&
            propertyData[key] !== null &&
            propertyData[key] !== undefined
          ) {
            formDataToSend.append(key, propertyData[key]);
          }
        });

        // Adicionar nova imagem principal se existir
        if (formData.primaryImage instanceof File) {
          formDataToSend.append('primaryImage', formData.primaryImage);
        }

        // Adicionar novas imagens da galeria se existirem
        if (Array.isArray(formData.galleryImages) && formData.galleryImages.length > 0) {
          formData.galleryImages.slice(0, MAX_GALLERY_IMAGES).forEach((file) => {
            if (file instanceof File) {
              formDataToSend.append('galleryImages', file);
            }
          });
        }

        // Adicionar PDFs se existirem
        if (pricingPdf instanceof File) {
          formDataToSend.append('pricingPdf', pricingPdf);
        }
        if (factSheetPdf instanceof File) {
          formDataToSend.append('factSheetPdf', factSheetPdf);
        }
        if (brochurePdf instanceof File) {
          formDataToSend.append('brochurePdf', brochurePdf);
        }

        // Adicionar flags de remoção de PDFs
        if (removePricingPdf) {
          formDataToSend.append('removePricingPdf', 'true');
        }
        if (removeFactSheetPdf) {
          formDataToSend.append('removeFactSheetPdf', 'true');
        }
        if (removeBrochurePdf) {
          formDataToSend.append('removeBrochurePdf', 'true');
        }

        response = await fetch(url, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataToSend
        });
      } else {
        const formDataToSend = new FormData();

        // Adicionar dados do formulário (exceto arquivos)
        Object.keys(propertyData).forEach(key => {
          if (
            key !== 'images' &&
            key !== 'primaryImage' &&
            key !== 'galleryImages' &&
            key !== 'pricingPdf' && // Excluir PDFs dos dados gerais
            key !== 'factSheetPdf' &&
            key !== 'brochurePdf' &&
            propertyData[key] !== null &&
            propertyData[key] !== undefined
          ) {
            formDataToSend.append(key, propertyData[key]);
          }
        });

        // Adicionar imagem principal
        if (formData.primaryImage instanceof File) {
          formDataToSend.append('primaryImage', formData.primaryImage);
        }

        // Adicionar imagens da galeria
        if (Array.isArray(formData.galleryImages) && formData.galleryImages.length > 0) {
          formData.galleryImages.slice(0, MAX_GALLERY_IMAGES).forEach((file) => {
            if (file instanceof File) {
              formDataToSend.append('galleryImages', file);
            }
          });
        }

        // Adicionar PDFs se existirem
        if (pricingPdf instanceof File) {
          formDataToSend.append('pricingPdf', pricingPdf);
        }
        if (factSheetPdf instanceof File) {
          formDataToSend.append('factSheetPdf', factSheetPdf);
        }
        if (brochurePdf instanceof File) {
          formDataToSend.append('brochurePdf', brochurePdf);
        }

        // Adicionar flags de remoção de PDFs
        if (removePricingPdf) {
          formDataToSend.append('removePricingPdf', 'true');
        }
        if (removeFactSheetPdf) {
          formDataToSend.append('removeFactSheetPdf', 'true');
        }
        if (removeBrochurePdf) {
          formDataToSend.append('removeBrochurePdf', 'true');
        }

        response = await fetch(url, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataToSend
        });
      }

      console.log('🟩 save response.status:', response.status);
      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        throw new Error(error.error || 'Failed to save property');
      }

      setShowForm(false);
      setEditingCondominio(null);
      resetForm();
      await loadCondominios(); // Reload properties after save
      setNotificationMessage('Property saved successfully!');
      setNotificationType('success');
      setShowNotification(true);
    } catch (error) {
      console.error('Error saving condominio:', error);
      setNotificationMessage(`Failed to save property: ${error.message}`);
      setNotificationType('error');
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      if (name === 'primaryImage' && files[0]) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
        setMainImagePreview(URL.createObjectURL(files[0]));
      } else if (name === 'galleryImages') {
        let fileArray = Array.from(files);
        if (fileArray.length > MAX_GALLERY_IMAGES) {
          fileArray = fileArray.slice(0, MAX_GALLERY_IMAGES);
          setNotificationMessage(`You can upload up to ${MAX_GALLERY_IMAGES} gallery images.`);
          setNotificationType('error');
          setShowNotification(true);
        }
        setFormData(prev => ({ ...prev, [name]: fileArray }));

        const previewUrls = fileArray.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previewUrls]); // Append new previews
      } else if (name === 'pricingPdf' && files[0]) {
        setPricingPdf(files[0]);
        setRemovePricingPdf(false); // Reset removal flag when new file is selected
      } else if (name === 'factSheetPdf' && files[0]) {
        setFactSheetPdf(files[0]);
        setRemoveFactSheetPdf(false); // Reset removal flag
      } else if (name === 'brochurePdf' && files[0]) {
        setBrochurePdf(files[0]);
        setRemoveBrochurePdf(false); // Reset removal flag
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removeMainImage = () => {
    setFormData(prev => ({ ...prev, primaryImage: null }));
    setMainImagePreview('');
  };

  const removeGalleryImage = (indexToRemove) => {
    // Remove from image previews
    const newImagePreviews = imagePreviews.filter((_, i) => i !== indexToRemove);
    setImagePreviews(newImagePreviews);

    // Update formData.galleryImages to reflect the removal.
    // This is tricky because formData.galleryImages might contain File objects or URLs
    // and we need to ensure the indices align.
    const currentGalleryImages = [...formData.galleryImages];

    // If the item being removed is a File object, remove it directly.
    if (currentGalleryImages[indexToRemove] instanceof File) {
      currentGalleryImages.splice(indexToRemove, 1);
    } else {
      // If it's a URL (from an existing property), we need to mark it for deletion.
      // A more robust solution might involve tracking deleted image IDs, but for simplicity,
      // let's assume we're rebuilding the list without the removed one.
      // This approach might require backend support to handle removed URLs vs new files.
      // For now, we'll just filter it out assuming it's an array of File objects or URLs.
      currentGalleryImages.splice(indexToRemove, 1);
    }
    setFormData(prev => ({ ...prev, galleryImages: currentGalleryImages }));

    // Add to removed indexes for tracking if it's an existing image being removed (not a newly uploaded one)
    // Note: This tracking mechanism might be more complex if new images are added and then removed before upload.
    // For this context, we focus on removing from the list being sent.
    console.log(`Image at index ${indexToRemove} removed from gallery previews/list.`);
  };


  const removePdf = (pdfType) => {
    switch (pdfType) {
      case 'pricing':
        setPricingPdf(null);
        setRemovePricingPdf(true);
        break;
      case 'factSheet':
        setFactSheetPdf(null);
        setRemoveFactSheetPdf(true);
        break;
      case 'brochure':
        setBrochurePdf(null);
        setRemoveBrochurePdf(true);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setFormData({
      mlsId: '',
      title: '',
      description: '',
      propertyType: 'CONDO',
      status: 'ACTIVE',
      categoria: '',
      bairro: '',
      address: '',
      city: '',
      state: 'FL',
      zipCode: '',
      subdivision: '',
      price: '',
      pricePerSqft: '',
      bedrooms: '',
      bathrooms: '',
      halfBathrooms: '',
      sqft: '',
      adjustedSqft: '',
      yearBuilt: '',
      daysOnMarket: '',
      dateListed: '',
      furnished: false,
      waterfront: false,
      waterfrontDescription: '',
      pool: false,
      parking: false,
      parkingSpaces: '',
      parkingDescription: '',
      interiorFeatures: '',
      exteriorFeatures: '',
      hoaFees: '',
      taxAmount: '',
      taxYear: '',
      latitude: '',
      longitude: '',
      primaryImage: null,
      galleryImages: [],
      virtualTour: '',
      amenities: '',
      listingCourtesy: '',
      listingAgent: '',
      listingOffice: '',
      shortSale: 'Regular Sale',
      newConstruction: false,
      petFriendly: false,
      isFeatured: false
    });

    // Clear image previews
    setImagePreviews([]);
    setMainImagePreview('');
    setRemovedImageIndexes([]);

    // Clear PDF states and removal flags
    setPricingPdf(null);
    setFactSheetPdf(null);
    setBrochurePdf(null);
    setRemovePricingPdf(false);
    setRemoveFactSheetPdf(false);
    setRemoveBrochurePdf(false);


    // Clear editing state
    setEditingCondominio(null);
  };

  const handleEdit = (condominio) => {
    setEditingCondominio(condominio);

    // Preenche o formulário com os dados existentes
    const initialFormData = {
      ...condominio,
      primaryImage: null,     // reset input de arquivo
      galleryImages: [],      // reset input de arquivo
      categoria: condominio.categoria || '',
      bairro: condominio.bairro || '',
      isFeatured: condominio.isFeatured || false // Ensure isFeatured is loaded
    };
    setFormData(initialFormData);

    // Previews das imagens existentes
    if (condominio.images && condominio.images.length > 0) {
      const existingGalleryPreviews = condominio.images
        .filter(img => !img.isPrimary)
        .map(img => img.url);

      // ✅ Faltava essa linha
      setImagePreviews(existingGalleryPreviews);

      const existingMainPreview = condominio.images.find(img => img.isPrimary);
      if (existingMainPreview) {
        setMainImagePreview(existingMainPreview.url);
      }
    } else {
      setImagePreviews([]);
      setMainImagePreview('');
    }

    // Set existing PDFs if they exist
    if (condominio.pricingPdf) setPricingPdf({ name: getFileName(condominio.pricingPdf), url: condominio.pricingPdf });
    if (condominio.factSheetPdf) setFactSheetPdf({ name: getFileName(condominio.factSheetPdf), url: condominio.factSheetPdf });
    if (condominio.brochurePdf) setBrochurePdf({ name: getFileName(condominio.brochurePdf), url: condominio.brochurePdf });

    setShowForm(true);
  };


  const [deleteModalId, setDeleteModalId] = useState(null);

  const handleDelete = async (id) => {
    setDeleteModalId(id);
  };

  const confirmDelete = async () => {
    const id = deleteModalId;
    setDeleteModalId(null);
    
    try {
      const token = localStorage.getItem('token');
      await fetch(buildApiUrl(`/api/admin/properties/${id}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await loadCondominios(); // Reload properties after delete
      setNotificationMessage('Property deleted successfully!');
      setNotificationType('success');
      setShowNotification(true);
    } catch (error) {
      console.error('Error deleting condominio:', error);
      setNotificationMessage('Erro ao deletar propriedade.');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === '') return '';
    try {
      // Ensure price is treated as a number
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        return price; // Return original if it cannot be parsed
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numericPrice);
    } catch (e) {
      console.error("Error formatting price:", price, e);
      return price; // Return original value if formatting fails
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // Validate search filter
    if (filters.search && filters.search.length < 3) {
      setNotificationMessage('A busca deve ter pelo menos 3 caracteres.');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    setCurrentPage(1); // Reset to first page when filters change
    loadCondominios(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      neighborhood: ''
    });
    setCurrentPage(1);
    // Load condominios without filters
    setTimeout(() => loadCondominios(1), 100);
  };

  if (loading && !showForm) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading condominiums...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.condominiosPage}>
        {!showForm ? (
          <>
            <div className={styles.pageHeader}>
              <div>
                <h1>Manage Properties</h1>
                <p>Register and manage luxury condominiums and properties</p>
              </div>
              <button
                className={styles.addBtn}
                onClick={() => {
                  resetForm();
                  setEditingCondominio(null);
                  setShowForm(true);
                }}
              >
                <i className="fas fa-plus"></i> Add New Property
              </button>
            </div>

            {/* Filters */}
            <div className={styles.filtersContainer}>
              <div className={styles.filtersHeader}>
                <h3><i className="fas fa-filter"></i> Filter Properties</h3>
              </div>

              <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                  <label>Search</label>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by title, address, or MLS ID (min. 3 characters)"
                    value={filters.search}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label>Category</label>
                  <select name="category" value={filters.category} onChange={handleFilterChange} className={styles.filterSelect}>
                    <option value="">All Categories</option>
                    {PROPERTY_CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Status</label>
                  <select name="status" value={filters.status} onChange={handleFilterChange} className={styles.filterSelect}>
                    <option value="">All Statuses</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending</option>
                    <option value="SOLD">Sold</option>
                    <option value="OFF_MARKET">Off Market</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Neighborhood</label>
                  <select name="neighborhood" value={filters.neighborhood} onChange={handleFilterChange} className={styles.filterSelect}>
                    <option value="">All Neighborhoods</option>
                    {NEIGHBORHOODS.map(nh => (
                      <option key={nh.value} value={nh.value}>{nh.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.filterActions}>
                <button onClick={applyFilters} className={styles.applyFiltersBtn}>
                  <i className="fas fa-search"></i> Apply Filters
                </button>
                <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                  <i className="fas fa-times"></i> Clear Filters
                </button>
              </div>
            </div>

            <div className={styles.condominiosList}>
              {Array.isArray(condominios) && condominios.length > 0 ? (
                condominios.slice((currentPage - 1) * 6, currentPage * 6).map((condominio) => (
                  <div key={condominio.id} className={styles.condominioCard}>
                    {/* Property Image */}
                    <div style={{
                      width: '100%',
                      height: '200px',
                      overflow: 'hidden',
                      borderRadius: '8px 8px 0 0',
                      marginBottom: '16px'
                    }}>
                      <img
                        src={
                          condominio.images && condominio.images.length > 0
                            ? (condominio.images.find(img => img.isPrimary)?.url || condominio.images[0]?.url)
                            : '/default.png'
                        }
                        alt={condominio.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.src = '/default.png'; // Fallback para imagem padrão
                        }}
                      />
                    </div>

                    <div className={styles.cardHeader}>
                      <div>
                        <h3>{condominio.title}</h3>
                        <p className={styles.address}>
                          {condominio.address || 'No Address'}, {condominio.city || 'No City'} - {condominio.state || 'No State'} {condominio.zipCode || ''}
                        </p>
                        <p className={styles.mlsId}>MLS: {condominio.mlsId || 'N/A'}</p>
                        <p className={styles.propertyType}>Type: {condominio.propertyType || 'N/A'}</p>
                        {condominio.categoria && (
                          <p className={styles.category}>Category: {condominio.categoria}</p>
                        )}
                        {condominio.bairro && (
                          <p className={styles.neighborhood}>Neighborhood: {condominio.bairro}</p>
                        )}
                      </div>
                      <div className={styles.cardActions}>
                        <span className={styles.price}>{formatPrice(condominio.price)}</span>
                        <span className={`${styles.status} ${styles[(condominio.status || 'active').toLowerCase()]}`}>
                          {condominio.status || 'ACTIVE'}
                        </span>
                        <div className={styles.actionButtons}>
                          <button onClick={() => handleEdit(condominio)} className={styles.editBtn} title="Edit Property">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button onClick={() => handleDelete(condominio.id)} className={styles.deleteBtn} title="Delete Property">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.propertyDetails}>
                        <span><i className="fas fa-bed"></i> {condominio.bedrooms || 0} Beds</span>
                        <span><i className="fas fa-bath"></i> {condominio.bathrooms || 0} Baths</span>
                        <span><i className="fas fa-ruler-combined"></i> {condominio.sqft || 0} Sq.Ft</span>
                        <span><i className="fas fa-calendar"></i> Built {condominio.yearBuilt || 'N/A'}</span>
                      </div>

                      {condominio.description && (
                        <p className={styles.description}>
                          {condominio.description.length > 150
                            ? condominio.description.substring(0, 150) + '...'
                            : condominio.description
                          }
                        </p>
                      )}

                      <div className={styles.features}>
                        {condominio.waterfront && <span className={styles.feature}>Waterfront</span>}
                        {condominio.furnished && <span className={styles.feature}>Furnished</span>}
                        {condominio.pool && <span className={styles.feature}>Pool</span>}
                        {condominio.parking && <span className={styles.feature}>Parking</span>}
                        {condominio.petFriendly && <span className={styles.feature}>Pet Friendly</span>}
                        {condominio.isFeatured && <span className={styles.feature}>Featured</span>}
                      </div>

                      <div className={styles.imageCount}>
                        <i className="fas fa-camera"></i> {condominio.images?.length || 0} image{(condominio.images?.length || 0) !== 1 ? 's' : ''}
                      </div>

                      <div className={styles.cardMeta}>
                        <small>Created: {new Date(condominio.createdAt).toLocaleDateString()}</small>
                        {condominio.updatedAt && condominio.updatedAt !== condominio.createdAt && (
                          <small>Updated: {new Date(condominio.updatedAt).toLocaleDateString()}</small>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <i className="fas fa-building"></i>
                  </div>
                  <h3>No Properties Found</h3>
                  <p>No properties are currently registered in the system.</p>
                  <p>Click "Add New Property" to register your first property.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && condominios.length > 6 && (
              <div className={styles.paginationContainer}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={styles.paginationBtn}
                >
                  <i className="fas fa-chevron-left"></i> Anterior
                </button>

                <div className={styles.paginationInfo}>
                  Página {currentPage} de {Math.ceil(condominios.length / 6)}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(condominios.length / 6)))}
                  disabled={currentPage === Math.ceil(condominios.length / 6)}
                  className={styles.paginationBtn}
                >
                  Próxima <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
            {/* {!loading && condominios.length > 0 && pagination.pages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginTop: '40px',
                padding: '20px'
              }}>
                <button
                  onClick={() => {
                    const newPage = currentPage - 1;
                    setCurrentPage(newPage);
                    loadCondominios(newPage);
                  }}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                    color: currentPage === 1 ? '#9ca3af' : '#374151',
                    borderRadius: '6px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Anterior
                </button>

                <span style={{ margin: '0 15px', color: '#6b7280' }}>
                  Página {currentPage} de {pagination.pages} ({pagination.total} total)
                </span>

                <button
                  onClick={() => {
                    const newPage = currentPage + 1;
                    setCurrentPage(newPage);
                    loadCondominios(newPage);
                  }}
                  disabled={currentPage === pagination.pages}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    backgroundColor: currentPage === pagination.pages ? '#f3f4f6' : 'white',
                    color: currentPage === pagination.pages ? '#9ca3af' : '#374151',
                    borderRadius: '6px',
                    cursor: currentPage === pagination.pages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Próxima
                </button>
              </div>
            )} */}
          </>
        ) : (
          <div className={styles.formPanel}>
            <div className={styles.formHeader}>
              <div>
                <h1>{editingCondominio ? 'Edit Property' : 'Add New Property'}</h1>
                <p>Complete property information and media</p>
              </div>
              <button
                className={styles.backBtn}
                onClick={() => {
                  setShowForm(false);
                  setEditingCondominio(null);
                  resetForm();
                }}
              >
                <i className="fas fa-arrow-left"></i> Back to List
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.propertyForm}>
              {/* Basic Information Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-info-circle"></i> Basic Information</h2>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="mlsId">MLS ID</label>
                    <input
                      type="text"
                      id="mlsId"
                      name="mlsId"
                      value={formData.mlsId}
                      onChange={handleInputChange}
                      placeholder="A11700727"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="propertyType">Property Type</label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="CONDO">Condominium</option>
                      <option value="LUXURY_CONDO">Luxury Condo</option>
                      <option value="SINGLE_FAMILY">Single Family</option>
                      <option value="TOWNHOUSE">Townhouse</option>
                      <option value="NEW_DEVELOPMENT">New Development</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
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
                    <label htmlFor="categoria">Category</label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {PROPERTY_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                      {/* Updated to include the new category */}
                      <option value="LIFESTYLE_PROPERTIES">Lifestyle Properties</option>
                    </select>
                  </div>

                  {formData.categoria === 'NEIGHBORHOODS' && (
                    <div className={styles.formGroup}>
                      <label htmlFor="bairro">Neighborhood</label>
                      <select
                        id="bairro"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Neighborhood</option>
                        {NEIGHBORHOODS.map((neighborhood) => (
                          <option key={neighborhood.value} value={neighborhood.value}>
                            {neighborhood.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title">Property Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Luxury Brickell Condo with Bay Views"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Experience spectacular bay views from this luxurious condo..."
                  />
                </div>
              </section>

              {/* Address Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-map-marker-alt"></i> Address & Location</h2>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="2101 Brickell Ave #905"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Miami"
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
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="FL"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="33129"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subdivision">Subdivision/Complex</label>
                    <input
                      type="text"
                      id="subdivision"
                      name="subdivision"
                      value={formData.subdivision}
                      onChange={handleInputChange}
                      placeholder="Skyline Condo"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="latitude">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="25.752407"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="longitude">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="-80.198875"
                    />
                  </div>
                </div>
              </section>

              {/* Property Details Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-home"></i> Property Details</h2>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="price">Price ($)</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="495000"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="pricePerSqft">Price per Sq.Ft ($)</label>
                    <input
                      type="number"
                      id="pricePerSqft"
                      name="pricePerSqft"
                      value={formData.pricePerSqft}
                      onChange={handleInputChange}
                      placeholder="570"
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
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      placeholder="1"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="bathrooms">Bathrooms</label>
                    <input
                      type="number"
                      step="0.5"
                      id="bathrooms"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="1"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="halfBathrooms">Half Bathrooms</label>
                    <input
                      type="number"
                      id="halfBathrooms"
                      name="halfBathrooms"
                      value={formData.halfBathrooms}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="sqft">Total Sq.Ft</label>
                    <input
                      type="number"
                      id="sqft"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleInputChange}
                      placeholder="869"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="adjustedSqft">Adjusted Sq.Ft</label>
                    <input
                      type="number"
                      id="adjustedSqft"
                      name="adjustedSqft"
                      value={formData.adjustedSqft}
                      onChange={handleInputChange}
                      placeholder="869"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="yearBuilt">Year Built</label>
                    <input
                      type="number"
                      id="yearBuilt"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      placeholder="2004"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="dateListed">Date Listed</label>
                    <input
                      type="date"
                      id="dateListed"
                      name="dateListed"
                      value={formData.dateListed}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="daysOnMarket">Days on Market</label>
                    <input
                      type="number"
                      id="daysOnMarket"
                      name="daysOnMarket"
                      value={formData.daysOnMarket}
                      onChange={handleInputChange}
                      placeholder="160"
                    />
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-star"></i> Property Features</h2>

                <div className={styles.checkboxGrid}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="furnished"
                      checked={formData.furnished || false}
                      onChange={handleInputChange}
                    />
                    <span>Furnished</span>
                  </label>

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="waterfront"
                      checked={formData.waterfront || false}
                      onChange={handleInputChange}
                    />
                    <span>Waterfront</span>
                  </label>

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="pool"
                      checked={formData.pool || false}
                      onChange={handleInputChange}
                    />
                    <span>Pool</span>
                  </label>

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="parking"
                      checked={formData.parking || false}
                      onChange={handleInputChange}
                    />
                    <span>Parking</span>
                  </label>

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="petFriendly"
                      checked={formData.petFriendly || false}
                      onChange={handleInputChange}
                    />
                    <span>Pet Friendly</span>
                  </label>

                  <label className={`${styles.checkbox} ${styles.starCheckbox}`}>
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured || false}
                      onChange={handleInputChange}
                      className={styles.starInput}
                    />
                    <span className={`${styles.starIcon} ${formData.isFeatured ? styles.starChecked : ''}`}>
                      ⭐
                    </span>
                    Featured Listing
                  </label>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="waterfrontDescription">Waterfront Description</label>
                    <input
                      type="text"
                      id="waterfrontDescription"
                      name="waterfrontDescription"
                      value={formData.waterfrontDescription}
                      onChange={handleInputChange}
                      placeholder="Bayfront"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="parkingSpaces">Parking Spaces</label>
                    <input
                      type="number"
                      id="parkingSpaces"
                      name="parkingSpaces"
                      value={formData.parkingSpaces}
                      onChange={handleInputChange}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="parkingDescription">Parking Description</label>
                  <input
                    type="text"
                    id="parkingDescription"
                    name="parkingDescription"
                    value={formData.parkingDescription}
                    onChange={handleInputChange}
                    placeholder="Covered, One Space"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="interiorFeatures">Interior Features</label>
                  <textarea
                    id="interiorFeatures"
                    name="interiorFeatures"
                    value={formData.interiorFeatures}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Walk In Closets, Stainless Steel Appliances, Wood Floors"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="exteriorFeatures">Exterior Features</label>
                  <textarea
                    id="exteriorFeatures"
                    name="exteriorFeatures"
                    value={formData.exteriorFeatures}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Barbecue, Deck, Balcony"
                  />
                </div>
              </section>

              {/* Financial Information */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-dollar-sign"></i> Financial Information</h2>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="hoaFees">HOA Fees ($)</label>
                    <input
                      type="number"
                      id="hoaFees"
                      name="hoaFees"
                      value={formData.hoaFees}
                      onChange={handleInputChange}
                      placeholder="1001"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="taxAmount">Tax Amount ($)</label>
                    <input
                      type="number"
                      id="taxAmount"
                      name="taxAmount"
                      value={formData.taxAmount}
                      onChange={handleInputChange}
                      placeholder="6186"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="taxYear">Tax Year</label>
                    <input
                      type="number"
                      id="taxYear"
                      name="taxYear"
                      value={formData.taxYear}
                      onChange={handleInputChange}
                      placeholder="2025"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="shortSale">Sale Type</label>
                  <select
                    id="shortSale"
                    name="shortSale"
                    value={formData.shortSale}
                    onChange={handleInputChange}
                  >
                    <option value="Regular Sale">Regular Sale</option>
                    <option value="Short Sale">Short Sale</option>
                    <option value="Foreclosure">Foreclosure</option>
                    <option value="REO">REO</option>
                  </select>
                </div>
              </section>

              {/* PDF Documents Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-file-pdf"></i> PDF Documents</h2>

                <div className={styles.pdfGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="pricingPdf">Pricing PDF</label>
                    <input
                      type="file"
                      id="pricingPdf"
                      name="pricingPdf"
                      accept=".pdf"
                      onChange={handleInputChange}
                      className={styles.fileInput}
                    />
                    <small>Upload pricing document (PDF only, max 10MB)</small>
                    {editingCondominio?.pricingPdf && !pricingPdf && !removePricingPdf && (
                      <div className={styles.currentFile}>
                        <span>Current: {getFileName(editingCondominio.pricingPdf)}</span>
                        <button type="button" onClick={() => removePdf('pricing')} className={styles.removePdfBtn}>
                          <i className="fas fa-times"></i> Remove
                        </button>
                      </div>
                    )}
                    {pricingPdf && (
                      <div className={styles.selectedFile}>
                        <span>Selected: {pricingPdf.name}</span>
                        <button type="button" onClick={() => removePdf('pricing')} className={styles.removePdfBtn}>
                          <i className="fas fa-times"></i> Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="factSheetPdf">Fact Sheet PDF</label>
                    <input
                      type="file"
                      id="factSheetPdf"
                      name="factSheetPdf"
                      accept=".pdf"
                      onChange={handleInputChange}
                      className={styles.fileInput}
                    />
                    <small>Upload fact sheet document (PDF only, max 10MB)</small>
                    {editingCondominio?.factSheetPdf && !factSheetPdf && !removeFactSheetPdf && (
                      <div className={styles.currentFile}>
                        <span>Current: {getFileName(editingCondominio.factSheetPdf)}</span>
                        <button type="button" onClick={() => removePdf('factSheet')} className={styles.removePdfBtn}>
                          <i className="fas fa-times"></i> Remove
                        </button>
                      </div>
                    )}
                    {factSheetPdf && (
                      <div className={styles.selectedFile}>
                        <span>Selected: {factSheetPdf.name}</span>
                        <button type="button" onClick={() => removePdf('factSheet')} className={styles.removePdfBtn}>
                          <i className="fas fa-times"></i> Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="brochurePdf">Brochure PDF</label>
                    <input
                      type="file"
                      id="brochurePdf"
                      name="brochurePdf"
                      accept=".pdf"
                      onChange={handleInputChange}
                      className={styles.fileInput}
                    />
                    <small>Upload brochure document (PDF only, max 10MB)</small>
                    {editingCondominio?.brochurePdf && !brochurePdf && !removeBrochurePdf && (
                      <div className={styles.currentFile}>
                        <span>Current: {getFileName(editingCondominio.brochurePdf)}</span>
                        <button type="button" onClick={() => removePdf('brochure')} className={styles.removePdfBtn}>
                          <i className="fas fa-times"></i> Remove
                        </button>
                      </div>
                    )}
                    {brochurePdf && (
                      <div className={styles.selectedFile}>
                        <span>Selected: {brochurePdf.name}</span>
                        <button type="button" onClick={() => removePdf('brochure')} className={styles.removePdfBtn}>
                          <i className="fas fa-times"></i> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Media Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-camera"></i> Media & Images</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="primaryImage">Main Image</label>
                  <input
                    type="file"
                    id="primaryImage"
                    name="primaryImage"
                    onChange={handleInputChange}
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className={styles.fileInput}
                  />

                  <small>Upload the main property image (JPEG, PNG, WebP)</small>
                  {mainImagePreview && (
                    <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
                      <img
                        src={mainImagePreview}
                        alt="Main image preview"
                        style={{
                          maxWidth: '200px',
                          maxHeight: '150px',
                          objectFit: 'cover',
                          border: '2px solid #3b82f6',
                          borderRadius: '8px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={removeMainImage}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          background: 'rgba(255, 0, 0, 0.8)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '25px',
                          height: '25px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="galleryImages">Gallery Images</label>
                  <input
                    type="file"
                    id="galleryImages"
                    name="galleryImages"
                    onChange={handleInputChange}
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    className={styles.fileInput}
                  />
                  <small>Upload multiple images for the gallery (maximum 50 images)</small>
                  {imagePreviews.length > 0 && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                      gap: '10px',
                      marginTop: '15px',
                      padding: '15px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb'
                    }}>
                      {imagePreviews.map((preview, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                          <img
                            src={preview}
                            alt={`Gallery preview ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '6px',
                              border: '1px solid #d1d5db'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            style={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                              background: 'rgba(239, 68, 68, 0.9)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                              transition: 'all 0.2s ease'
                            }}
                            title="Remover imagem"
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(220, 38, 38, 1)';
                              e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'rgba(239, 68, 68, 0.9)';
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            ×
                          </button>
                          <span style={{
                            position: 'absolute',
                            bottom: '4px',
                            left: '4px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="virtualTour">Virtual Tour URL</label>
                  <input
                    type="url"
                    id="virtualTour"
                    name="virtualTour"
                    value={formData.virtualTour}
                    onChange={handleInputChange}
                    placeholder="https://www.propertypanorama.com/instaview/mia/A11700727"
                  />
                </div>
              </section>

              {/* Amenities Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-swimming-pool"></i> Amenities</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="amenities">Building Amenities</label>
                  <textarea
                    id="amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Pool, Gym, 24-hour Valet, Security, Sauna, Tennis Court, Marina Access, Barbecue Area"
                  />
                  <small>List all building and complex amenities</small>
                </div>
              </section>

              {/* Listing Information */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-user-tie"></i> Listing Information</h2>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="listingAgent">Listing Agent</label>
                    <input
                      type="text"
                      id="listingAgent"
                      name="listingAgent"
                      value={formData.listingAgent}
                      onChange={handleInputChange}
                      placeholder="Agent Name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="listingOffice">Listing Office</label>
                    <input
                      type="text"
                      id="listingOffice"
                      name="listingOffice"
                      value={formData.listingOffice}
                      onChange={handleInputChange}
                      placeholder="C W V Realty Group LLC"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="listingCourtesy">Listing Courtesy</label>
                  <input
                    type="text"
                    id="listingCourtesy"
                    name="listingCourtesy"
                    value={formData.listingCourtesy}
                    onChange={handleInputChange}
                    placeholder="Listing courtesy of: C W V Realty Group LLC"
                  />
                </div>
              </section>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => {
                    setShowForm(false);
                    setEditingCondominio(null);
                    resetForm();
                  }}
                  disabled={loading}
                >
                  <i className="fas fa-times"></i>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  <i className={loading ? "fas fa-spinner fa-spin" : "fas fa-save"}></i>
                  {loading ? 'Saving...' : (editingCondominio ? 'Update Property' : 'Create Property')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notification Modal */}
        {showNotification && (
          <div className={styles.notificationOverlay}>
            <div className={`${styles.notificationModal} ${styles[notificationType]}`}>
              <div className={styles.notificationHeader}>
                <div className={styles.notificationIcon}>
                  <i className={notificationType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'}></i>
                </div>
                <h3>{notificationType === 'success' ? 'Success!' : 'Error!'}</h3>
                <button
                  className={styles.closeNotification}
                  onClick={() => setShowNotification(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className={styles.notificationBody}>
                <p>{notificationMessage}</p>
              </div>
              <div className={styles.notificationActions}>
                <button
                  className={styles.confirmBtn}
                  onClick={() => setShowNotification(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalId && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h5 className="modal-title">
                    <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                    Confirm Deletion
                  </h5>
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to delete this property? This action cannot be undone.</p>
                </div>
                <div className="modal-footer border-0">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setDeleteModalId(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCondominios;
