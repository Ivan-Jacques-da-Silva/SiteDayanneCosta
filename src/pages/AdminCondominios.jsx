import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminCondominios.module.css';

import { buildApiUrl } from '../config/api';

const AdminCondominios = () => {
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
    mainCategory: '',
    subcategories: [],

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
    mainImage: null,
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
    petFriendly: false,

    // Category fields
    categoryId: '',
    subcategoryName: ''
  });

  const [mainCategories, setMainCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [customSubcategory, setCustomSubcategory] = useState('');
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadCondominios();
    loadCategories(); // Load categories on component mount
  }, []);

  useEffect(() => {
    if (formData.mainCategory) {
      const subcats = allCategories.filter(cat =>
        cat.parentId === formData.mainCategory && !cat.isMainCategory
      );
      setAvailableSubcategories(subcats);
    } else {
      setAvailableSubcategories([]);
    }
  }, [formData.mainCategory, allCategories]);

  const loadCategories = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/categories/all'));
      if (response.ok) {
        const categoriesData = await response.json();
        setAllCategories(categoriesData);
        setMainCategories(categoriesData.filter(cat => cat.isMainCategory));
        setCategories(categoriesData.filter(cat => !cat.isMainCategory)); // Set general categories for the new form field
      } else {
        console.error('Failed to load categories');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadCondominios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/properties'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Ensure data is always an array
        setCondominios(Array.isArray(data) ? data : []);
      } else if (response.status === 404) {
        // Handle case where no properties are found
        setCondominios([]);
      } else {
        // Mock data for development if API fails or is unavailable
        console.warn('API call failed or returned non-OK status. Using mock data.');
        setCondominios([
          {
            id: 1,
            title: 'Luxury Brickell Condo',
            address: '2101 Brickell Ave #905',
            city: 'Miami',
            state: 'FL',
            zipCode: '33129',
            price: 495000,
            bedrooms: 1,
            bathrooms: 1,
            sqft: 869,
            status: 'ACTIVE',
            mlsId: 'A11700727',
            description: 'Experience spectacular bay views from this luxurious 1-bedroom, 1-bathroom condo...',
            yearBuilt: 2004,
            subdivision: 'Skyline Condo',
            hoaFees: 1001,
            taxAmount: 6186,
            taxYear: 2024,
            waterfront: true,
            furnished: true,
            parkingSpaces: 1,
            amenities: 'Elevators, Barbecue, Deck, Marina Access, Gym, 24-hour Valet, Security, Sauna, Tennis Court',
            categories: ['luxuryCondos', 'waterfront'] // This property might have categories associated
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      // Fallback to mock data if fetch fails entirely
      console.warn('Fetch failed. Using mock data.');
      setCondominios([
        {
          id: 1,
          title: 'Luxury Brickell Condo',
          address: '2101 Brickell Ave #905',
          city: 'Miami',
          state: 'FL',
          zipCode: '33129',
          price: 495000,
          bedrooms: 1,
          bathrooms: 1,
          sqft: 869,
          status: 'ACTIVE',
          mlsId: 'A11700727',
          description: 'Experience spectacular bay views from this luxurious 1-bedroom, 1-bathroom condo...',
          yearBuilt: 2004,
          subdivision: 'Skyline Condo',
          hoaFees: 1001,
          taxAmount: 6186,
          taxYear: 2024,
          waterfront: true,
          furnished: true,
          parkingSpaces: 1,
          amenities: 'Elevators, Barbecue, Deck, Marina Access, Gym, 24-hour Valet, Security, Sauna, Tennis Court',
          categories: ['luxuryCondos', 'waterfront']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // Create FormData for file uploads
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          if (key === 'mainImage' && formData[key]) {
            formDataToSend.append('mainImage', formData[key]);
          } else if (key === 'galleryImages' && formData[key].length > 0) {
            formData[key].forEach((file, index) => {
              formDataToSend.append(`galleryImage_${index}`, file);
            });
          } else if (key === 'subcategories' && Array.isArray(formData[key])) {
            formData[key].forEach((category, index) => {
              formDataToSend.append(`subcategories_${index}`, category);
            });
          }
          else if (typeof formData[key] === 'boolean') {
            formDataToSend.append(key, formData[key]);
          }
          else if (key !== 'subcategories') { // Ensure subcategories array is not appended directly if it's already handled
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Add property type and country if not already handled by formData
      if (!formData.propertyType) formDataToSend.append('propertyType', 'CONDO');
      if (!formData.country) formDataToSend.append('country', 'USA');

      // Add images if any were selected
      selectedImages.forEach((image, index) => {
        formDataToSend.append('images', image); // Assuming the backend expects 'images' for gallery
      });

      let response;
      const url = editingCondominio
        ? buildApiUrl(`/api/admin/properties/${editingCondominio.id}`)
        : buildApiUrl('/api/admin/properties');

      if (editingCondominio) {
        // Update existing property
        console.log('Updating condominio:', formData);
        response = await fetch(url, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataToSend
        });
        if (!response.ok) throw new Error('Failed to update property');
      } else {
        // Create new property
        console.log('Creating condominio:', formData);
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataToSend
        });
        if (!response.ok) {
          const error = await response.json();
          console.error("API Error:", error);
          throw new Error(error.error || 'Failed to create property');
        }
        const property = await response.json(); // Assuming the response contains the created property data

        // Create subcategory if provided and a main category is selected
        if (formData.subcategoryName && formData.mainCategory) {
          try {
            await fetch(buildApiUrl('/api/categories/subcategory'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                name: formData.subcategoryName,
                parentId: formData.mainCategory, // Use mainCategory as parentId
                description: `Custom subcategory for ${formData.subcategoryName.trim()}`
              })
            });
            // Note: The newly created subcategory might not be immediately available in allCategories list without a re-fetch.
          } catch (error) {
            console.error('Error creating subcategory:', error);
            // Optionally show an error to the user
          }
        }

        // Associate property with selected main category
        if (formData.mainCategory) {
          try {
            await fetch(buildApiUrl('/api/properties/category'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                propertyId: property.id,
                categoryId: formData.mainCategory
              })
            });
          } catch (error) {
            console.error('Error associating property with category:', error);
            // Optionally show an error to the user
          }
        }
        // Associate property with selected subcategories
        if (formData.subcategories && formData.subcategories.length > 0) {
          for (const subcategoryId of formData.subcategories) {
            try {
              await fetch(buildApiUrl('/api/properties/category'), { // Reusing category endpoint for subcategories
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  propertyId: property.id,
                  categoryId: subcategoryId
                })
              });
            } catch (error) {
              console.error(`Error associating property with subcategory ${subcategoryId}:`, error);
            }
          }
        }
      }

      setShowForm(false);
      setEditingCondominio(null);
      resetForm();
      loadCondominios();
    } catch (error) {
      console.error('Error saving condominio:', error);
      alert(`Failed to save property: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      if (name === 'mainImage') {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
        // Update image previews for main image
        if (files[0]) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData(prev => ({ ...prev, mainImagePreview: reader.result }));
          };
          reader.readAsDataURL(files[0]);
        } else {
          setFormData(prev => ({ ...prev, mainImagePreview: null }));
        }
      } else if (name === 'galleryImages') {
        const selectedFiles = Array.from(files);
        setFormData(prev => ({ ...prev, galleryImages: selectedFiles }));

        // Update image previews for gallery images
        const previews = selectedFiles.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        });
        Promise.all(previews).then(results => setImagePreviews(results));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setFormData(prev => ({
      ...prev,
      subcategories: prev.subcategories?.includes(subcategoryId)
        ? prev.subcategories.filter(id => id !== subcategoryId)
        : [...(prev.subcategories || []), subcategoryId]
    }));
  };

  const handleAddCustomSubcategory = async () => {
    if (!customSubcategory.trim() || !formData.mainCategory) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/categories/subcategory'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: customSubcategory.trim(),
          parentId: formData.mainCategory,
          description: `Custom subcategory for ${customSubcategory.trim()}`
        }),
      });

      if (response.ok) {
        const newSubcategory = await response.json();
        setAllCategories(prev => [...prev, newSubcategory]);
        setFormData(prev => ({
          ...prev,
          subcategories: [...(prev.subcategories || []), newSubcategory.id]
        }));
        setCustomSubcategory('');
      } else {
        const error = await response.json();
        alert(error.error || 'Error creating subcategory');
      }
    } catch (error) {
      console.error('Error creating subcategory:', error);
      alert('Error creating subcategory');
    }
  };

  const handleRemoveSubcategory = (subcategoryId) => {
    setFormData(prev => ({
      ...prev,
      subcategories: prev.subcategories?.filter(id => id !== subcategoryId) || []
    }));
  };

  const resetForm = () => {
    setFormData({
      mlsId: '',
      title: '',
      description: '',
      propertyType: 'CONDO',
      status: 'ACTIVE',
      mainCategory: '',
      subcategories: [],
      address: '',
      city: '',
      state: 'FL',
      zipCode: '',
      neighborhood: '',
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
      mainImage: null,
      galleryImages: [],
      virtualTour: '',
      amenities: '',
      listingCourtesy: '',
      listingAgent: '',
      listingOffice: '',
      shortSale: 'Regular Sale',
      newConstruction: false,
      petFriendly: false,
      categoryId: '',
      subcategoryName: ''
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setSelectedCategory(null);
  };

  const handleEdit = (condominio) => {
    setEditingCondominio(condominio);
    // Ensure subcategories are correctly mapped if they exist in the fetched data
    const selectedSubcategories = condominio.subcategories ? condominio.subcategories.map(sub => typeof sub === 'string' ? sub : sub.id) : [];

    setFormData({
      ...condominio,
      mainImage: null, // Reset file input on edit
      galleryImages: [], // Reset file input on edit
      subcategories: selectedSubcategories,
      mainCategory: condominio.mainCategory || '', // Ensure mainCategory is set
      categoryId: condominio.categoryId || '', // Set categoryId if available
      subcategoryName: '' // Reset custom subcategory name on edit
    });

    // Find and set the selected category based on fetched data
    if (condominio.categoryId) {
      const category = categories.find(cat => cat.id === condominio.categoryId);
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this condominium?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(buildApiUrl(`/api/admin/properties/${id}`), {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        loadCondominios(); // Reload to reflect deletion
      } catch (error) {
        console.error('Error deleting condominio:', error);
        alert('Error deleting property.');
      }
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === '') return '';
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(price);
    } catch (e) {
      console.error("Error formatting price:", price, e);
      return price; // Return original value if formatting fails
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

            <div className={styles.condominiosList}>
              {Array.isArray(condominios) && condominios.length > 0 ? condominios.map((condominio) => (
                <div key={condominio.id || Math.random()} className={styles.condominioCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3>{condominio.title}</h3>
                      <p className={styles.address}>{condominio.address}, {condominio.city} - {condominio.state} {condominio.zipCode}</p>
                      <p className={styles.mlsId}>MLS: {condominio.mlsId}</p>
                    </div>
                    <div className={styles.cardActions}>
                      <span className={styles.price}>{formatPrice(condominio.price)}</span>
                      <span className={`${styles.status} ${styles[condominio.status.toLowerCase()]}`}>
                        {condominio.status}
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
                    <div className={styles.propertyDetails}>
                      <span><i className="fas fa-bed"></i> {condominio.bedrooms} Beds</span>
                      <span><i className="fas fa-bath"></i> {condominio.bathrooms} Baths</span>
                      <span><i className="fas fa-ruler-combined"></i> {condominio.sqft} Sq.Ft</span>
                      <span><i className="fas fa-calendar"></i> Built {condominio.yearBuilt}</span>
                    </div>
                    <p className={styles.description}>{condominio.description ? condominio.description.substring(0, 150) : ''}...</p>
                    <div className={styles.features}>
                      {condominio.waterfront && <span className={styles.feature}>Waterfront</span>}
                      {condominio.furnished && <span className={styles.feature}>Furnished</span>}
                      {condominio.pool && <span className={styles.feature}>Pool</span>}
                    </div>
                    {/* Display associated categories */}
                    {condominio.categories && condominio.categories.length > 0 && (
                      <div className={styles.categories}>
                        <strong>Categories:</strong>
                        {condominio.categories.map((cat, index) => (
                          <span key={index} className={styles.categoryTag}>{cat}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <div className={styles.emptyState}>
                  <p>No properties found. Click "Add New Property" to add your first one.</p>
                </div>

              )}
            </div>
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
                onClick={() => setShowForm(false)}
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

                <div className={styles.formGroup}>
                  <label>Main Category</label>
                  <select
                    name="mainCategory"
                    value={formData.mainCategory || ''}
                    onChange={(e) => {
                      handleInputChange(e); // Update formData.mainCategory
                      const selectedCat = mainCategories.find(cat => cat.id === e.target.value);
                      setSelectedCategory(selectedCat);
                    }}
                    className={styles.selectInput}
                    required
                  >
                    <option value="">Select Main Category</option>
                    {mainCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Subcategories</label>
                  <div className={styles.subcategoryContainer}>
                    {formData.mainCategory && availableSubcategories.length > 0 && (
                      <div className={styles.checkboxGrid}>
                        {availableSubcategories.map((subcategory) => (
                          <label key={subcategory.id} className={styles.checkbox}>
                            <input
                              type="checkbox"
                              checked={formData.subcategories?.includes(subcategory.id) || false}
                              onChange={() => handleSubcategoryChange(subcategory.id)}
                            />
                            <span>{subcategory.name}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    <div className={styles.customSubcategoryInput}>
                      <input
                        type="text"
                        placeholder="Add custom subcategory"
                        value={customSubcategory}
                        onChange={(e) => setCustomSubcategory(e.target.value)}
                        className={styles.textInput}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomSubcategory}
                        className={styles.addButton}
                        disabled={!customSubcategory.trim() || !formData.mainCategory}
                      >
                        Add
                      </button>
                    </div>

                    {formData.subcategories && formData.subcategories.length > 0 && (
                      <div className={styles.selectedSubcategories}>
                        <small>Selected subcategories:</small>
                        <div className={styles.tagContainer}>
                          {formData.subcategories.map((subId) => {
                            const sub = allCategories.find(c => c.id === subId);
                            return sub ? (
                              <span key={subId} className={styles.tag}>
                                {sub.name}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSubcategory(subId)}
                                  className={styles.removeTag}
                                >
                                  ×
                                </button>
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <small>Select existing subcategories or add custom ones</small>
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
                    <label htmlFor="neighborhood">Neighborhood</label>
                    <input
                      type="text"
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Brickell"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
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

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="newConstruction"
                      checked={formData.newConstruction || false}
                      onChange={handleInputChange}
                    />
                    <span>New Construction</span>
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
                      placeholder="2024"
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

              {/* Media Section */}
              <section className={styles.formSection}>
                <h2><i className="fas fa-camera"></i> Media & Images</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="mainImage">Main Property Image</label>
                  <input
                    type="file"
                    id="mainImage"
                    name="mainImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    className={styles.fileInput}
                  />
                  <small>Upload the main image for this property</small>
                  {formData.mainImagePreview && (
                    <img src={formData.mainImagePreview} alt="Main Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="galleryImages">Gallery Images</label>
                  <input
                    type="file"
                    id="galleryImages"
                    name="galleryImages"
                    onChange={handleInputChange}
                    accept="image/*"
                    multiple
                    className={styles.fileInput}
                  />
                  <small>Upload multiple images for the property gallery</small>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`Gallery Preview ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    ))}
                  </div>
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
                  onClick={() => setShowForm(false)}
                  className={styles.cancelBtn}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  <i className="fas fa-save"></i> {editingCondominio ? 'Update Property' : 'Create Property'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCondominios;