import React from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';
import './home.styles.css';

const Home = () => {
  return (
    <div className="home-page__container">
      <div className="home-page__hero">
        <div className="home-page__callaction">
          <div className="home-callaction__container">
            <h1 className="home-callaction__title">
              O melhor clube de beneficios para motoristas Uber e 99.
            </h1>
            <h2 className="home-callaction__subtitle">
              Aumente suas vendas e fidelize clientes através de descontos
              exclusivos para motoristas de aplicativos
            </h2>
            <div className="home-callaction__buttons">
              <CustomButton id="driver-button" name="Sou Motorista" />
              <CustomButton id="partner-button" name="Tenho Négocio" />
            </div>
          </div>
        </div>
        <div className="home-page__calculator">
          <p>Calculation</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
