
import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, authenticatedFetch } from '../config/apiConfig';
import styles from './CategoryManager.module.css';

const CategoryManager = ({ 
  selectedCategories = [], 
  onCategoriesChange, 
  showAddNew = true,
  label = "Categories"
}) => {
  const [categories, setCategories] = useState([]);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '',
    color: '#3b82f6'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORIES);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        // Mock data for development
        setCategories([
          { id: '1', name: 'New Developments', description: 'Newly built properties', color: '#059669', icon: 'fas fa-building' },
          { id: '2', name: 'Luxury Condos', description: 'High-end condominium properties', color: '#7c3aed', icon: 'fas fa-crown' },
          { id: '3', name: 'Single Family Homes', description: 'Detached single family houses', color: '#dc2626', icon: 'fas fa-home' },
          { id: '4', name: 'Waterfront Properties', description: 'Properties with water access', color: '#0891b2', icon: 'fas fa-water' },
          { id: '5', name: 'Golf Course Properties', description: 'Properties near golf courses', color: '#16a34a', icon: 'fas fa-golf-ball' },
          { id: '6', name: 'Private & Exclusive', description: 'Exclusive luxury properties', color: '#ea580c', icon: 'fas fa-lock' }
        ]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onCategoriesChange(updatedCategories);
  };

  const handleAddNewCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    setLoading(true);
    try {
      const response = await authenticatedFetch(API_ENDPOINTS.CATEGORIES, {
        method: 'POST',
        body: JSON.stringify(newCategory)
      });

      if (response.ok) {
        const category = await response.json();
        setCategories(prev => [...prev, category]);
        setNewCategory({ name: '', description: '', icon: '', color: '#3b82f6' });
        setShowNewCategoryForm(false);
        
        // Auto-select the new category
        onCategoriesChange([...selectedCategories, category.id]);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.categoryManager}>
      <label className={styles.label}>{label}</label>
      
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryItem} ${
              selectedCategories.includes(category.id) ? styles.selected : ''
            }`}
            onClick={() => handleCategoryToggle(category.id)}
          >
            <div className={styles.categoryContent}>
              {category.icon && (
                <i 
                  className={`${category.icon} ${styles.categoryIcon}`}
                  style={{ color: category.color }}
                ></i>
              )}
              <div className={styles.categoryInfo}>
                <span className={styles.categoryName}>{category.name}</span>
                {category.description && (
                  <span className={styles.categoryDescription}>
                    {category.description}
                  </span>
                )}
                {category._count && (
                  <span className={styles.categoryCount}>
                    {category._count.properties} properties
                  </span>
                )}
              </div>
            </div>
            <div className={styles.categoryCheckbox}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => {}}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        ))}
      </div>

      {showAddNew && (
        <div className={styles.addNewSection}>
          {!showNewCategoryForm ? (
            <button
              type="button"
              className={styles.addNewBtn}
              onClick={() => setShowNewCategoryForm(true)}
            >
              <i className="fas fa-plus"></i>
              Add New Category
            </button>
          ) : (
            <form onSubmit={handleAddNewCategory} className={styles.newCategoryForm}>
              <div className={styles.formHeader}>
                <h4>Add New Category</h4>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setShowNewCategoryForm(false)}
                >
                  ×
                </button>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                    title="Category color"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Icon class (e.g., fas fa-building)"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowNewCategoryForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={loading || !newCategory.name.trim()}
                >
                  {loading ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {selectedCategories.length > 0 && (
        <div className={styles.selectedCategories}>
          <span className={styles.selectedLabel}>Selected:</span>
          <div className={styles.selectedTags}>
            {selectedCategories.map(categoryId => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <span
                  key={categoryId}
                  className={styles.selectedTag}
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  {category.name}
                  <button
                    type="button"
                    onClick={() => handleCategoryToggle(categoryId)}
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
  );
};

export default CategoryManager;
