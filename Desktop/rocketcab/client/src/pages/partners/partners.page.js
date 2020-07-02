import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { fetchPartnersByCategory } from '../../redux/actions/partner.actions';
import SearchBar from '../../components/search/search.component';
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
      <br />
      <SearchBar onChange={(e) => setSearch(e.target.value)} />
      {filteredPartners
        ? filteredPartners.map((item) => (
            <React.Fragment key={item._id}>
              <div>
                <p>{item.name}</p>
                <Link to={`/partner/${item._id}`}>{item._id}</Link>
                <br />
              </div>
            </React.Fragment>
          ))
        : null}
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
