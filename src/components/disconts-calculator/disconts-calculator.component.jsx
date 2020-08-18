import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input.component';
import './disconts-calculator.styles.css';

const DiscontCalculator = ({ to }) => {
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
    <div className="home-page__calculator">
      <form className="home-calculator__container">
        <h2 className="home-calculator__title">
          Calcule quanto você pode economizar mensalmente
        </h2>
        <ul>
          <li className="home-calculator__items">
            <p>Combustível</p>
            <FormInput
              id="calculator-input"
              placeholder="R$ 0,00"
              handleChange={(e) => setCombustivel((e.target.value / 100) * 7)}
            />
          </li>
          <li className="home-calculator__items">
            <p>Alimentação</p>
            <FormInput
              id="calculator-input"
              placeholder="R$ 0,00"
              handleChange={(e) => setAlimentacao((e.target.value / 100) * 15)}
            />
          </li>
          <li className="home-calculator__items">
            <p>Seguro</p>
            <FormInput
              id="calculator-input"
              placeholder="R$ 0,00"
              handleChange={(e) => setSeguro((e.target.value / 100) * 10)}
            />
          </li>
          <li className="home-calculator__items">
            <p>Manutenção</p>
            <FormInput
              id="calculator-input"
              placeholder="R$ 0,00"
              handleChange={(e) => setManutencao((e.target.value / 100) * 10)}
            />
          </li>
          <li className="home-calculator__items">
            <p>Aluguel de Carro</p>
            <FormInput
              id="calculator-input"
              placeholder="R$ 0,00"
              handleChange={(e) => setLocacao((e.target.value / 100) * 10)}
            />
          </li>
          <li className="home-calculator__items">
            <Link id="home-calculator__button" to={to}>
              {`Quero Economizar R$ ${total ? total.toFixed(2) : '200,00'}`}
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default DiscontCalculator;
