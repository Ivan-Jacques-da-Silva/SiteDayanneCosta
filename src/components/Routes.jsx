import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import ScrollToTop from './ScrollToTop';
import { useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';
import About from '../pages/About';
import AboutTeam from '../pages/AboutTeam';
import Contact from '../pages/Contact';
import Buy from '../pages/Buy';
import BuySell from '../pages/BuySell';
import Sell from '../pages/Sell';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import AdminDashboard from '../pages/AdminDashboard';
import AdminCondominios from '../pages/AdminCondominios';
import AdminUsuarios from '../pages/AdminUsuarios';
import AdminFavoritos from '../pages/AdminFavoritos';
import AdminFormularios from '../pages/AdminFormularios';
import AdminContacts from '../pages/AdminContacts';
import AdminProperties from '../pages/AdminProperties';
import AdminPropertyForm from '../pages/AdminPropertyForm';
import SingleFamilyHomes from '../pages/SingleFamilyHomes';
import LuxuryCondos from '../pages/LuxuryCondos';
import Neighborhoods from '../pages/Neighborhoods';
import Neighborhood from '../pages/Neighborhood';
import Brickell from '../pages/Brickell';
import BrickellCondos from '../pages/BrickellCondos';
import Edgewater from '../pages/Edgewater';
import CoconutGrove from '../pages/CoconutGrove';
import TheRoads from '../pages/TheRoads';
import NewDevelopments from '../pages/NewDevelopments';
import CompassConcierge from '../pages/CompassConcierge';
import PrivateExclusive from '../pages/PrivateExclusive';
import PropertyDetailPage from '../pages/PropertyDetailPage';


const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <RouterRoutes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about-team" element={<AboutTeam />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/buy-sell" element={<BuySell />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/search" element={<Search />} />

      {/* Property Types */}
      <Route path="/single-family-homes" element={<SingleFamilyHomes />} />
      <Route path="/luxury-condos" element={<LuxuryCondos />} />
      <Route path="/new-developments" element={<NewDevelopments />} />

      {/* Neighborhoods */}
      <Route path="/neighborhoods" element={<Neighborhoods />} />
      <Route path="/neighborhood/:slug" element={<Neighborhood />} />
      <Route path="/brickell" element={<Brickell />} />
      <Route path="/brickell-condos" element={<BrickellCondos />} />
      <Route path="/edgewater" element={<Edgewater />} />
      <Route path="/coconut-grove" element={<CoconutGrove />} />
      <Route path="/the-roads" element={<TheRoads />} />

      {/* Services */}
      <Route path="/compass-concierge" element={<CompassConcierge />} />
      <Route path="/private-exclusive" element={<PrivateExclusive />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/properties" element={<ProtectedRoute><AdminProperties /></ProtectedRoute>} />
      <Route path="/admin/properties/new" element={<ProtectedRoute><AdminPropertyForm /></ProtectedRoute>} />
      <Route path="/admin/properties/edit/:id" element={<ProtectedRoute><AdminPropertyForm /></ProtectedRoute>} />
      <Route path="/admin/condominios" element={<ProtectedRoute><AdminCondominios /></ProtectedRoute>} />
      <Route path="/admin/usuarios" element={<ProtectedRoute><AdminUsuarios /></ProtectedRoute>} />
      <Route path="/admin/favoritos" element={<ProtectedRoute><AdminFavoritos /></ProtectedRoute>} />
      <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
      <Route path="/admin/formularios" element={<ProtectedRoute><AdminFormularios /></ProtectedRoute>} />

      {/* Property Detail Route */}
      <Route path="/property/:id" element={<PropertyDetailPage />} />
    </RouterRoutes>
    </>
  );
}

export default AppRoutes;