import React from 'react';
import { Link } from 'react-router-dom';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import IconOne from '../../assets/images/icon_one.svg';
import IconTwo from '../../assets/images/icon_two.svg';
import IconThree from '../../assets/images/icon_three.svg';
import DriverImage from '../../assets/images/driver.png';
import BusinessImage from '../../assets/images/business.jpg';
import CustomButton from '../../components/custom-button/custom-button.component';
import DiscontCalculator from '../../components/disconts-calculator/disconts-calculator.component';
import './home.styles.css';

const Home = () => {
  return (
    <div>
      <div className="home-hero__container">
        <div className="home-page__hero">
          <div className="hero-main">
            <h1 className="hero-main__title">
              O melhor clube de beneficios para motoristas Uber e 99.
            </h1>
            <h3 className="hero-main__subtitle">
              Reduza seus gastos mensais utilizando descontos exclusivos
            </h3>
            <Link id="custom-button">Sou Motorista</Link>
          </div>
          <div>
            <DiscontCalculator />
          </div>
        </div>
      </div>
      <div className="home-main__container">
        <div className="home-page__main">
          <div className="home-main__image">
            <img id="main-image" src={DriverImage} alt="driver" />
          </div>
          <div className="home-main__items">
            <h3 className="home-main__title">Why chose Rocketcab</h3>
            <ul>
              <li className="home-main__list">
                <VerifiedUserIcon
                  className="main-items__icon"
                  style={{ fontSize: 30 }}
                />
                <div>
                  <h2 className="main-items__title">
                    Lorem ipsum dolor sit amet.
                  </h2>
                  <p className="main-items__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    sodales ex a mi ultricies dictum. Proin fringilla ac metus
                    a.
                  </p>
                </div>
              </li>
              <li className="home-main__list">
                <VerifiedUserIcon
                  className="main-items__icon"
                  style={{ fontSize: 30 }}
                />
                <div>
                  <h2 className="main-items__title">
                    Lorem ipsum dolor sit amet.
                  </h2>
                  <p className="main-items__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    sodales ex a mi ultricies dictum. Proin fringilla ac metus
                    a.
                  </p>
                </div>
              </li>
              <li className="home-main__list">
                <VerifiedUserIcon
                  className="main-items__icon"
                  style={{ fontSize: 30 }}
                />
                <div>
                  <h2 className="main-items__title">
                    Lorem ipsum dolor sit amet.
                  </h2>
                  <p className="main-items__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    sodales ex a mi ultricies dictum. Proin fringilla ac metus
                    a.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="home-card">
            <div className="home-card__text">
              <p className="card-text__call">Rocketcab Business</p>
              <h3 className="card-text__title">
                Lorem ipsum dolor sit amet, consectetur.
              </h3>
              <p className="card-text__content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent mollis ipsum diam, id eleifend libero maximus ut.
                Vivamus imperdiet eros iaculis est blandit bibendum. Phasellus
                tempus congue lorem eu bibendum.
              </p>
              <Link className="card-text__link">
                Seja um parceiro Rocketcab
              </Link>
            </div>
            <div className="home-card__image">
              <img
                className="image-card__business"
                src={BusinessImage}
                alt="business"
              />
            </div>
          </div>
        </div>
        <div className="home-sub__container">
          <div className="home-page__sub">
            <div className="page-sub__content">
              <h2 className="page-sub__title">
                Lorem ipsum dolor sit consectetur.
              </h2>
              <p className="page-sub__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                pretium dolor in.
              </p>
            </div>
            <div>
              <ul className="home-sub__items">
                <li className="home-sub__item">
                  <img src={IconOne} alt="icon" />
                  <h3>Lorem ipsum dolor amet.</h3>
                  <p>
                    Extra safety and hygiene measures so that you can ride
                    around the city as safely as ever.
                  </p>
                </li>
                <li className="home-sub__item">
                  <img src={IconTwo} alt="icon" />
                  <h3>Lorem ipsum dolor amet.</h3>
                  <p>
                    Extra safety and hygiene measures so that you can ride
                    around the city as safely as ever.
                  </p>
                </li>
                <li className="home-sub__item">
                  <img src={IconThree} alt="icon" />
                  <h3>Lorem ipsum dolor amet.</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer ornare faucibus sollicitudin. Nam viverra felis.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page__footer">
        <div className="home-footer">
          <div className="home-footer__box">
            <h3 className="footer-box__text">Rocketcab está em sua cidade</h3>
            <h2 className="footer-box__title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              non odio porta.
            </h2>
            <Link id="footer-box__button">
              Saiba mais sobre nossos serviços
            </Link>
          </div>
          <div className="footer-box__copy">
            <p>@2020 Rocketcab Internet Ltda.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;