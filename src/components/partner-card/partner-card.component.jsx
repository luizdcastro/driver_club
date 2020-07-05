import React from 'react';
import { Link } from 'react-router-dom';

import './partner-card.styles.css';

const PartnerCard = ({ to, name, category, address }) => {
  return (
    <Link to={to} className="partner-container">
      <div className="partner-title">
        <p>{name}</p>
      </div>
      <div className="partner-details">
        <p>{category}</p>
        <p>{address}</p>
      </div>
    </Link>
  );
};

export default PartnerCard;
