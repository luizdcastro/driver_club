import React from 'react';
import { Link } from 'react-router-dom';

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
        <div>
          <DiscontCalculator />
        </div>
      </div>
      <div className="home-page__main"></div>
      <div className="home-page__sub"></div>
      <div className="home-page__footer"></div>
    </div>
  );
};

export default Home;
