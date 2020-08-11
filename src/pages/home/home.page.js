import React from 'react';

import DriverImage from '../../assets/images/driver.png';
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
            <div className="hero-button">
              <CustomButton id="custom-button" name="Sou Motorista" />
              <CustomButton id="custom-button" name="Tenho um Negócio" />
            </div>
          </div>
          <DiscontCalculator />
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
              <li>
                <h2>Your safety is our priority</h2>
                <p>
                  With geo-tracked journeys and identified drivers. And of
                  course, we put in place measures to protect you from COVID-19.
                </p>
              </li>
              <li>
                <h2>Your safety is our priority</h2>
                <p>
                  With geo-tracked journeys and identified drivers. And of
                  course, we put in place measures to protect you from COVID-19.
                </p>
              </li>
              <li>
                <h2>Your safety is our priority</h2>
                <p>
                  With geo-tracked journeys and identified drivers. And of
                  course, we put in place measures to protect you from COVID-19.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="home-page__sub">
          <div className="home-sub__title">
            <h2>Your safety, our commitment</h2>
            <p>
              We’ve created our service with safety in mind, down to every last
              detail
            </p>
          </div>
          <div>
            <ul className="home-sub__items">
              <li className="home-sub__item">
                <h3>Protection against COVID-19</h3>
                <p>
                  Extra safety and hygiene measures so that you can ride around
                  the city as safely as ever.
                </p>
              </li>
              <li className="home-sub__item">
                <h3>Protection against COVID-19</h3>
                <p>
                  Extra safety and hygiene measures so that you can ride around
                  the city as safely as ever.
                </p>
              </li>
              <li className="home-sub__item">
                <h3>Protection against COVID-19</h3>
                <p>
                  Extra safety and hygiene measures so that you can ride around
                  the city as safely as ever.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="home-page__footer">
        <div className="home-footer">
          <div className="home-footer__box">
            <h3 className="footer-box__text">Rocketcab está em sua cidade</h3>
            <h2 className="footer-box__title">
              We’re available in 11 countries and more than 90 cities around
              theworld
            </h2>
            <CustomButton
              id="footer-box__button"
              name="Saiba mais sobre nossos serviços"
            />
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
