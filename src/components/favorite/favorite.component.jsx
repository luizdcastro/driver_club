import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  addFavorite,
  deleteFavorite,
} from '../../redux/actions/favorite.actions';
import { getMe } from '../../redux/actions/getme.action';
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
  const { partnerId } = useParams();

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

  const userFavorites = getme[0] && getme[0].favorite.map((item) => item._id);

  useEffect(() => {
    const userFavorites = getme[0] && getme[0].favorite.map((item) => item._id);
    if (userFavorites.includes(partnerId)) {
      setFavorite(partnerId);
    }
  }, [getme, partner, userFavorites, favorite, partnerId]);

  const handleAddfavorite = () => {
    dispatchAddFavorite(partnerId);
    dispatchGetMeAction();
    setFavorite(partnerId);
  };

  const handdleDeleteFavorite = () => {
    dispatchDeleteFavorite(partnerId);
    dispatchGetMeAction();
    setFavorite('');
  };

  return (
    <div className="favorite">
      {setFavorite && !favorite ? (
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
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
