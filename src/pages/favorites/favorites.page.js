import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteFavorite } from '../../redux/actions/favorite.actions';
import { getMe } from '../../redux/actions/getme.action.js';
import FavoriteCard from '../../components/favorite-card/favorite-card.component';
import './favorites.styles.css';

const Favorites = ({ getme, dispatchGetMeAction, dispatchDeleteFavorite }) => {
  const [getMeData, setGetMeData] = useState('');
  const [favorite, setFavorite] = useState([]);

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction, favorite]);

  useEffect(() => {
    if (getme.length > 0) {
      setGetMeData(getme[0]);
    }
  }, [getme]);

  const handleDeleteFavorite = (itemId) => {
    dispatchDeleteFavorite(
      itemId,
      () => {
        console.log('Favorito delatado!');
        setFavorite((favorite) => [...favorite, itemId]);
        dispatchGetMeAction();
      },
      () => console.log('Erro ao deletar favorito')
    );
  };

  function NoFavorite() {
    return (
      <div className="no-favorite__container">
        <div>
          <p className="no-favorite__text">
            Você não tem estabelecimentos favoritos.
          </p>
          <Link className="no-favorite__link" to="/categories">
            Voltar para categorias
          </Link>
        </div>
      </div>
    );
  }

  function YesFavorite() {
    return (
      <div className="favorite-page__container">
        <h2 className="favorite-page__title">Meus Favoritos</h2>
        {getMeData
          ? getMeData.favorite.map((item) => (
              <React.Fragment key={item._id}>
                {!favorite.includes(item._id) ? (
                  <FavoriteCard
                    name={item.name}
                    category={item.category}
                    address={item.address}
                    deleteFavorite={() => handleDeleteFavorite(item._id)}
                    to={`/partner/${item._id}`}
                  />
                ) : null}
              </React.Fragment>
            ))
          : null}
      </div>
    );
  }

  return (
    <div>{getme[0].favorite.length > 0 ? <YesFavorite /> : <NoFavorite />}</div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
  dispatchDeleteFavorite: (discontId, onSuccess, onError) =>
    dispatch(deleteFavorite(discontId, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
