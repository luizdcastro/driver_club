import React from 'react';
import { Link } from 'react-router-dom';

import './catedory-card.styles.css';

const CategoryCard = ({ name, to }) => {
  return (
    <Link className="card-container" to={to}>
      <p className="card-title">{name}</p>
    </Link>
  );
};

export default CategoryCard;
