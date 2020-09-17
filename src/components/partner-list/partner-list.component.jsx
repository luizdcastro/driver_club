import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getPartnerByUser } from '../../redux/actions/partner.actions';
import PartnerCard from '../../components/partner-card/partner-card.component';
import './partner-list.styles.css';

const PartnerList = ({ user, partner, dispatchGetPartnerByUser }) => {
  const [filteredPartners, setFilteredPartners] = useState(partner);
  const userId = user.userId;

  useEffect(() => {
    if (userId) {
      dispatchGetPartnerByUser(userId);
    }
  }, [dispatchGetPartnerByUser, userId]);

  useEffect(() => {
    setFilteredPartners(partner);
  }, [filteredPartners, partner]);

  return (
    <div>
      <h2>Meus estabelecimentos</h2>
      <div className="partners-grid">
        {filteredPartners.length >= 1
          ? filteredPartners.map((item) => (
              <React.Fragment key={item._id}>
                <PartnerCard
                  to={`/partner/${item._id}`}
                  name={item.name}
                  address={item.address}
                  category={item.category}
                  image={item.image}
                />
              </React.Fragment>
            ))
          : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGetPartnerByUser: (userId) => dispatch(getPartnerByUser(userId)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  partner: state.partner,
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerList);
