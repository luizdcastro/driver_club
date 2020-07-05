import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCoupon } from '../../redux/actions/coupon.actions';
import './discont-card.styles.css';

const DiscontCard = ({
  getme,
  title,
  percentage,
  couponId,
  dispatchAddCoupon,
}) => {
  const [coupon, setCoupon] = useState([]);

  const values = [0] && getme[0].coupon.map((item) => item._id);

  const handleAddCoupon = (itemId) => {
    dispatchAddCoupon(itemId);
    setCoupon((coupon) => [...coupon, itemId]);
  };

  return (
    <div>
      <p>{title}</p>
      <p>{percentage}</p>
      <p>{couponId}</p>
      {values && !values.includes(couponId) & !coupon.includes(couponId) ? (
        <button onClick={() => handleAddCoupon(couponId)}>
          Gerar Desconto
        </button>
      ) : (
        <button disabled> Gerar Desconto</button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddCoupon: (discontId) => dispatch(addCoupon(discontId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscontCard);
