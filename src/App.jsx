import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './components/Routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;