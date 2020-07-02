import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  addFavorite,
  deleteFavorite,
} from '../../redux/actions/favorite.actions';
import '../../redux/actions/coupon.actions.js';
import { fetchPartnerDetails } from '../../redux/actions/partner.actions';
import { getMe } from '../../redux/actions/getme.action.js';
import './partner-details.styles.css';
import { addCoupon } from '../../redux/actions/coupon.actions.js';

const PartnerDetails = ({
  partner,
  getme,
  dispatchPartnerDetails,
  dispatchGetMeAction,
  dispatchAddFavorite,
  dispatchDeleteFavorite,
  dispatchAddCoupon,
}) => {
  const [partnerDetail, setPartnerDetail] = useState('');
  const [getMeData, setGetMeData] = useState('');
  const [favorite, setFavorite] = useState('');
  const [coupon, setCoupon] = useState([]);
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

  const values = getMeData && getMeData.coupon.map((item) => item._id);
  console.log(values);

  const handleAddCoupon = (itemId) => {
    dispatchAddCoupon(itemId);
    setCoupon((coupon) => [...coupon, itemId]);
  };

  return (
    <div>
      <h3>{partnerDetail.name}</h3>
      <p>{partnerDetail.address}</p>
      {!favorite ? (
        <button onClick={handleFavorite}>Add Favorite</button>
      ) : (
        <button onClick={handleFavorite}>Delete Favorite</button>
      )}
      <div>
        <h3>Descontos oferecidos:</h3>
        {partnerDetail.discont
          ? partnerDetail.discont.map((item) => (
              <React.Fragment key={item._id}>
                <div>
                  <p>{item.name}</p>
                  <p>Desconto: {item.percentage} %</p>
                  {values &&
                  !values.includes(item._id) & !coupon.includes(item._id) ? (
                    <button onClick={() => handleAddCoupon(item._id)}>
                      Gerar Desconto
                    </button>
                  ) : (
                    <button disabled> Gerar Desconto</button>
                  )}
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
  dispatchAddCoupon: (discontId) => dispatch(addCoupon(discontId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDetails);
