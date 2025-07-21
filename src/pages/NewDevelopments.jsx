
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './NewDevelopments.module.css';

const NewDevelopments = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondo, setSelectedCondo] = useState('0');

  // Lista completa de desenvolvimentos
  const itemSearch = [
    { title: "Artech Residences at Aventura", type_category_id: "3" },
    { title: "Turnberry Village South Tower Aventura", type_category_id: "3" },
    { title: "South Tower Point Aventura", type_category_id: "3" },
    { title: "Porto Vita North", type_category_id: "3" },
    { title: "Porto Vita South", type_category_id: "3" },
    { title: "The Parc", type_category_id: "3" },
    { title: "The Peninsula Aventura", type_category_id: "3" },
    { title: "The Peninsula One Aventura", type_category_id: "3" },
    { title: "The Peninsula Two Aventura", type_category_id: "3" },
    { title: "Turnberry On The Green", type_category_id: "3" },
    { title: "Rivage Bal Harbour", type_category_id: "2" },
    { title: "St Regis Bal Harbour", type_category_id: "3" },
    { title: "La Maré", type_category_id: "2" },
    { title: "Indian Creek Residences & Yacht Club", type_category_id: "2" },
    { title: "La Baia Bay Harbor", type_category_id: "2" },
    { title: "The Well", type_category_id: "2" },
    { title: "888 Brickell", type_category_id: "2" },
    { title: "The Residences at 1428 Brickell", type_category_id: "2" },
    { title: "St Regis Residences Miami", type_category_id: "2" },
    { title: "Una Residences", type_category_id: "2" },
    { title: "2200 Brickell", type_category_id: "2" },
    { title: "Residences at Mandarin Oriental", type_category_id: "2" },
    { title: "Vita Residences Grove Isle", type_category_id: "2" },
    { title: "Mr. C Residences", type_category_id: "2" },
    { title: "Four Seasons Residences Coconut Grove", type_category_id: "2" },
    { title: "Tigertail Mr C Residences", type_category_id: "2" },
    { title: "719 Biltmore Way", type_category_id: "2" },
    { title: "Edition Residences Edgewater", type_category_id: "2" },
    { title: "Villa Miami", type_category_id: "2" },
    { title: "Six Fisher Island", type_category_id: "2" },
    { title: "The Residences at Pier Sixty-Six Fort Lauderdale", type_category_id: "2" },
    { title: "Sixth and Rio", type_category_id: "2" },
    { title: "Serene", type_category_id: "2" },
    { title: "Andare Residences", type_category_id: "2" },
    { title: "The Terraces", type_category_id: "2" },
    { title: "Selene", type_category_id: "2" },
    { title: "Shell Bay Residences", type_category_id: "2" },
    { title: "Continumm Club and Residences", type_category_id: "2" },
    { title: "Aria Reserve", type_category_id: "2" },
    { title: "Standard Residences", type_category_id: "2" },
    { title: "Aston Martin Residences", type_category_id: "2" },
    { title: "Casa Bella Residences", type_category_id: "2" },
    { title: "Cipriani Residences", type_category_id: "2" },
    { title: "Mercedes Benz Places", type_category_id: "2" },
    { title: "Shore Club Miami Beach", type_category_id: "2" },
    { title: "Ritz Carlton Residences South Beach", type_category_id: "2" },
    { title: "The Perigon", type_category_id: "2" },
    { title: "Twenty Nine Indian Creek", type_category_id: "2" },
    { title: "72 Park", type_category_id: "2" },
    { title: "St Regis Sunny Isles", type_category_id: "2" },
    { title: "Bentley Residences", type_category_id: "2" },
    { title: "Surf Row Residences Surfside", type_category_id: "2" }
  ];

  const neighborhoods = [
    { value: '1604', label: 'Aventura' },
    { value: '1605', label: 'Bal Harbour' },
    { value: '2983', label: 'Bay Harbor' },
    { value: '1631', label: 'Brickell' },
    { value: '3007', label: 'Brickell Key' },
    { value: '1606', label: 'Coconut Grove' },
    { value: '1607', label: 'Coral Gables' },
    { value: '3008', label: 'Downtown Miami' },
    { value: '1633', label: 'Edgewater' },
    { value: '2987', label: 'Fisher Island' },
    { value: '5053', label: 'Fort Lauderdale' },
    { value: '2990', label: 'Hallandale' },
    { value: '2995', label: 'Hollywood' },
    { value: '1609', label: 'Key Biscayne' },
    { value: '3003', label: 'Miami Beach' },
    { value: '1637', label: 'North Miami Beach' },
    { value: '3006', label: 'Sunny Isles Beach' },
    { value: '3001', label: 'Surfside' }
  ];

  // Filtros de categoria
  const categoryMap = {
    "Pre Construction": "2",
    "Complete Building": "3",
    "Luxury Condos": "4"
  };

  // Desenvolvedores filtrados baseados na categoria selecionada
  const buildingsWithCategory = useMemo(() => {
    if (selectedCategory !== "all") {
      return itemSearch
        .filter(item => item.type_category_id === selectedCategory)
        .map(item => item.title);
    } else {
      return itemSearch.map(item => item.title);
    }
  }, [selectedCategory]);

  // Filtros de autocomplete baseados na pesquisa
  const filteredCondos = useMemo(() => {
    if (!searchTerm) return [];
    return buildingsWithCategory.filter(building => 
      building.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  }, [searchTerm, buildingsWithCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchTerm);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedCondo('0');
  };

  const handleNeighborhoodChange = (e) => {
    setSelectedNeighborhood(e.target.value);
  };

  const handleCondoSelect = (e) => {
    setSelectedCondo(e.target.value);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      {/* Breadcrumb */}
      <div className={styles.breadcrumbWrapper}>
        <div className={styles.breadcrumb}>
          <ol>
            <li><a href="/" title="Home">Home</a></li>
            <li>New Developments</li>
          </ol>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.container}>
          <article className={styles.content}>
            {/* Page Title */}
            <h1 className={styles.titleBlock}>New Developments</h1>

            {/* Filter Section */}
            <div className={styles.filterOverlay}></div>
            <div className={styles.wrapPageIdx}>
              <div className={styles.contentFilters}>
                <div className={styles.filtersBox}>
                  <div className={styles.filtersContainer}>
                    
                    {/* Header Filters */}
                    <div className={styles.headerFilters}>
                      <div className={styles.logoWeb}></div>
                      <div className={styles.textWrapper}>
                        <div className={styles.callUs}>
                          Call us: <a href="tel:+1-646-598-3588">+1 (646) 598-3588</a>
                        </div>
                        <button className={styles.saveSearch}>Save this Search</button>
                        <button className={styles.mobileMenuBtn}>
                          <span></span>
                        </button>
                      </div>
                    </div>

                    {/* Filter Controls */}
                    <ul className={styles.activeSelect}>
                      {/* Search Input */}
                      <li className={styles.miniSearch}>
                        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                          <label className={styles.hidden} htmlFor="autocomplete-ajax">
                            Search Condos
                          </label>
                          <input
                            className={styles.searchBuilding}
                            id="autocomplete-ajax"
                            name="search_building"
                            placeholder="Search Condos"
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <span className={styles.lineForm}></span>
                          <div className={styles.searchIcon}>
                            <input type="submit" value="Submit" />
                          </div>
                        </form>
                        
                        {/* Autocomplete Results */}
                        {filteredCondos.length > 0 && (
                          <div className={styles.autocompleteResults}>
                            {filteredCondos.map((condo, index) => (
                              <div key={index} className={styles.autocompleteItem}>
                                {condo}
                              </div>
                            ))}
                          </div>
                        )}
                      </li>

                      {/* Condos by Name Select */}
                      <li className={styles.contentSelect}>
                        <label className={styles.hidden} htmlFor="fm-condos_select">
                          Condos by Name
                        </label>
                        <select
                          className={styles.condosSelect}
                          id="fm-condos_select"
                          name="condos_select"
                          value={selectedCondo}
                          onChange={handleCondoSelect}
                        >
                          <option value="0">Condos by Name</option>
                          {buildingsWithCategory.map((building, index) => (
                            <option key={index} value={building}>
                              {building}
                            </option>
                          ))}
                        </select>
                      </li>

                      {/* Neighborhoods Select */}
                      <li className={styles.contentSelect}>
                        <label className={styles.hidden} htmlFor="fm-neighborhood_select">
                          All Neighborhoods
                        </label>
                        <select
                          className={styles.neighborhoodSelect}
                          id="fm-neighborhood_select"
                          name="neighborhood_select"
                          value={selectedNeighborhood}
                          onChange={handleNeighborhoodChange}
                        >
                          <option value="all">All Neighborhoods</option>
                          {neighborhoods.map((neighborhood) => (
                            <option key={neighborhood.value} value={neighborhood.value}>
                              {neighborhood.label}
                            </option>
                          ))}
                        </select>
                      </li>

                      {/* Category Filter */}
                      <li className={styles.contentSelect}>
                        <label className={styles.hidden} htmlFor="fm-type_search">
                          Development Type
                        </label>
                        <select
                          className={styles.typeSelect}
                          id="fm-type_search"
                          name="type_search"
                          value={selectedCategory}
                          onChange={handleCategoryChange}
                        >
                          <option value="all">All Types</option>
                          <option value="2">Pre Construction</option>
                          <option value="3">Complete Building</option>
                          <option value="4">Luxury Condos</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className={styles.resultsSection}>
              <div className={styles.resultsHeader}>
                <h2>
                  {selectedCategory === 'all' ? 'All' : 
                   selectedCategory === '2' ? 'Pre Construction' :
                   selectedCategory === '3' ? 'Complete Building' : 'Luxury Condos'} 
                  {' '}New Developments
                </h2>
                <p>
                  Showing {buildingsWithCategory.length} developments
                  {selectedNeighborhood !== 'all' && 
                    ` in ${neighborhoods.find(n => n.value === selectedNeighborhood)?.label}`
                  }
                </p>
              </div>

              {/* Development Grid */}
              <div className={styles.developmentGrid}>
                {buildingsWithCategory.map((building, index) => (
                  <div key={index} className={styles.developmentCard}>
                    <div className={styles.cardImage}>
                      <img 
                        src={`https://idxboost-single-property.s3.amazonaws.com/25209957c98057eabecf846e81647334/placeholder-${(index % 6) + 1}.jpg`}
                        alt={building}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/f0f0f0/666?text=Development';
                        }}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{building}</h3>
                      <div className={styles.cardDetails}>
                        <span className={styles.cardType}>
                          {selectedCategory === '2' ? 'Pre Construction' :
                           selectedCategory === '3' ? 'Complete Building' : 'Luxury Development'}
                        </span>
                      </div>
                      <div className={styles.cardActions}>
                        <button className={styles.viewDetails}>View Details</button>
                        <button className={styles.getInfo}>Get Info</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {buildingsWithCategory.length === 0 && (
                <div className={styles.noResults}>
                  <p>No developments found matching your criteria.</p>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewDevelopments;
