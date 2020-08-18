import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CouponCard from '../../components/coupon-card/coupon-card.component';
import { getMe } from '../../redux/actions/getme.action.js';
import { deleteCoupon } from '../../redux/actions/coupon.actions';
import './copons.styles.css';

const Coupons = ({ getme, dispatchDeleteCoupon, dispatchGetMeAction }) => {
  const [getMeData, setGetMeData] = useState('');
  const [coupon, setCoupon] = useState([]);

  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction]);

  useEffect(() => {
    if (getme.length > 0) {
      setGetMeData(getme[0]);
    }
  }, [getme]);

  const handleDeleteCoupon = (itemId) => {
    dispatchDeleteCoupon(itemId);
    setCoupon((coupon) => [...coupon, itemId]);
    dispatchGetMeAction();
  };

  console.log(getMeData.coupon);

  return (
    <div className="coupon-page__container">
      <h2 className="coupon-page__title">Meus Coupons</h2>
      {getMeData
        ? getMeData.coupon.map((item) => (
            <React.Fragment key={item._id}>
              {!coupon.includes(item._id) ? (
                <CouponCard
                  partnerName={item.partner[0].name}
                  discontTitle={item.name}
                  percentage={item.percentage}
                  days={item.days}
                  time={item.time}
                  deleteCoupon={() => handleDeleteCoupon(item._id)}
                  to={`/partner/${item.partner[0]._id}`}
                />
              ) : null}
            </React.Fragment>
          ))
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
  dispatchDeleteCoupon: (discontId) => dispatch(deleteCoupon(discontId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
