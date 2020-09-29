import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EditCoupon from '../../components/edit-coupon/edit-coupon.component';
import { getMe } from '../../redux/actions/getme.action.js';
import './partner-discont-card.styles.css';

const PartnerDiscontCard = ({
  title,
  percentage,
  days,
  time,
  description,
  couponId,
  dispatchGetMeAction,
  discont,
}) => {
  const [details, setDetails] = useState([]);
  const [modalEditCoupon, setModalEditCoupon] = useState(false);
  const { partnerId } = useParams();

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

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
        <button
          className="discont-button__dark"
          onClick={() => {
            setModalEditCoupon(!modalEditCoupon);
          }}
        >
          Editar
        </button>
        {modalEditCoupon ? (
          <div className="discont-modal__container">
            <EditCoupon
              couponId={couponId}
              discont={discont}
              partnerId={partnerId}
              modalEditCoupon={modalEditCoupon}
              setModalEditCoupon={setModalEditCoupon}
            />
          </div>
        ) : null}
      </div>
      {details.includes(couponId) && (
        <div className="partner-discont__expanded-details">
          <h3 className="partner-discont__expanded__title">
            Desconto válido para o período abaixo
          </h3>
          <div className="partner-discont__expanded__days-box">
            <p>Dias:</p>
            {days.map((item) => (
              <React.Fragment key={item.days}>
                <p className="partner-discont__expanded__days-text">
                  {item.days}
                </p>
              </React.Fragment>
            ))}
          </div>
          <p className="partner-discont__expanded__time">Horários: {time}</p>
          <h3 className="partner-discont__expanded__regras-title">
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
  discont: state.discont,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDiscontCard);
