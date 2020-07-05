import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchPartnersByCategory } from '../../redux/actions/partner.actions';
import SearchBar from '../../components/search/search.component';
import PartnerCard from '../../components/partner-card/partner-card.component';
import './partners.styles.css';

const Partners = ({ partner, dispatchGetPartners }) => {
  const [search, setSearch] = useState('');
  const [filteredPartners, setFilteredPartners] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatchGetPartners(categoryId);
    }
  }, [dispatchGetPartners, categoryId]);

  useEffect(() => {
    setFilteredPartners(partner);
  }, [setFilteredPartners, partner]);

  useEffect(() => {
    setFilteredPartners(
      partner.filter((partner) =>
        partner.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [partner, search]);

  return (
    <div>
      <SearchBar onChange={(e) => setSearch(e.target.value)} />
      <div className="partners-container">
        <div className="partners-grid">
          {filteredPartners
            ? filteredPartners.map((item) => (
                <React.Fragment key={item._id}>
                  <PartnerCard
                    to={`/partner/${item._id}`}
                    name={item.name}
                    category={item.category}
                    address={item.address}
                  />
                </React.Fragment>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  partner: state.partner,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetPartners: (categoryId) =>
    dispatch(fetchPartnersByCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
