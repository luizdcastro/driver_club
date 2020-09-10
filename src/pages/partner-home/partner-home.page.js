import React from 'react';

import CreatePartner from '../../components/create-partner/create-partner.component';
import PartnerList from '../../components/partner-list/partner-list.component';
import './partner-home.styles.css';

const PartnerHome = () => {
  return (
    <div className="partner-home__container">
      <CreatePartner />
      <PartnerList />
    </div>
  );
};

export default PartnerHome;
