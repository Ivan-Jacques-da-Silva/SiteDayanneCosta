import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import CompassConcierge from '../pages/CompassConcierge';
import PrivateExclusive from '../pages/PrivateExclusive';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/compass-concierge" element={<CompassConcierge />} />
        <Route path="/private-exclusive" element={<PrivateExclusive />} />
      </Routes>
  );
};

export default AppRoutes;