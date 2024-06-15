import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserFriends, FaExclamationTriangle, FaMoneyCheckAlt } from 'react-icons/fa';
import './Sidebar.css'; // Assuming your CSS file is named Sidebar2.css

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span></span>
      </div>
      <ul className="menu-items">
        <li>
          <Link to="/Chart">
            <FaTachometerAlt />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/home">
            <FaUserFriends />
            Users
          </Link>
        </li>
        <li>
          <Link to="/ChargebackHome">
            <FaExclamationTriangle />
            Chargebacks
          </Link>
        </li>
        <li>
          <Link to="/rembourssements">
            <FaMoneyCheckAlt />
            Remboursement
          </Link>
        </li>
      </ul>
      <div className="settings">
        {/* Vous pouvez ajouter des icônes pour les paramètres ici */}
      </div>
    </div>
  );
};

export default Sidebar;
