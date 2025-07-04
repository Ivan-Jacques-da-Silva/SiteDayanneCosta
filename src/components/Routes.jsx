import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import AboutTeam from '../pages/AboutTeam';
import CompassConcierge from '../pages/CompassConcierge';
import PrivateExclusive from '../pages/PrivateExclusive';
import Search from '../pages/Search';
import Buy from '../pages/Buy';
import Sell from '../pages/Sell';
import Contact from '../pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about-team" element={<AboutTeam />} />
      <Route path="/compass-concierge" element={<CompassConcierge />} />
      <Route path="/private-exclusive" element={<PrivateExclusive />} />
      <Route path="/buy-sell" element={<Search />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/new-developments/" element={<Search />} />
      <Route path="/single-family-homes/" element={<Search />} />
      <Route path="/luxury-condos/" element={<Search />} />
      <Route path="/neighborhoods/" element={<Search />} />
    </Routes>
  );
};

export default AppRoutes;