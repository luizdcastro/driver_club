import React from 'react';
import { Link } from 'react-router-dom';

import IconCheckedOne from '../../assets/icons/done.svg';
import IconCheckedTwo from '../../assets/icons/done.svg';
import IconCheckedThree from '../../assets/icons/done.svg';
import IconOne from '../../assets/icons/space.svg';
import IconTwo from '../../assets/icons/taxi.svg';
import IconThree from '../../assets/icons/report.svg';
import DriverImage from '../../assets/images/driver_09.jpg';
import BusinessImage from '../../assets/images/business_07.jpg';
import DiscontCalculator from '../../components/disconts-calculator/disconts-calculator.component';
import './home.styles.css';

const Home = () => {
  return (
    <div>
      <div className="home-hero__container">
        <div className="home-page__hero">
          <div className="hero-main">
            <h1 className="hero-main__title">
              Lorem ipsum dolor amet consectetur adipiscing elit.
            </h1>
            <h3 className="hero-main__subtitle">
              Ut sodales ex a mi ultricies dictum. Proin fringilla
            </h3>
            <Link id="custom-button">Sou Motorista</Link>
          </div>
          <div>
            <DiscontCalculator to="registration" />
          </div>
        </div>
      </div>
      <div className="home-main__container">
        <div className="home-page__main">
          <div className="home-main__content">
            <div className="home-main__image">
              <img id="main-image" src={DriverImage} alt="driver" />
            </div>
            <div className="home-main__items">
              <div className="home-main__card">
                <h3 className="home-main__title">Why chose Rocketcab</h3>
                <ul>
                  <li className="home-main__list">
                    <img
                      className="main-items__icon"
                      src={IconCheckedOne}
                      alt=""
                    />
                    <div>
                      <h2 className="main-items__title">
                        Lorem ipsum dolor sit amet.
                      </h2>
                      <p className="main-items__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut sodales ex a mi ultricies dictum. Proin fringilla ac
                        metus a.
                      </p>
                    </div>
                  </li>
                  <li className="home-main__list">
                    <img
                      className="main-items__icon"
                      src={IconCheckedTwo}
                      alt=""
                    />
                    <div>
                      <h2 className="main-items__title">
                        Lorem ipsum dolor sit amet.
                      </h2>
                      <p className="main-items__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut sodales ex a mi ultricies dictum. Proin fringilla ac
                        metus a.
                      </p>
                    </div>
                  </li>
                  <li className="home-main__list">
                    <img
                      className="main-items__icon"
                      src={IconCheckedThree}
                      alt=""
                    />
                    <div>
                      <h2 className="main-items__title">
                        Lorem ipsum dolor sit amet.
                      </h2>
                      <p className="main-items__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut sodales ex a mi ultricies dictum. Proin fringilla ac
                        metus a.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
                  <img className="home-sub__icons" src={IconOne} alt="icon" />
                  <h3>Lorem ipsum dolor amet.</h3>
                  <p>
                    Extra safety and hygiene measures so that you can ride
                    around the city as safely as ever.
                  </p>
                </li>
                <li className="home-sub__item">
                  <img className="home-sub__icons" src={IconTwo} alt="icon" />
                  <h3>Lorem ipsum dolor amet.</h3>
                  <p>
                    Extra safety and hygiene measures so that you can ride
                    around the city as safely as ever.
                  </p>
                </li>
                <li className="home-sub__item">
                  <img className="home-sub__icons" src={IconThree} alt="icon" />
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
