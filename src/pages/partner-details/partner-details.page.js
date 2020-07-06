import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Favorite from '../../components/favorite/favorite.component';
import DiscontCard from '../../components/discont-card/discont-card.component';
import { fetchPartnerDetails } from '../../redux/actions/partner.actions';
import { getMe } from '../../redux/actions/getme.action.js';
import './partner-details.styles.css';

const PartnerDetails = ({
  partner,
  dispatchPartnerDetails,
  dispatchGetMeAction,
}) => {
  const [partnerDetail, setPartnerDetail] = useState('');
  const [details, setDetails] = useState([]);
  const { partnerId } = useParams();

  // Get all user data to check if has favorite and discont card
  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction]);

  // Get partner details
  useEffect(() => {
    if (partnerId) {
      dispatchPartnerDetails(partnerId);
    }
  }, [dispatchPartnerDetails, partnerId]);

  useEffect(() => {
    if (partner.length > 0) {
      setPartnerDetail(partner[0]);
    }
  }, [partner]);

  // Expanded partner details info

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
    <div className="partner-datails__container">
      <div className="partner-details__hero">
        <h3 className="details-hero__title">{partnerDetail.name}</h3>
        <p className="details-hero__subtitle">{partnerDetail.category}</p>
        <div className="details_favicon">
          <Favorite />
        </div>
      </div>
      <div className="partner-details__info">
        <h3 className="info-title">Informações adicionais</h3>
        <ExpandMoreIcon
          onClick={() => toggleShow(partnerId)}
          className="info-dropicon"
          style={{ fontSize: 40 }}
        />
        <p className="info-address">Endereço: {partnerDetail.address}</p>
        <p className="info-time">Horário de atendimento:</p>
      </div>
      {details.includes(partnerId) && (
        <div className="expanded-details">
          <h3 className="expanded-payment">Formas de pagamento</h3>
          <ul className="payment-list">
            <li className="payment-item">- Visa</li>
            <li>- Mastercard</li>
          </ul>
          <h3 className="expanded-contact">Contato</h3>
          <p className="expanded-phone">Telefone: </p>
          <p className="expanded-site">Site:</p>
          <h3 className="expanded-map">Mostrar no mapa</h3>
          <button className="expanded-button__map">
            Abrir com Google Maps
          </button>
        </div>
      )}
      <div className="partner-details__disconts">
        <h3 className="disconts-title">Descontos disponíveis</h3>
        {partnerDetail.discont
          ? partnerDetail.discont.map((item) => (
              <React.Fragment key={item._id}>
                <div className="discont-cards">
                  <DiscontCard
                    title={item.name}
                    percentage={item.percentage}
                    couponId={item._id}
                  />
                </div>
              </React.Fragment>
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  partner: state.partner,
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPartnerDetails: (partnerId) =>
    dispatch(fetchPartnerDetails(partnerId)),
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDetails);
