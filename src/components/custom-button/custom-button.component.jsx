import React from 'react';
import { connect } from 'react-redux';

import './custom-button.styles.css';

const CustomButton = ({ name, isLoading, ...otherProps }) => {
  return (
    <React.Fragment>
      {!isLoading ? (
        <button {...otherProps} className="custom-button">
          {name}
        </button>
      ) : (
        <button {...otherProps} className="custom-button" disabled>
          <div className="loading-dots">
            <div className="bounce"></div>
            <div className="bounce1"></div>
            <div className="bounce3"></div>
          </div>
        </button>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading,
});

export default connect(mapStateToProps)(CustomButton);
