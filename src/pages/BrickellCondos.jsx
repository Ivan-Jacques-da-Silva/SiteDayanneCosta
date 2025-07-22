import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BrickellCondos.module.css';

const BrickellCondos = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    sortBy: 'price-desc'
  });

  // Fetch data from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/brickell-condos-1m');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.erro) {
        throw new Error(data.detalhes || 'Erro ao carregar propriedades');
      }

      setProperties(data);
    } catch (err) {
      console.error('Erro ao buscar propriedades:', err);
      setError(err.message);
      // Fallback to sample data in case of error
      setProperties(sampleProperties);
    } finally {
      setLoading(false);
    }
  };

  // Sample data as fallback
  const sampleProperties = [
    {
      id: "A11661732",
      price: "$33,850,900",
      address: "1420 S Miami Ave #PH3",
      city: "Miami, FL 33130",
      beds: "5",
      baths: "6",
      sqft: "6,144",
      status: "Active",
      daysOnMarket: 229,
      image: "https://th-fl-photos-static.idxboost.us/32/A11661732_x600.jpeg",
      development: "Cipriani Residences",
      pricePerSqft: "$5,510"
    },
    {
      id: "A11673121",
      price: "$31,760,000",
      address: "99 SE 5th St #UPH7201",
      city: "Miami, FL 33131",
      beds: "5",
      baths: "9",
      sqft: "9,074",
      status: "Active",
      daysOnMarket: 210,
      image: "https://th-fl-photos-static.idxboost.us/21/A11673121_x600.jpeg",
      development: "Baccarat Residences",
      pricePerSqft: "$3,500"
    },
    {
      id: "A11768732",
      price: "$30,000,000",
      address: "900 Brickell Key Blvd #3403",
      city: "Miami, FL 33131",
      beds: "4",
      baths: "5",
      sqft: "5,867",
      status: "Active",
      daysOnMarket: 40,
      image: "https://th-fl-photos-static.idxboost.us/32/A11768732_x600.jpeg",
      development: "Asia Condo",
      pricePerSqft: "$5,113"
    },
    {
      id: "A11781790",
      price: "$19,500,000",
      address: "1425 Brickell Ave #PH4BCD",
      city: "Miami, FL 33131",
      beds: "2",
      baths: "3",
      sqft: "5,798",
      status: "Active",
      daysOnMarket: 19,
      image: "https://th-fl-photos-static.idxboost.us/90/A11781790_x600.jpeg",
      development: "Four Seasons Residences",
      pricePerSqft: "$3,363"
    },
    {
      id: "A11616031",
      price: "$18,000,000",
      address: "1643 Brickell Ave #PH4901",
      city: "Miami, FL 33129",
      beds: "4",
      baths: "10",
      sqft: "10,000",
      status: "Active",
      daysOnMarket: 309,
      image: "https://th-fl-photos-static.idxboost.us/31/A11616031_x600.jpeg",
      development: "Santa Maria Condo",
      pricePerSqft: "$1,800"
    },
    {
      id: "A11689211",
      price: "$17,750,000",
      address: "1451 Brickell Ave #PH 54",
      city: "Miami, FL 33131",
      beds: "4",
      baths: "4",
      sqft: "4,184",
      status: "Active",
      daysOnMarket: 180,
      image: "https://th-fl-photos-static.idxboost.us/11/A11689211_x600.jpeg",
      development: "Echo Brickell",
      pricePerSqft: "$4,242"
    },
    {
      id: "A11781903",
      price: "$17,000,000",
      address: "888 Brickell Ave #78A",
      city: "Miami, FL 33131",
      beds: "4",
      baths: "4",
      sqft: "N/A",
      status: "Active",
      daysOnMarket: 19,
      image: "https://th-fl-photos-static.idxboost.us/03/A11781903_x600.jpeg",
      development: "Dolce & Gabbana",
      pricePerSqft: "N/A"
    },
    {
      id: "A11742047",
      price: "$15,900,000",
      address: "1000 Brickell Plz #UPH6201",
      city: "Miami, FL 33131",
      beds: "5",
      baths: "7",
      sqft: "7,855",
      status: "Active",
      daysOnMarket: 74,
      image: "https://th-fl-photos-static.idxboost.us/47/A11742047_x600.jpeg",
      development: "Brickell Flatiron Condo",
      pricePerSqft: "$2,024"
    }
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredProperties = properties.filter(property => {
    const price = parseInt(property.price.replace(/[$,]/g, ''));
    const minPrice = filters.minPrice || 0;
    const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;

    if (price < minPrice || price > maxPrice) return false;
    if (filters.bedrooms && parseInt(property.beds) !== parseInt(filters.bedrooms)) return false;
    if (filters.bathrooms && parseInt(property.baths) < parseInt(filters.bathrooms)) return false;

    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[$,]/g, ''));
    const priceB = parseInt(b.price.replace(/[$,]/g, ''));

    switch (filters.sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'newest':
        return a.daysOnMarket - b.daysOnMarket;
      case 'oldest':
        return b.daysOnMarket - a.daysOnMarket;
      default:
        return priceB - priceA;
    }
  });

  return (
    <div className="ip ip-theme-compass">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Container>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Brickell condos +1M
                </li>
              </ol>
            </nav>
          </Container>
        </div>

        {/* Page Header */}
        <section className={styles.pageHeader}>
          <Container>
            <Row>
              <Col>
                <h1 className={styles.pageTitle}>Condos em Brickell - Acima de $1M</h1>
                <p className={styles.pageDescription}>
                  Descubra as melhores oportunidades de investimento em condominios de luxo em Brickell, 
                  com propriedades acima de $1 milhão.
                </p>
                {error && (
                  <div className="alert alert-info alert-dismissible fade show" role="alert">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Dados de Exemplo:</strong> Exibindo propriedades de demonstração devido a erro na API.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </section>

        {/* Filters Section */}
        <section className={styles.filtersSection}>
          <Container>
            <Row>
              <Col>
                <Card className={styles.filtersCard}>
                  <Card.Body>
                    <h5 className="mb-3">Filter Properties</h5>
                    <Row>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>Min Price</Form.Label>
                          <Form.Select
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          >
                            <option value="1000000">$1,000,000</option>
                            <option value="5000000">$5,000,000</option>
                            <option value="10000000">$10,000,000</option>
                            <option value="20000000">$20,000,000</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>Max Price</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Any Price"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bedrooms</Form.Label>
                          <Form.Select
                            value={filters.bedrooms}
                            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                          >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bathrooms</Form.Label>
                          <Form.Select
                            value={filters.bathrooms}
                            onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                          >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Form.Group className="mb-3">
                          <Form.Label>Sort By</Form.Label>
                          <Form.Select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                          >
                            <option value="price-desc">Price (High to Low)</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Properties Listing */}
        <section className={styles.propertiesSection}>
          <Container>
             {/* Loading State */}
            {loading && (
              <Container className="text-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-3">Carregando propriedades...</p>
              </Container>
            )}

            {/* Error State */}
            {error && !loading && (
              <Container className="text-center my-5">
                <div className="alert alert-warning" role="alert">
                  <h4 className="alert-heading">Aviso!</h4>
                  <p>Não foi possível carregar os dados da API: {error}</p>
                  <p className="mb-0">Exibindo dados de exemplo.</p>
                </div>
              </Container>
            )}
            {/* Results Count and Refresh */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Propriedades Encontradas: {sortedProperties.length}</h3>
              <button 
                className="btn btn-outline-primary"
                onClick={fetchProperties}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Carregando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Atualizar
                  </>
                )}
              </button>
            </div>
            <Row>
              {sortedProperties.map((property) => (
                <Col key={property.id} lg={6} xl={4} className="mb-4">
                  <Card className={styles.propertyCard}>
                    <div className={styles.imageContainer}>
                      <Card.Img
                        variant="top"
                        src={property.image}
                        alt={property.address}
                        className={styles.propertyImage}
                      />
                      <div className={styles.statusBadge}>
                        {property.status}
                      </div>
                      <div className={styles.daysOnMarket}>
                        {property.daysOnMarket} days on market
                      </div>
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className={styles.price}>
                          {property.price}
                        </Card.Title>
                        <i className="bi bi-heart fs-5"></i>
                      </div>
                      <Card.Text className={styles.address}>
                        {property.address}
                      </Card.Text>
                      <Card.Text className={styles.city}>
                        {property.city}
                      </Card.Text>
                      <Card.Text className={styles.details}>
                        <span><i className="bi bi-bed"></i> {property.beds} Quartos</span>
                        <span><i className="bi bi-droplet"></i> {property.baths} Banheiros</span>
                        <span><i className="bi bi-rulers"></i> {property.sqft} ft²</span>
                      </Card.Text>
                      {property.development !== 'N/A' && (
                        <Card.Text className={styles.development}>
                          <i className="bi bi-building"></i> {property.development}
                        </Card.Text>
                      )}
                      {property.pricePerSqft !== 'N/A' && (
                        <Card.Text className={styles.pricePerSqft}>
                          {property.pricePerSqft} por ft²
                        </Card.Text>
                      )}
                      {property.fullDetailsURL && (
                        <Card.Text>
                          <a 
                            href={property.fullDetailsURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                          >
                            Ver Detalhes <i className="bi bi-arrow-up-right"></i>
                          </a>
                        </Card.Text>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0">
                      <div className="d-flex gap-2">
                        <Button variant="outline-dark" size="sm" className="flex-fill">
                          View Details
                        </Button>
                        <Button variant="dark" size="sm" className="flex-fill">
                          Contact Agent
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>

            {sortedProperties.length === 0 && (
              <Row>
                <Col className="text-center py-5">
                  <h4>No properties found</h4>
                  <p>Try adjusting your search criteria</p>
                </Col>
              </Row>
            )}

            {/* Load More Button */}
            {sortedProperties.length > 0 && (
              <Row className="mt-4">
                <Col className="text-center">
                  <Button variant="outline-dark" size="lg">
                    Load More Properties
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <Container>
            <Row>
              <Col className="text-center">
                <h3>Looking for something specific?</h3>
                <p>Contact Dayanne Costa for personalized assistance</p>
                <div className="d-flex gap-3 justify-content-center">
                  <Button variant="dark" size="lg">
                    Contact Agent
                  </Button>
                  <Button variant="outline-dark" size="lg">
                    Advanced Search
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrickellCondos;