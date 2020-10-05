import React, { useState } from 'react';

import './custom-button.styles.css';

const CustomButton = ({ name, ...otherProps }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  console.log(isLoading);

  return (
    <React.Fragment>
      {!isLoading ? (
        <button
          className="custom-button"
          {...otherProps}
          onClick={handleLoading}
        >
          {name}
        </button>
      ) : (
        <button className="custom-button" {...otherProps}>
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

export default CustomButton;
