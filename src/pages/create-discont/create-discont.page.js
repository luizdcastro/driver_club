import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import PartnerCard from '../../components/partner-card/partner-card.component';
import { getPartnerByUser } from '../../redux/actions/partner.actions';
import './create-discont.css';

const CreateDiscont = ({ dispatchGetPartners, user, partner }) => {
  const [filteredPartners, setFilteredPartners] = useState([]);
  const userId = user.userId;

  useEffect(() => {
    if (userId) {
      dispatchGetPartners(userId);
    }
  }, [dispatchGetPartners, userId]);

  useEffect(() => {
    setFilteredPartners(partner);
  }, [setFilteredPartners, partner]);
  return (
    <div className="create-discont__page">
      <h1 className="create-discont__page-title">
        Selecione o estabelecimento
      </h1>
      <div className="partners-container">
        <div className="partners-grid">
          {filteredPartners
            ? filteredPartners.map((item) => (
                <React.Fragment key={item._id}>
                  <PartnerCard
                    to={`/discont-details/${item._id}`}
                    name={item.name}
                    category={item.category}
                    address={item.address}
                    image={item.image}
                  />
                </React.Fragment>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGetPartners: (userId) => dispatch(getPartnerByUser(userId)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  partner: state.partner,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDiscont);
