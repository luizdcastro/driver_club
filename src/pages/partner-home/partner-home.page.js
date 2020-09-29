import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { getMe } from '../../redux/actions/getme.action';
import { selectGetMeData } from '../../redux/reducers/getme/getme.selector';
import IconRental from '../../assets/icons/bicycle-parking.svg';

import './partner-home.styles.css';

const PartnerHome = ({ getme, dispatchGetMeAction }) => {
  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

  return (
    <div className="partner-home__container">
      <div className="category-title">
        {getme[0] ? (
          <h2 className="category-title__greeting">
            Bem-vindo, {getme[0].name.split(' ')[0]}
          </h2>
        ) : null}
        <h3 className="category-title__text">
          Adicione seu estabelecimento e descontos navegando pelas opções abaixo
        </h3>
        <div className="partner-home_main">
          <Link className="partner-home__card " to="/create-store">
            <div className="partner-home__text-box">
              <p className="partner-home__card-title ">
                Adicionar estabelecimento
              </p>
              <p className="partner-home__card-subtitle">
                Divulgue seu negocio para centenas de motoristas, o primeiro
                passo é adicionar as informações do seu estabelecimento
              </p>
            </div>
            <img className="partner-home__card-icon" src={IconRental} alt="" />
          </Link>
          <Link className="partner-home__card " to="/create-discont">
            <div className="partner-home__text-box">
              <p className="partner-home__card-title ">Adicionar desconto</p>
              <p className="partner-home__card-subtitle">
                Crie cupons de descontos customizados e aumente seu faturamento
                em dias e horários de menor movimento
              </p>
            </div>
            <img className="partner-home__card-icon" src={IconRental} alt="" />
          </Link>
          <Link className="partner-home__card " to="">
            <div className="partner-home__text-box">
              <p className="partner-home__card-title ">Meus estabelecimento</p>
              <p className="partner-home__card-subtitle">
                Vizualize os estabelecimentos criados e mantenha as informações
                do seu negócio sempre atualizadas
              </p>
            </div>
            <img className="partner-home__card-icon" src={IconRental} alt="" />
          </Link>
          <Link className="partner-home__card " to="">
            <div className="partner-home__text-box">
              <p className="partner-home__card-title ">Meus descontos</p>
              <p className="partner-home__card-subtitle">
                Veja os cupons criados pelo seu estabelecimento e edite as
                informações de acordo com suas regras de utilização
              </p>
            </div>
            <img className="partner-home__card-icon" src={IconRental} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  getme: selectGetMeData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerHome);
