import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './favorite-counter.styles.css';

const FavoriteCounter = ({ getme }) => {
  const [counter, setCounter] = useState('');

  useEffect(() => {
    if (getme.length > 0) {
      setCounter(getme[0].favorite.length);
    }
  }, [getme]);

  return (
    <React.Fragment>
      {counter > 0 ? (
        <div className="favorite-counter__container">
          <p className="favorite-counter__number">{counter}</p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

export default connect(mapStateToProps)(FavoriteCounter);
