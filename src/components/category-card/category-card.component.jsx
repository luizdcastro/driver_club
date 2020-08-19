import React from 'react';
import { Link } from 'react-router-dom';

import './catedory-card.styles.css';

const CategoryCard = ({ name, image, partners, to }) => {
  return (
    <Link className="card-container" to={to}>
      <p className="card-title">{name}</p>
      <img className="category-card__icon" src={image} alt={name} />
    </Link>
  );
};

export default CategoryCard;
