import React from 'react';

import './form-input.styles.css';

const FormInput = ({ handleChange, ...otherProps }) => {
  return (
    <div>
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
      ></input>
    </div>
  );
};

export default FormInput;
