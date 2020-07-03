import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { deleteFavorite } from '../../redux/actions/favorite.actions';
import { getMe } from '../../redux/actions/getme.action.js';
import './favorites.styles.css';

const Favorites = ({ getme, dispatchGetMeAction, dispatchDeleteFavorite }) => {
  const [getMeData, setGetMeData] = useState('');
  const [favorite, setFavorite] = useState([]);

  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction]);

  useEffect(() => {
    if (getme.length > 0) {
      setGetMeData(getme[0]);
    }
  }, [getme]);

  const handleDeleteFavorite = (itemId) => {
    dispatchDeleteFavorite(itemId);
    setFavorite((favorite) => [...favorite, itemId]);
    dispatchGetMeAction();
  };

  return (
    <div>
      <h2>Favorites List</h2>
      {getMeData
        ? getMeData.favorite.map((item) => (
            <React.Fragment key={item._id}>
              {!favorite.includes(item._id) ? (
                <div>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <button onClick={() => handleDeleteFavorite(item._id)}>
                    Delete
                  </button>
                </div>
              ) : null}
            </React.Fragment>
          ))
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
  dispatchDeleteFavorite: (discontId) => dispatch(deleteFavorite(discontId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
