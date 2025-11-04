import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import styles from './BuySellSection.module.css';
import bgSell from '../assets/img/bg-sell.jpeg';
import bgBuy from '../assets/img/bg-buy.jpeg';

const BuySellSection = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleBuyClick = () => {
    navigate('/buy'); // Navigate to Buy page
  };

  const handleSellClick = () => {
    navigate('/sell'); // Navigate to Sell page
  };

  return (
    <div>
      <section
        className="text-white position-relative text-center d-flex align-items-center"
        style={{
          backgroundImage: `url(${bgSell})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh'
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <Container className="position-relative z-1">
          <h2 className="display-5">SELLING A HOME?</h2>
          <p className="lead">Find out the market value of your home.</p>
          <Button
            variant="outline-light"
            className="mt-3 px-4 py-2 rounded-0"
            onClick={handleSellClick} // Add onClick handler
          >
            I Want To Sell
          </Button>
        </Container>
      </section>

      <section
        className="text-white position-relative text-center d-flex align-items-center"
        style={{
          backgroundImage: `url(${bgBuy})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh'
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <Container className="position-relative z-1">
          <h2 className="display-5">BUYING A HOME?</h2>
          <p className="lead">Explore our gallery of beautiful properties available now!</p>
          <Button
            variant="outline-light"
            className="mt-3 px-4 py-2 rounded-0"
            onClick={handleBuyClick} // Add onClick handler
          >
            I Want To Buy
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default BuySellSection;