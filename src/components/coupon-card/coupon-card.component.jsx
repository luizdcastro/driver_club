import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import QRCode from 'qrcode.react';

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
            <QRCode
              className="modal-coupon__qrcode"
              value={'https://rocketcab.herokuapp.com/'}
              size={128}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'L'}
              includeMargin={false}
              renderAs={'svg'}
            />
            <h3 className="modal-coupon__validate">Período para utilizar</h3>
            <div className="modal-coupon__day-box">
              <p>Dias:</p>
              {days.map((item) => (
                <React.Fragment key={item.days}>
                  <p className="modal-coupon__day-text">{item.days}</p>
                </React.Fragment>
              ))}
            </div>
            <p className="modal-coupon__time">
              Horários: {time.fromTime} às {time.untilTime}
            </p>
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
