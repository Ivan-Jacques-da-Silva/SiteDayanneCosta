
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl, getImageUrl } from '../config/api';
import DevelopmentCarousel from './DevelopmentCarousel';
import styles from './FeaturedDevelopments.module.css';
import fundoImg from '../assets/img/fundoImg.jpeg';

const FeaturedDevelopments = () => {
  const [developments, setDevelopments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewDevelopments();
  }, []);

  const fetchNewDevelopments = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/properties-by-category?category=new_developments&limit=10'));
      const data = await response.json();
      
      if (response.ok) {
        // Transformar os dados para o formato esperado pelo carrossel
        const formattedDevelopments = data.properties.map(property => {
          // Buscar imagem primária ou primeira imagem disponível
          let imageUrl = '/src/assets/img/testesImagens.jpeg'; // imagem padrão
          
          if (property.images && property.images.length > 0) {
            // Primeiro tenta encontrar a imagem primária
            const primaryImage = property.images.find(img => img.isPrimary);
            if (primaryImage) {
              imageUrl = getImageUrl(primaryImage.url);
            } else {
              // Se não houver imagem primária, pega a primeira
              imageUrl = getImageUrl(property.images[0].url);
            }
          }

          return {
            id: property.id,
            name: property.title,
            image: imageUrl,
            link: `/property/${property.id}`,
            price: property.price,
            address: property.address,
            city: property.city,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            sqft: property.sqft
          };
        });
        
        setDevelopments(formattedDevelopments);
      } else {
        console.error('Erro ao buscar properties:', data.error);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    navigate('/new-developments');
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  if (loading) {
    return (
      <section
        className="py-5 text-white position-relative"
        style={{
          backgroundImage: `url(${fundoImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="mb-4 text-center">
            <Col>
              <h5 className="text-uppercase text-white">Featured</h5>
              <h3 className="fw-bold">New Developments</h3>
              <p className="text-white">Loading developments...</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section
      className="py-5 text-white position-relative"
      style={{
        backgroundImage: `url(${fundoImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="mb-4 text-center">
          <Col>
            <h5 className="text-uppercase text-white">Featured</h5>
            <h3 className="fw-bold">New Developments</h3>
          </Col>
        </Row>

        {developments.length > 0 ? (
          <DevelopmentCarousel 
            developments={developments} 
            onPropertyClick={handlePropertyClick}
          />
        ) : (
          <Row className="text-center">
            <Col>
              <p className="text-white">No new developments available at the moment.</p>
            </Col>
          </Row>
        )}

        <Row className="mt-5">
          <Col className="text-center">
            <Button 
              variant="outline-light" 
              className="rounded-0 px-5 py-2 fw-bold"
              onClick={handleViewAll}
            >
              View All
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedDevelopments;
