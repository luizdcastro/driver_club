import React from 'react';

import DriverImage from '../../assets/images/driver.png';
import CustomButton from '../../components/custom-button/custom-button.component';
import DiscontCalculator from '../../components/disconts-calculator/disconts-calculator.component';
import './home.styles.css';

const Home = () => {
  return (
    <div className="home-page__container">
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
                With geo-tracked journeys and identified drivers. And of course,
                we put in place measures to protect you from COVID-19.
              </p>
            </li>
            <li>
              <h2>Your safety is our priority</h2>
              <p>
                With geo-tracked journeys and identified drivers. And of course,
                we put in place measures to protect you from COVID-19.
              </p>
            </li>
            <li>
              <h2>Your safety is our priority</h2>
              <p>
                With geo-tracked journeys and identified drivers. And of course,
                we put in place measures to protect you from COVID-19.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="home-page__sub"></div>
      <div className="home-page__footer"></div>
    </div>
  );
};

export default Home;
