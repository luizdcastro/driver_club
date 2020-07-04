import React from 'react';

import './custom-button.styles.css';

const CustomButton = ({ name, ...otherProps }) => {
  return (
    <button {...otherProps} className="custom-button">
      {name}
    </button>
  );
};

export default CustomButton;
