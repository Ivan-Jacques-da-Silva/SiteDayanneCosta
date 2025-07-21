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
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import BrickellCondos from '../pages/BrickellCondos';
import BuySell from '../pages/BuySell'; // Import the BuySell component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about-team" element={<AboutTeam />} />
      <Route path="/compass-concierge" element={<CompassConcierge />} />
      <Route path="/private-exclusive" element={<PrivateExclusive />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/buy-sell" element={<BuySell />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-developments/" element={<Search />} />
      <Route path="/single-family-homes/" element={<Search />} />
      <Route path="/luxury-condos/" element={<Search />} />
      <Route path="/neighborhoods/" element={<Search />} />
      <Route path="/brickell-condos-1m" element={<BrickellCondos />} />
    </Routes>
  );
};

export default AppRoutes;