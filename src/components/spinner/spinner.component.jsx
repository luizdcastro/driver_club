import React from 'react';
import { connect } from 'react-redux';

import './spinner.styles.css';

const Spinner = ({ isLoading }) => (
  <React.Fragment>
    {isLoading ? (
      <div className="spinner-fade">
        <p className="default-spinner">Loading...</p>
      </div>
    ) : null}
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  isLoading: state.loading,
});

export default connect(mapStateToProps)(Spinner);
