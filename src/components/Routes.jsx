
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Buy from '../pages/Buy';
import Sell from '../pages/Sell';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Search from '../pages/Search';
import Neighborhoods from '../pages/Neighborhoods';
import NewDevelopments from '../pages/NewDevelopments';
import LuxuryCondos from '../pages/LuxuryCondos';
import SingleFamilyHomes from '../pages/SingleFamilyHomes';
import CompassConcierge from '../pages/CompassConcierge';
import PrivateExclusive from '../pages/PrivateExclusive';
import AboutTeam from '../pages/AboutTeam';

// Neighborhood Pages
import Brickell from '../pages/Brickell';
import BrickellCondos from '../pages/BrickellCondos';
import CoconutGrove from '../pages/CoconutGrove';
import Edgewater from '../pages/Edgewater';
import TheRoads from '../pages/TheRoads';

// Admin Pages
import AdminDashboard from '../pages/AdminDashboard';
import AdminContacts from '../pages/AdminContacts';
import AdminProperties from '../pages/AdminProperties';
import AdminCondominios from '../pages/AdminCondominios';
import AdminUsuarios from '../pages/AdminUsuarios';

// Components
import PropertyDetail from './PropertyDetail';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-team" element={<AboutTeam />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/neighborhoods" element={<Neighborhoods />} />
        <Route path="/new-developments" element={<NewDevelopments />} />
        <Route path="/luxury-condos" element={<LuxuryCondos />} />
        <Route path="/single-family-homes" element={<SingleFamilyHomes />} />
        <Route path="/compass-concierge" element={<CompassConcierge />} />
        <Route path="/private-exclusive" element={<PrivateExclusive />} />
        
        {/* Property Detail */}
        <Route path="/property/:id" element={<PropertyDetail />} />
        
        {/* Neighborhood Routes */}
        <Route path="/neighborhoods/brickell" element={<Brickell />} />
        <Route path="/neighborhoods/brickell-condos" element={<BrickellCondos />} />
        <Route path="/neighborhoods/coconut-grove" element={<CoconutGrove />} />
        <Route path="/neighborhoods/edgewater" element={<Edgewater />} />
        <Route path="/neighborhoods/the-roads" element={<TheRoads />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/condominios" element={<AdminCondominios />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/favoritos" element={<AdminDashboard />} /> {/* Placeholder */}
        <Route path="/admin/formularios" element={<AdminContacts />} /> {/* Use existing contacts page */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
