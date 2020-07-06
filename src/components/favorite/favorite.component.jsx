import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  addFavorite,
  deleteFavorite,
} from '../../redux/actions/favorite.actions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './favorite.styles.css';

const Favorite = ({
  partner,
  getme,
  dispatchAddFavorite,
  dispatchDeleteFavorite,
  dispatchGetMeAction,
}) => {
  const [favorite, setFavorite] = useState('');

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

  useEffect(() => {
    const userFavorites = getme[0] && getme[0].favorite.map((item) => item._id);
    const partnerId = partner[0] && partner[0]._id;
    if (userFavorites.includes(partnerId)) {
      setFavorite(partnerId);
    }
  }, []);

  const partnerId = partner[0] && partner[0]._id;

  const handleAddfavorite = () => {
    dispatchAddFavorite(partnerId);
    setFavorite(partnerId);
  };

  const handdleDeleteFavorite = () => {
    dispatchDeleteFavorite(partnerId);
    setFavorite('');
  };

  return (
    <div className="favorite">
      {!favorite ? (
        <FavoriteIcon
          color="disabled"
          style={{ fontSize: 35 }}
          onClick={handleAddfavorite}
        />
      ) : (
        <FavoriteIcon
          color="secondary"
          style={{ fontSize: 35 }}
          onClick={handdleDeleteFavorite}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  partner: state.partner,
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddFavorite: (partnerId) => dispatch(addFavorite(partnerId)),
  dispatchDeleteFavorite: (partnerId) => dispatch(deleteFavorite(partnerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
