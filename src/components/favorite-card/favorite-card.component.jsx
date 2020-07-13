import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

import './favorite-card.styles.css';

const FavoriteCard = ({ to, name, category, address, deleteFavorite }) => {
  return (
    <div className="favorite-card__container">
      <p className="favorite-card__title">{name}</p>
      <p className="favorite-card__subtitle">{category}</p>
      <p className="favorite-card__address">{address}</p>
      <DeleteIcon
        className="favorite-card__delete "
        onClick={deleteFavorite}
        color="action"
      />
      <Link className="favorite-card__button" to={to}>
        Ver detalhes
      </Link>
    </div>
  );
};

export default FavoriteCard;
