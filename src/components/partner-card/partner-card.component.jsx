import React from 'react';
import { Link } from 'react-router-dom';

import './partner-card.styles.css';

const PartnerCard = ({ to, name, category, address }) => {
  return (
    <Link to={to} className="partner-container">
      <div>
        <p className="partner-title">{name}</p>
        <p className="partner-subtitle">{category}</p>
        <p className="partner-address">{address}</p>
      </div>
    </Link>
  );
};

export default PartnerCard;
