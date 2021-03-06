import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getMe } from '../../redux/actions/getme.action.js';
import { addCoupon } from '../../redux/actions/coupon.actions';
import './discont-card.styles.css';

const DiscontCard = ({
  getme,
  title,
  percentage,
  days,
  time,
  description,
  couponId,
  dispatchAddCoupon,
  dispatchGetMeAction,
}) => {
  const [coupon, setCoupon] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction, coupon]);

  const values = [0] && getme[0].coupon.map((item) => item._id);

  const handleAddCoupon = (itemId) => {
    dispatchAddCoupon(
      itemId,
      () => {
        console.log('Cupom adiconado!');
        setCoupon((coupon) => [...coupon, itemId]);
        dispatchGetMeAction();
      },
      () => console.log('Erro ao adicionar cupom')
    );
  };

  const toggleShow = (id) => {
    const showState = details.slice();
    const index = showState.indexOf(id);
    if (index >= 0) {
      showState.splice(index, 1);
      setDetails(showState);
    } else {
      showState.push(id);
      setDetails(showState);
    }
  };

  return (
    <div>
      <div className="discont-container">
        <p className="discont-title">{title}</p>
        <p className="discont-percentage">{percentage}</p>
        <div className="discont-details">
          <ExpandMoreIcon
            style={{ fontSize: 40 }}
            onClick={() => toggleShow(couponId)}
          />
        </div>
        {values && !values.includes(couponId) & !coupon.includes(couponId) ? (
          <button
            className="discont-button__dark"
            onClick={() => handleAddCoupon(couponId)}
          >
            Gerar Cupom
          </button>
        ) : (
          <button
            className="discont-button__dark"
            id="discont-button__disabled"
            disabled
          >
            Cupom Criado
          </button>
        )}
      </div>
      {details.includes(couponId) && (
        <div className="discont-card__expanded-details">
          <h3 className="discont-card-expanded__title">
            Desconto válido para o período abaixo
          </h3>
          <div className="discont-card-expanded__days-box">
            <p>Dias:</p>
            {days.map((item) => (
              <React.Fragment key={item.days}>
                <p className="discont-card-expanded__days-text">{item.days}</p>
              </React.Fragment>
            ))}
          </div>
          <p className="discont-card-expanded__time">
            Horários: {time.fromTime} às {time.untilTime}
          </p>
          <h3 className="discont-card-expanded__regras-title">
            Regras de utilização
          </h3>
          <p className="">{description}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
  dispatchAddCoupon: (discontId, onSuccess, onError) =>
    dispatch(addCoupon(discontId, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscontCard);
