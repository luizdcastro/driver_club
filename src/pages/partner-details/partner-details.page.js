import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowDropDownCircleSharpIcon from '@material-ui/icons/ArrowDropDownCircleSharp';

import DiscontCard from '../../components/discont-card/discont-card.component';
import {
  addFavorite,
  deleteFavorite,
} from '../../redux/actions/favorite.actions';
import '../../redux/actions/coupon.actions.js';
import { fetchPartnerDetails } from '../../redux/actions/partner.actions';
import { getMe } from '../../redux/actions/getme.action.js';
import './partner-details.styles.css';

const PartnerDetails = ({
  partner,
  getme,
  dispatchPartnerDetails,
  dispatchGetMeAction,
  dispatchAddFavorite,
  dispatchDeleteFavorite,
}) => {
  const [partnerDetail, setPartnerDetail] = useState('');
  const [getMeData, setGetMeData] = useState('');
  const [favorite, setFavorite] = useState('');
  const { partnerId } = useParams();

  // Get all user data to check if has favorite and discont card
  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction]);

  useEffect(() => {
    if (getme.length > 0) {
      setGetMeData(getme[0]);
      if (getMeData)
        if (getMeData.favorite.includes(partnerId)) {
          setFavorite(partnerId);
        }
    }
  }, [getme, partnerId, getMeData]);

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

  // Add and delete partner as favorite

  const handleFavorite = () => {
    if (getMeData && partnerId)
      if (!favorite) {
        dispatchAddFavorite(partnerId);
        setFavorite(partnerId);
      } else {
        dispatchDeleteFavorite(partnerId);
        setFavorite('');
      }
  };

  const valueFavorites =
    getMeData && getMeData.favorite.map((item) => item._id);

  return (
    <div className="partner-datails__container">
      <div className="partner-details__hero">
        <h3 className="details-hero__title">{partnerDetail.name}</h3>
        <p className="details-hero__subtitle">{partnerDetail.category}</p>
        {getMeData.favorite &&
        !valueFavorites.includes(partnerId) & !favorite.includes(partnerId) ? (
          <Link to="" onClick={handleFavorite} className="details_favicon">
            <FavoriteIcon color="disabled" style={{ fontSize: 35 }} />
          </Link>
        ) : (
          <Link to="" onClick={handleFavorite} className="details_favicon">
            <FavoriteIcon color="secondary" style={{ fontSize: 35 }} />
          </Link>
        )}
      </div>
      <div className="partner-details__info">
        <h3 className="info-title">Informações adicionais</h3>
        <Link to="" className="info-dropicon">
          <ArrowDropDownCircleSharpIcon
            style={{ fontSize: 40 }}
            color="disabled"
          />
        </Link>
        <p className="info-address">Endereço: {partnerDetail.address}</p>
        <p className="info-time">Horário de atendimento:</p>
      </div>
      <div className="partner-details__disconts">
        <h3 className="disconts-title">Descontos oferecidos:</h3>
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
  dispatchAddFavorite: (partnerId) => dispatch(addFavorite(partnerId)),
  dispatchDeleteFavorite: (partnerId) => dispatch(deleteFavorite(partnerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDetails);
