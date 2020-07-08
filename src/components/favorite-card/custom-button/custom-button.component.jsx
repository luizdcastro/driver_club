import React from 'react';

import './custom-button.styles.css';

const CustomButton = ({ name, ...otherProps }) => {
  return (
    <React.Fragment>
      {
        <button {...otherProps} className="custom-button">
          {name}
        </button>
      }
    </React.Fragment>
  );
};

export default CustomButton;
