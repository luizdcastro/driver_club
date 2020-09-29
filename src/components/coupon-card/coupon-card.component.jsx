import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Qrcode from '../../assets/images/qrcode.png';

import './coupon-card.styles.css';

const CounponCard = ({
  partnerName,
  discontTitle,
  percentage,
  days,
  time,
  deleteCoupon,
  to,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div>
      {modalVisible ? (
        <div className="modal-coupon__container">
          <div className="modal-coupon__content">
            <h1 className="modal-coupon__name">{partnerName}</h1>
            <h3 className="modal-coupon__title">{discontTitle}</h3>
            <h3 className="modal-coupon__percentage">{percentage}</h3>
            <CloseIcon
              className="modal-coupon__close"
              onClick={() => setModalVisible(false)}
              style={{ fontSize: 30 }}
            />
            <img className="modal-coupon__qrcode" src={Qrcode} alt="qrcode" />
            <h3 className="modal-coupon__validate">Período para utilizar</h3>
            <div className="modal-coupon__day-box">
              <p>Dias:</p>
              {days.map((item) => (
                <React.Fragment key={item.days}>
                  <p className="modal-coupon__day-text">{item.days}</p>
                </React.Fragment>
              ))}
            </div>
            <p className="modal-coupon__time">Horários: {time}</p>
          </div>
        </div>
      ) : null}
      <div className="coupon-card__container">
        <p className="coupon-card__title">{discontTitle}</p>
        <p className="coupon-card__name">{partnerName}</p>
        <p className="coupon-card__percentage">{percentage}</p>
        <DeleteIcon
          className="coupon-card__delete"
          color="action"
          onClick={deleteCoupon}
        />
        <button
          className="coupon-card__button"
          onClick={() => setModalVisible(true)}
        >
          Utilizar Desconto
        </button>
        <Link className="coupon-card__link" to={to}>
          Detalhes do Parceiro
        </Link>
      </div>
    </div>
  );
};

export default CounponCard;
