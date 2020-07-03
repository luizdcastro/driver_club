import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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

  const values = getMeData && getMeData.coupon.map((item) => item._id);

  const handleDeleteCoupon = (itemId) => {
    dispatchDeleteCoupon(itemId);
    setCoupon((coupon) => [...coupon, itemId]);
    dispatchGetMeAction();
  };

  return (
    <div>
      <h2>Coupons List</h2>
      {getMeData && !getMeData.coupon.includes(values)
        ? getMeData.coupon.map((item) => (
            <React.Fragment key={item._id}>
              {!coupon.includes(item._id) ? (
                <div>
                  <p>{item.name}</p>
                  <p>{item.percentage}%</p>
                  <p>{item.partner[0].name}</p>
                  <button onClick={() => handleDeleteCoupon(item._id)}>
                    Delete
                  </button>
                </div>
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
