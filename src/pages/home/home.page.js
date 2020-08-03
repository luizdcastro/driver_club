import React, { useState, useEffect } from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import './home.styles.css';

const Home = () => {
  const [total, setTotal] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [alimentacao, setAlimentacao] = useState('');
  const [seguro, setSeguro] = useState('');
  const [manutencao, setManutencao] = useState('');
  const [locacao, setLocacao] = useState('');

  useEffect(() => {
    setTotal(
      Number(combustivel) +
        Number(alimentacao) +
        Number(seguro) +
        Number(manutencao) +
        Number(locacao)
    );
  }, [combustivel, alimentacao, seguro, manutencao, locacao]);

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
          <form className="home-calculator__container">
            <h2 className="home-calculator__title">
              Calcule quanto você pode economizar por mês:
            </h2>
            <ul>
              <li className="home-calculator__items">
                <p>Combustível</p>
                <FormInput
                  id="calculator-input"
                  type="number"
                  placeholder="R$ 0,00"
                  handleChange={(e) =>
                    setCombustivel((e.target.value / 100) * 7)
                  }
                />
              </li>
              <li className="home-calculator__items">
                <p>Alimentação</p>
                <FormInput
                  id="calculator-input"
                  type="number"
                  placeholder="R$ 0,00"
                  handleChange={(e) =>
                    setAlimentacao((e.target.value / 100) * 15)
                  }
                />
              </li>
              <li className="home-calculator__items">
                <p>Seguro</p>
                <FormInput
                  id="calculator-input"
                  type="number"
                  placeholder="R$ 0,00"
                  handleChange={(e) => setSeguro((e.target.value / 100) * 10)}
                />
              </li>
              <li className="home-calculator__items">
                <p>Manutenção</p>
                <FormInput
                  id="calculator-input"
                  type="number"
                  placeholder="R$ 0,00"
                  handleChange={(e) =>
                    setManutencao((e.target.value / 100) * 10)
                  }
                />
              </li>
              <li className="home-calculator__items">
                <p>Aluguel de Carro</p>
                <FormInput
                  id="calculator-input"
                  type="number"
                  placeholder="R$ 0,00"
                  handleChange={(e) => setLocacao((e.target.value / 100) * 10)}
                />
              </li>
              <li className="home-calculator__items">
                <CustomButton
                  id="home-calculator__button"
                  name={`Quero Economizar R$ ${total ? total : '200,00'}`}
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
