import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './Listings.module.css';
import img1 from '../assets/img/testesImagens.jpeg';
import img2 from '../assets/img/testesImagens.jpeg';
import img3 from '../assets/img/testesImagens.jpeg';
import fundoImg from '../assets/img/fundoImg.jpeg';
import dev1 from '../assets/img/testesImagens.jpeg';
import dev2 from '../assets/img/testesImagens.jpeg';
import dev3 from '../assets/img/testesImagens.jpeg';
import dev4 from '../assets/img/testesImagens.jpeg';

const FeaturedDevelopments = () => {
  const properties = [
    {
      price: "$19,500,000",
      details: "2 Bed(s) • 2 Bath(s) • 5,798 Sq.Ft.",
      status: "NEW - 07 HOURS AGO",
      address: "1425 Brickell Ave #PH4BCD",
      city: "Miami, FL 33131",
      image: img1,
    },
    {
      price: "$1,645,000",
      details: "2 Bed(s) • 2 Bath(s) • 1,286 Sq.Ft.",
      status: "NEW - 09 HOURS AGO",
      address: "1000 Brickell Plz #3501",
      city: "Miami, FL 33131",
      image: img2,
    },
    {
      price: "$2,190,000",
      details: "2 Bed(s) • 2 Bath(s) • 2,070 Sq.Ft.",
      status: "NEW - 11 HOURS AGO",
      address: "2127 Brickell Ave #2104",
      city: "Miami, FL 33129",
      image: img3,
    },
  ];

  const developments = [
    { title: "The Perigon", image: dev1 },
    { title: "The Residences at 1428 Brickell", image: dev2 },
    { title: "72 Park", image: dev3 },
    { title: "Cipriani Residences", image: dev4 },
  ];

  return (
    <>
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

          <Row xs={1} sm={2} lg={4} className="g-4">
            {developments.map((dev, index) => (
              <Col key={index} className="text-center">
                <Card className="bg-transparent border-0">
                  <Card.Img src={dev.image} className="rounded-0" />
                  <Card.Body className="px-0">
                    <Card.Title className="text-white fs-6 mt-2">{dev.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-5">
            <Col className="text-center">
              <Button variant="outline-light" className="rounded-0 px-5 py-2 fw-bold">
                View All
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FeaturedDevelopments;
