
import React, { useState, useEffect } from 'react';
import styles from './CategoryFilter.module.css';

const CategoryFilter = ({ onCategorySelect, selectedCategories = [] }) => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch('http://0.0.0.0:5000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        // Mock data
        setCategories([
          { id: '1', name: 'New Developments', color: '#059669', icon: 'fas fa-building' },
          { id: '2', name: 'Luxury Condos', color: '#7c3aed', icon: 'fas fa-crown' },
          { id: '3', name: 'Single Family Homes', color: '#dc2626', icon: 'fas fa-home' },
          { id: '4', name: 'Waterfront Properties', color: '#0891b2', icon: 'fas fa-water' },
          { id: '5', name: 'Golf Course Properties', color: '#16a34a', icon: 'fas fa-golf-ball' },
          { id: '6', name: 'Private & Exclusive', color: '#ea580c', icon: 'fas fa-lock' }
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
    
    onCategorySelect(updatedCategories);
  };

  return (
    <div className={styles.categoryFilter}>
      <button 
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-filter"></i>
        Categories
        {selectedCategories.length > 0 && (
          <span className={styles.badge}>{selectedCategories.length}</span>
        )}
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span>Select Categories</span>
            {selectedCategories.length > 0 && (
              <button 
                className={styles.clearAll}
                onClick={() => onCategorySelect([])}
              >
                Clear All
              </button>
            )}
          </div>

          <div className={styles.categoriesList}>
            {categories.map((category) => (
              <label key={category.id} className={styles.categoryOption}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                />
                <div className={styles.categoryContent}>
                  {category.icon && (
                    <i 
                      className={`${category.icon} ${styles.categoryIcon}`}
                      style={{ color: category.color }}
                    ></i>
                  )}
                  <span className={styles.categoryName}>{category.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
