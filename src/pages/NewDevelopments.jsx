import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './NewDevelopments.module.css';

const NewDevelopments = () => {
  const [selectedCategory, setSelectedCategory] = useState('2');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('map');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data based on the original file
  const ItemSearch = [
    { title: "Rivage Bal Harbour", type_category_id: "2", neighborhood: "Bal Harbour", address: "10441 Collins Ave, Bal Harbour, FL 33154", units: "56", floors: "18", year: "2025" },
    { title: "9900 West", type_category_id: "2", neighborhood: "Bay Harbor", address: "9900 W Bay Harbor Dr, Bay Harbor Islands", units: "44", floors: "12", year: "2024" },
    { title: "Indian Creek Residences & Yacht Club", type_category_id: "2", neighborhood: "Bay Harbor", address: "8810 West Bay Harbor Dr, Bay Harbor Island", units: "32", floors: "10", year: "2025" },
    { title: "La Baia Bay Harbor", type_category_id: "2", neighborhood: "Bay Harbor", address: "9401 E. Bay Harbor Drive, Bay Harbor Island", units: "28", floors: "8", year: "2024" },
    { title: "La Baia North", type_category_id: "2", neighborhood: "Bay Harbor", address: "9451 East Bay Harbor Dr, Bay Harbor Island", units: "36", floors: "11", year: "2025" },
    { title: "La Maré", type_category_id: "2", neighborhood: "Bay Harbor", address: "9927, 9781 E Bay Harbor Dr, Bay Harbor Isla", units: "42", floors: "15", year: "2024" },
    { title: "888 Brickell", type_category_id: "2", neighborhood: "Brickell", address: "888 Brickell Ave, Miami, FL", units: "329", floors: "70", year: "2025" },
    { title: "The Residences at 1428 Brickell", type_category_id: "2", neighborhood: "Brickell", address: "1428 Brickell Ave, Miami, FL", units: "189", floors: "45", year: "2024" },
    { title: "St Regis Residences Miami", type_category_id: "2", neighborhood: "Brickell", address: "1300 Brickell Bay Dr, Miami, FL", units: "221", floors: "52", year: "2025" },
    { title: "Una Residences", type_category_id: "2", neighborhood: "Brickell", address: "175 SW 7th St, Miami, FL", units: "135", floors: "47", year: "2024" }
  ];

  const neighborhoods = [
    { id: "1604", name: "Aventura" },
    { id: "1605", name: "Bal Harbour" },
    { id: "2983", name: "Bay Harbor" },
    { id: "1631", name: "Brickell" },
    { id: "3007", name: "Brickell Key" },
    { id: "1606", name: "Coconut Grove" },
    { id: "1607", name: "Coral Gables" },
    { id: "3008", name: "Downtown Miami" },
    { id: "1633", name: "Edgewater" },
    { id: "2987", name: "Fisher Island" },
    { id: "5053", name: "Fort Lauderdale" },
    { id: "2990", name: "Hallandale" },
    { id: "2995", name: "Hollywood" },
    { id: "1609", name: "Key Biscayne" },
    { id: "3003", name: "Miami" },
    { id: "1637", name: "Miami Beach" },
    { id: "3006", name: "Miami River" },
    { id: "3001", name: "Midtown Miami" },
    { id: "7283", name: "North Miami" },
    { id: "2997", name: "Sunny Isles" },
    { id: "2986", name: "Sunrise" },
    { id: "2992", name: "Surfside" }
  ];

  const filteredBuildings = ItemSearch.filter(building => {
    const matchesCategory = selectedCategory === 'all' || building.type_category_id === selectedCategory;
    const matchesNeighborhood = selectedNeighborhood === 'all' || building.neighborhood === neighborhoods.find(n => n.id === selectedNeighborhood)?.name;
    const matchesSearch = building.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesNeighborhood && matchesSearch;
  });

  const groupedByNeighborhood = filteredBuildings.reduce((acc, building) => {
    if (!acc[building.neighborhood]) {
      acc[building.neighborhood] = [];
    }
    acc[building.neighborhood].push(building);
    return acc;
  }, {});

  return (
    <div className={styles.newDevelopments}>
      <Header />

      <main id="flex-default-theme">
        {/* Breadcrumb */}
        <div className={styles.breadcrumbWrapper}>
          <div className={styles.breadcrumb}>
            <ol>
              <li><a href="/" title="Home">Home</a></li>
              <li>New Developments</li>
            </ol>
          </div>
        </div>

        <div className={styles.mainWrapper}>
          <article className={styles.contentBlock}>
            <h1 className={styles.pageTitle}>New Developments</h1>

            {/* Filters Section */}
            <div className={styles.filtersSection}>
              <div className={styles.filtersContainer}>
                <div className={styles.filterHeader}>
                  <div className={styles.logoWrapper}></div>
                  <div className={styles.headerActions}>
                    <div className={styles.callUs}>Call us: <a href="tel:+1-646-598-3588">+1 (646) 598-3588</a></div>
                    <button className={styles.saveSearch}>Save this Search</button>
                    <button 
                      className={styles.mobileMenuBtn}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <span></span>
                    </button>
                  </div>
                </div>

                <ul className={styles.filtersList}>
                  <li className={styles.searchFilter}>
                    <form className={styles.searchForm}>
                      <input
                        type="search"
                        placeholder="Search Condos"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                      />
                      <div className={styles.searchIcon}>
                        <input type="submit" value="Submit" />
                      </div>
                    </form>
                  </li>

                  <li className={styles.selectFilter}>
                    <select 
                      className={styles.condosSelect}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    >
                      <option value="">Condos by Name</option>
                      {ItemSearch.map((item, index) => (
                        <option key={index} value={item.title}>{item.title}</option>
                      ))}
                    </select>
                  </li>

                  <li className={styles.selectFilter}>
                    <select 
                      className={styles.neighborhoodSelect}
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    >
                      <option value="all">All Neighborhoods</option>
                      {neighborhoods.map(neighborhood => (
                        <option key={neighborhood.id} value={neighborhood.id}>
                          {neighborhood.name}
                        </option>
                      ))}
                    </select>
                  </li>

                  <li className={styles.selectFilter}>
                    <select 
                      className={styles.typeSelect}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Buildings</option>
                      <option value="2">Pre Construction</option>
                      <option value="3">Complete Building</option>
                      <option value="4">Luxury Condos</option>
                    </select>
                  </li>

                  <li className={styles.viewToggle}>
                    <button 
                      className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <span>Grid</span>
                    </button>
                    <button 
                      className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <span>List</span>
                    </button>
                    <button 
                      className={`${styles.viewBtn} ${viewMode === 'map' ? styles.active : ''}`}
                      onClick={() => setViewMode('map')}
                    >
                      <span>Map</span>
                    </button>
                  </li>

                  <li className={styles.filtersToggle}>
                    <button onClick={() => setShowFilters(!showFilters)}>
                      <span className={styles.desktopText}>Filters</span>
                      <span className={styles.closeText}>Close</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sub Filters */}
            <div className={styles.subFilters}>
              <div className={styles.subFiltersWrapper}>
                <ul className={styles.subFiltersList}>
                  <li className={styles.favoritesLink}>
                    <a href="#" title="Save Favorites">
                      <span><span>0</span>Favorites</span>
                    </a>
                  </li>
                  <li className={styles.viewSelect}>
                    <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
                      <option value="grid">Grid</option>
                      <option value="list">List</option>
                      <option value="map">Map</option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>

            {/* Results Section */}
            <section className={`${styles.resultsSection} ${styles[`view-${viewMode}`]}`}>
              <h2 className={styles.resultsTitle}>Search results</h2>
              <div className={styles.resultsWrapper}>
                <div className={styles.resultsList}>
                  {Object.entries(groupedByNeighborhood).map(([neighborhood, buildings]) => (
                    <div key={neighborhood} className={styles.neighborhoodSection}>
                      <h2 className={styles.neighborhoodTitle}>{neighborhood}</h2>

                      {viewMode === 'list' && (
                        <ul className={styles.listHeader}>
                          <li className={styles.columnName}>Building Name</li>
                          <li className={styles.columnAddress}>Address</li>
                          <li className={styles.columnUnits}>Units</li>
                          <li className={styles.columnFloors}>Floor</li>
                          <li className={styles.columnYear}>Year</li>
                        </ul>
                      )}

                      <ul className={styles.buildingsList}>
                        {buildings.map((building, index) => (
                          <li key={index} className={styles.buildingItem}>
                            {viewMode === 'list' ? (
                              <>
                                <div className={styles.buildingName}>
                                  <a href="#" className={styles.buildingLink}>
                                    {building.title}
                                  </a>
                                </div>
                                <div className={styles.buildingAddress}>{building.address}</div>
                                <div className={styles.buildingUnits}>{building.units}</div>
                                <div className={styles.buildingFloors}>{building.floors}</div>
                                <div className={styles.buildingYear}>{building.year}</div>
                              </>
                            ) : viewMode === 'grid' ? (
                              <div className={styles.gridCard}>
                                <div className={styles.cardImage}>
                                  <img 
                                    src="https://via.placeholder.com/300x200/000000/FFFFFF?text=New+Development" 
                                    alt={building.title}
                                  />
                                </div>
                                <div className={styles.cardContent}>
                                  <h3 className={styles.cardTitle}>{building.title}</h3>
                                  <p className={styles.cardAddress}>{building.address}</p>
                                  <div className={styles.cardDetails}>
                                    <span className={styles.cardUnits}>{building.units} Units</span>
                                    <span className={styles.cardFloors}>{building.floors} Floors</span>
                                    <span className={styles.cardYear}>Est. {building.year}</span>
                                  </div>
                                  <div className={styles.cardActions}>
                                    <a href="#" className={styles.viewDetails}>View Details</a>
                                    <a href="#" className={styles.getInfo}>Get Info</a>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.mapCard}>
                                <h3>{building.title}</h3>
                                <p>{building.address}</p>
                                <span>{building.units} units • {building.floors} floors • {building.year}</span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {filteredBuildings.length === 0 && (
                    <div className={styles.noResults}>
                      <div className={styles.errorMessage}>
                        <h3>Ops! Algo deu errado.</h3>
                        <p>Esta página não carregou o Google Maps corretamente. Consulte o console JavaScript para ver detalhes técnicos.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewDevelopments;