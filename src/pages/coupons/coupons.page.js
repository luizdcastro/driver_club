import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CouponCard from '../../components/coupon-card/coupon-card.component';
import { getMe } from '../../redux/actions/getme.action.js';
import { deleteCoupon } from '../../redux/actions/coupon.actions';
import './copons.styles.css';

const Coupons = ({ getme, dispatchDeleteCoupon, dispatchGetMeAction }) => {
  const [getMeData, setGetMeData] = useState('');
  const [coupon, setCoupon] = useState([]);

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction, coupon]);

  useEffect(() => {
    if (getme.length > 0) {
      setGetMeData(getme[0]);
    }
  }, [getme]);

  console.log(getme[0].coupon.length);

  const handleDeleteCoupon = (itemId) => {
    dispatchDeleteCoupon(itemId);
    setCoupon((coupon) => [...coupon, itemId]);
    dispatchGetMeAction();
  };

  function NoCoupon() {
    return (
      <div className="no-coupon__container">
        <div>
          <p className="no-coupon__text">Você não tem nenhum cupom criado.</p>
          <Link className="no-coupon__link" to="/categories">
            Voltar para categorias
          </Link>
        </div>
      </div>
    );
  }

  function YesCoupon() {
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
  }

  return <div>{getme[0].coupon.length > 0 ? <YesCoupon /> : <NoCoupon />}</div>;
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
  dispatchDeleteCoupon: (discontId) => dispatch(deleteCoupon(discontId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
