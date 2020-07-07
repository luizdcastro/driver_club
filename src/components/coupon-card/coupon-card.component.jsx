import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

import './coupon-card.styles.css';

const CounponCard = ({
  partnerName,
  discontTitle,
  percentage,
  deleteCoupon,
}) => {
  return (
    <div className="coupon-card__container">
      <p className="coupon-card__title">{discontTitle}</p>
      <p className="coupon-card__name">{partnerName}</p>
      <p className="coupon-card__percentage">{percentage}%</p>
      <DeleteIcon
        className="coupon-card__delete"
        color="action"
        onClick={deleteCoupon}
      />
      <button className="coupon-card__button">Utilizar Desconto</button>
      <Link className="coupon-card__link">Detalhes do Parceiro</Link>
    </div>
  );
};

export default CounponCard;
