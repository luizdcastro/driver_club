import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PartnerCard from '../../components/partner-card/partner-card.component';
import { getPartnerByUser } from '../../redux/actions/partner.actions';
import './partner-stores.styles.css';

const PartnerStores = ({ dispatchGetPartners, user, partner }) => {
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
    <div className="partner-stores__page">
      <h1 className="partner-stores__page-title">Meus estabelecimentos</h1>
      <div className="partners-container">
        <div className="partners-grid">
          {filteredPartners.length >= 1 ? (
            filteredPartners.map((item) => (
              <React.Fragment key={item._id}>
                <PartnerCard
                  to={`/partner-edit/${item._id}`}
                  name={item.name}
                  category={item.category}
                  address={item.address}
                  image={item.image}
                />
              </React.Fragment>
            ))
          ) : (
            <div className="no-partner__discont-container">
              <p className="no-partner__discont-text">
                Nenhum estabelecimento encontrado.
              </p>
              <Link className="no-partner__discont-link" to="/create-store">
                Adicionar agora
              </Link>
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(PartnerStores);
