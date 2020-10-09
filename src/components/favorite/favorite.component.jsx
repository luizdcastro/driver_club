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

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction, favorite]);

  useEffect(() => {
    const userFavorites = getme[0] && getme[0].favorite.map((item) => item._id);
    if (userFavorites.includes(partnerId)) {
      setFavorite(partnerId);
    }
  }, [getme, partnerId]);

  const handleAddfavorite = () => {
    dispatchAddFavorite(
      partnerId,
      () => {
        console.log('Favorito adicionado!');
        setFavorite(partnerId);
      },
      () => console.log('Erro ao adicionar favorito')
    );
  };

  const handdleDeleteFavorite = () => {
    dispatchDeleteFavorite(
      partnerId,
      () => {
        console.log('Favorito delatado!');
        setFavorite('');
      },
      () => console.log('Erro ao deletar favorito')
    );
  };

  console.log(favorite);

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
  dispatchAddFavorite: (partnerId, onSuccess, onError) =>
    dispatch(addFavorite(partnerId, onSuccess, onError)),
  dispatchDeleteFavorite: (partnerId, onSuccess, onError) =>
    dispatch(deleteFavorite(partnerId, onSuccess, onError)),
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
