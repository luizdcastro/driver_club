import React from 'react';

import './custom-button.styles.css';

const CustomButton = ({ name, ...otherProps }) => {
  return (
    <div>
      <button {...otherProps}>{name}</button>
    </div>
  );
};

export default CustomButton;
