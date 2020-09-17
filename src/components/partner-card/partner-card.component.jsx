import React from 'react';
import { Link } from 'react-router-dom';

import './partner-card.styles.css';

const PartnerCard = ({
  to,
  name,
  category,
  address: { street, number },
  image,
}) => {
  return (
    <Link to={to} className="partner-container">
      <div className="partner-text__box">
        <p className="partner-title">{name}</p>
        <p className="partner-subtitle">{category}</p>
        <p className="partner-address">
          {street}, {number}
        </p>
      </div>
      <div className="partner-image__box">
        <img className="partner-card__image" src={image} alt="" />
      </div>
    </Link>
  );
};

export default PartnerCard;
