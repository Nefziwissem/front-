import React from 'react';
import './PaymentsNavigation.css'; // Make sure this CSS file is correctly imported
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentsNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="payments-section">
      <div>
        <h4 className="h4">Mon Compte</h4>
      </div>
      <div className="payments-section2">
        <span className={`navigation-text ${isActive('/user') ? 'active' : ''}`} onClick={() => navigate('/user')}>
          Compte
        </span>
        <span className={`navigation-text ${isActive('/configuration') ? 'active' : ''}`} onClick={() => navigate('/configuration')}>
          Configuration
        </span>
        <span className={`navigation-text ${isActive('/home') ? 'active' : ''}`} onClick={() => navigate('/home')}>
          Gestion des utilisateurs
        </span>
        <span className={`navigation-text ${isActive('/create-role') ? 'active' : ''}`} onClick={() => navigate('/create-role')}>
          Gestion des rôles
        </span>
      </div>
    </div>
  );
};

export default PaymentsNavigation;
