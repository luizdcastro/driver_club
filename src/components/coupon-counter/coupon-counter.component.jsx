import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './counpon-counter.styles.css';

const CouponCounter = ({ getme }) => {
  const [counter, setCounter] = useState('');

  useEffect(() => {
    if (getme.length > 0) {
      setCounter(getme[0].coupon.length);
    }
  }, [getme]);

  return (
    <React.Fragment>
      {counter > 0 ? (
        <div className="coupon-counter__container">
          <p className="coupon-counter__number">{counter}</p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

export default connect(mapStateToProps)(CouponCounter);
