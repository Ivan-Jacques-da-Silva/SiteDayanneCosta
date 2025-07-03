
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import AboutTeam from '../pages/AboutTeam';
import CompassConcierge from '../pages/CompassConcierge';
import PrivateExclusive from '../pages/PrivateExclusive';
import Search from '../pages/Search';

// Páginas temporárias para demonstração
const NewDevelopments = () => <div style={{padding: '200px 20px'}}><h1>New Developments</h1><p>Página em desenvolvimento...</p></div>;
const SingleFamilyHomes = () => <div style={{padding: '200px 20px'}}><h1>Single Family Homes</h1><p>Página em desenvolvimento...</p></div>;
const LuxuryCondos = () => <div style={{padding: '200px 20px'}}><h1>Luxury Condos</h1><p>Página em desenvolvimento...</p></div>;
const Neighborhoods = () => <div style={{padding: '200px 20px'}}><h1>Neighborhoods</h1><p>Página em desenvolvimento...</p></div>;
const Buy = () => <div style={{padding: '200px 20px'}}><h1>Buy Properties</h1><p>Página em desenvolvimento...</p></div>;
const Sell = () => <div style={{padding: '200px 20px'}}><h1>Sell Properties</h1><p>Página em desenvolvimento...</p></div>;
const Contact = () => <div style={{padding: '200px 20px'}}><h1>Contact Us</h1><p>Página em desenvolvimento...</p></div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about-team" element={<AboutTeam />} />
      <Route path="/compass-concierge" element={<CompassConcierge />} />
      <Route path="/private-exclusive" element={<PrivateExclusive />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/buy/" element={<Buy />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/sell/" element={<Sell />} />
      <Route path="/new-developments" element={<NewDevelopments />} />
      <Route path="/new-developments/" element={<NewDevelopments />} />
      <Route path="/single-family-homes" element={<SingleFamilyHomes />} />
      <Route path="/single-family-homes/" element={<SingleFamilyHomes />} />
      <Route path="/luxury-condos" element={<LuxuryCondos />} />
      <Route path="/luxury-condos/" element={<LuxuryCondos />} />
      <Route path="/neighborhoods" element={<Neighborhoods />} />
      <Route path="/neighborhoods/" element={<Neighborhoods />} />
    </Routes>
  );
};

export default AppRoutes;
