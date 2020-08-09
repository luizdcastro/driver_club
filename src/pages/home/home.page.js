import React from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button.component';
import DiscontCalculator from '../../components/disconts-calculator/disconts-calculator.component';
import './home.styles.css';

const Home = () => {
  return (
    <div className="home-page__container">
      <div className="home-page__hero">
        <div>
          <h1> O melhor clube de beneficios para motoristas Uber e 99.</h1>
          <h3> Reduza seus gastos mensais utilizando descontos exclusivos</h3>
          <CustomButton id="driver-button" name="Sou Motorista" />
          <CustomButton id="partner-button" name="Tenho um Negócio" />
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
