import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

import { getMe } from '../../redux/actions/getme.action';
import { removeCard } from '../../redux/actions/subscription.action';
import './credit-card.styles.css';

const CreditCard = ({ getme, dispatchRemovePaymentMethod, dispatchGetme }) => {
  const [cardData, setCardData] = useState({});

  useEffect(() => dispatchGetme, [dispatchGetme, cardData]);

  const handleRemoveCard = () => {
    dispatchRemovePaymentMethod(getme[0].id);
    setCardData({});
    dispatchGetme();
  };

  return (
    <div className="credit-card__container">
      {cardData ? (
        <div>
          <DeleteIcon
            className="credit-card__delete"
            color="action"
            onClick={handleRemoveCard}
          />
          <p className="credit-card__brand">{getme[0].iugu_card_data.brand}</p>
          <p className="credit-card__number">
            {getme[0].iugu_card_data.number}
          </p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetme: () => dispatch(getMe()),
  dispatchRemovePaymentMethod: (id) => dispatch(removeCard({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCard);
