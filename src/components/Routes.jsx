import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import AboutTeam from '../pages/AboutTeam';
import CompassConcierge from '../pages/CompassConcierge';
import PrivateExclusive from '../pages/PrivateExclusive';
import Search from '../pages/Search';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-team" element={<AboutTeam />} />
        <Route path="/compass-concierge" element={<CompassConcierge />} />
        <Route path="/private-exclusive" element={<PrivateExclusive />} />
        <Route path="/search" element={<Search />} />
      </Routes>
  );
};

export default AppRoutes;