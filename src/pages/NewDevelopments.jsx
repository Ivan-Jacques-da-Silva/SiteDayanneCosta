
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './NewDevelopments.module.css';

const NewDevelopments = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');

  // Sample data based on the original file
  const ItemSearch = [
    { 
      title: "Rivage Bal Harbour", 
      type_category_id: "2", 
      neighborhood: "Bal Harbour", 
      address: "10441 Collins Ave, Bal Harbour, FL 33154", 
      units: "56", 
      floors: "18", 
      year: "2025",
      status: "Private Exclusive",
      image: "https://via.placeholder.com/150x100/333/FFFFFF?text=COMING+SOON"
    },
    { 
      title: "9900 West", 
      type_category_id: "2", 
      neighborhood: "Bay Harbor", 
      address: "9900 W Bay Harbor Dr, Bay Harbor Islands", 
      units: "44", 
      floors: "12", 
      year: "2024",
      status: "Private Exclusive",
      image: "https://via.placeholder.com/150x100/333/FFFFFF?text=COMING+SOON"
    },
    { 
      title: "Indian Creek Residences & Yacht Club", 
      type_category_id: "2", 
      neighborhood: "Bay Harbor", 
      address: "8810 West Bay Harbor Dr, Bay Harbor Island", 
      units: "32", 
      floors: "10", 
      year: "2025",
      status: "Private Exclusive",
      image: "https://via.placeholder.com/150x100/333/FFFFFF?text=COMING+SOON"
    },
    { 
      title: "La Baia Bay Harbor", 
      type_category_id: "2", 
      neighborhood: "Bay Harbor", 
      address: "9401 E. Bay Harbor Drive, Bay Harbor Island", 
      units: "28", 
      floors: "8", 
      year: "2024",
      status: "Private Exclusive",
      image: "https://via.placeholder.com/150x100/333/FFFFFF?text=COMING+SOON"
    },
    { 
      title: "La Baia North", 
      type_category_id: "2", 
      neighborhood: "Bay Harbor", 
      address: "9451 East Bay Harbor Dr, Bay Harbor Island", 
      units: "36", 
      floors: "11", 
      year: "2025",
      status: "Private Exclusive",
      image: "https://via.placeholder.com/150x100/333/FFFFFF?text=COMING+SOON"
    },
    { 
      title: "La Maré", 
      type_category_id: "2", 
      neighborhood: "Bay Harbor", 
      address: "9927, 9781 E Bay Harbor Dr, Bay Harbor Isla", 
      units: "42", 
      floors: "15", 
      year: "2024",
      status: "Private Exclusive",
      image: "https://via.placeholder.com/150x100/333/FFFFFF?text=COMING+SOON"
    },
    { 
      title: "Onda Residences", 
      type_category_id: "2", 
      neighborhood: "Bay Harbor", 
      address: "1142 Stillwater Dr, Bay Harbor Islands, FL 33314", 
      units: "24", 
      floors: "6", 
      year: "2025",
      status: "Private Exclusive",
      image: "https://via.placeholder.com/150x100/333/FFFFFF?text=COMING+SOON"
    }
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

      <main className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbContent}>
            <ol>
              <li><a href="/" title="Home">Home</a></li>
              <li>New Developments</li>
            </ol>
          </div>
        </div>

        <div className={styles.contentBlock}>
          <h1 className={styles.titleBlock}>New Developments</h1>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterContent}>
            <ul className={styles.filters}>
              <li className={styles.miniSearch}>
                <form className={styles.searchForm}>
                  <input
                    className={styles.searchBuilding}
                    placeholder="Search Condos"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className={styles.searchSubmit}>
                    <span className={styles.searchIcon}>🔍</span>
                  </button>
                </form>
              </li>

              <li className={styles.filterItem}>
                <select 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.selectFilter}
                >
                  <option value="">Condos by Name</option>
                  {ItemSearch.map((item, index) => (
                    <option key={index} value={item.title}>{item.title}</option>
                  ))}
                </select>
              </li>

              <li className={styles.filterItem}>
                <select 
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className={styles.selectFilter}
                >
                  <option value="all">All Neighborhoods</option>
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood.id} value={neighborhood.id}>
                      {neighborhood.name}
                    </option>
                  ))}
                </select>
              </li>

              <li className={styles.viewModeButtons}>
                <button 
                  className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button 
                  className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button 
                  className={`${styles.viewButton} ${viewMode === 'map' ? styles.active : ''}`}
                  onClick={() => setViewMode('map')}
                >
                  Map
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Layout Container */}
        <div className={styles.wrapPageIdx}>
          <div className={styles.contentFilters}>
            {/* Map Section */}
            <div className={styles.mapContainer}>
              <div className={styles.mapError}>
                <div className={styles.errorIcon}>⚠️</div>
                <h3>Ops! Algo deu errado.</h3>
                <p>Esta página não carregou o Google Maps corretamente. Consulte o console JavaScript para ver detalhes técnicos.</p>
              </div>
            </div>

            {/* Properties List */}
            <div className={styles.propertiesList}>
              {Object.entries(groupedByNeighborhood).map(([neighborhood, buildings]) => (
                <div key={neighborhood} className={styles.neighborhoodSection}>
                  <h2 className={styles.neighborhoodTitle}>{neighborhood}</h2>

                  {buildings.map((building, index) => (
                    <div key={index} className={styles.propertyCard}>
                      <div className={styles.propertyContent}>
                        <div className={styles.propertyImageContainer}>
                          <img src={building.image} alt={building.title} className={styles.propertyImage} />
                        </div>

                        <div className={styles.propertyInfo}>
                          <h3 className={styles.propertyTitle}>{building.title}</h3>
                          <p className={styles.propertyAddress}>{building.address}</p>
                        </div>

                        <div className={styles.propertyActions}>
                          <button className={styles.favoriteButton}>♡</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {filteredBuildings.length === 0 && (
                <div className={styles.noResults}>
                  <p>Nenhum resultado encontrado para os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewDevelopments;
