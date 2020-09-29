import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EditCoupon from '../../components/edit-coupon/edit-coupon.component';
import { getMe } from '../../redux/actions/getme.action.js';
import { deleteCoupon } from '../../redux/actions/discont.actions.js';
import { fetchPartnerDetails } from '../../redux/actions/partner.actions';
import './partner-discont-card.styles.css';

const PartnerDiscontCard = ({
  title,
  percentage,
  days,
  time,
  description,
  couponId,
  dispatchGetMeAction,
  dispatchDeleteCoupon,
  dispatchPartnerDetails,
  discont,
}) => {
  const [details, setDetails] = useState([]);
  const [modalEditCoupon, setModalEditCoupon] = useState(false);
  const { partnerId } = useParams();

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

  useEffect(() => dispatchPartnerDetails(partnerId), [
    dispatchPartnerDetails,
    partnerId,
  ]);

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

  const handleDeleteoupon = (event) => {
    event.preventDefault();
    dispatchDeleteCoupon(
      couponId,
      () => {
        dispatchPartnerDetails(partnerId);
      },
      () => console.log('Erro ao deletar disconto')
    );
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
        <div className="partner-discont__button-container">
          <button
            className="partner-discont__button__edit"
            onClick={() => setModalEditCoupon(!modalEditCoupon)}
          >
            Editar
          </button>
          <button
            className="partner-discont__button__delete"
            onClick={handleDeleteoupon}
          >
            Deletar
          </button>
        </div>
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
          <p className="partner-discont__expanded__time">
            Horários: {time.fromTime} às {time.untilTime}
          </p>
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
  dispatchDeleteCoupon: (couponId, onSucess, onError) =>
    dispatch(deleteCoupon(couponId, onSucess, onError)),
  dispatchPartnerDetails: (partnerId) =>
    dispatch(fetchPartnerDetails(partnerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDiscontCard);
