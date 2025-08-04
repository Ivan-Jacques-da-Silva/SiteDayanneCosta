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
import BuySell from '../pages/BuySell';
import NewDevelopments from '../pages/NewDevelopments';
import Neighborhood from '../pages/Neighborhood';
import SingleFamilyHomes from '../pages/SingleFamilyHomes';
import LuxuryCondos from '../pages/LuxuryCondos';
import Neighborhoods from '../pages/Neighborhoods';
import AdminDashboard from '../pages/AdminDashboard';
import AdminContacts from '../pages/AdminContacts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about-team" element={<AboutTeam />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/buy-sell" element={<BuySell />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/contacts" element={<AdminContacts />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/compass-concierge" element={<CompassConcierge />} />
      <Route path="/private-exclusive" element={<PrivateExclusive />} />
      <Route path="/new-developments" element={<NewDevelopments />} />
      <Route path="/new-developments/" element={<NewDevelopments />} />
      <Route path="/brickell-condos-1m" element={<BrickellCondos />} />
      <Route path="/single-family-homes/" element={<SingleFamilyHomes />} />
      <Route path="/luxury-condos/" element={<LuxuryCondos />} />
      <Route path="/neighborhoods/" element={<Neighborhoods />} />
      <Route path="/:neighborhoodSlug/" element={<Neighborhood />} />
      <Route path="/buy-sell" element={<BuySell />} />
    </Routes>
  );
};

export default AppRoutes;