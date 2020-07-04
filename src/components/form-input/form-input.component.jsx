import React from 'react';

import './form-input.styles.css';

const FormInput = ({ handleChange, ...otherProps }) => {
  return (
    <input className="form-input" onChange={handleChange} {...otherProps} />
  );
};

export default FormInput;
