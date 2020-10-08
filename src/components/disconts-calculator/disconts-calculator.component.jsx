import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
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
      Number((combustivel / 100) * 7) +
        Number((alimentacao / 100) * 10) +
        Number((seguro / 100) * 10) +
        Number((manutencao / 100) * 10) +
        Number((locacao / 100) * 15)
    );
  }, [combustivel, alimentacao, seguro, manutencao, locacao]);

  return (
    <div className="home-page__calculator">
      <h2 className="home-calculator__title">
        Calcule quanto você pode economizar
      </h2>
      <table className="home-calculator__container">
        <thead>
          <tr className="home-calculator__subtitles">
            <td>Categoria</td>
            <td>Gasto Mensal</td>
            <td>Economia</td>
          </tr>
          <tr>
            <td className="home-calculator__text">Combustível</td>
            <td>
              <div className="calculator-value__content">
                {!combustivel ? (
                  <p className="calculator-value">R$ 0.00</p>
                ) : (
                  <p className="calculator-value">R$ {`${combustivel}.00`}</p>
                )}
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  className="calculator-input"
                  placeholder="R$ 0,00"
                  onChange={(e) => setCombustivel(e.target.value)}
                />
              </div>
            </td>
            <td className="calculator-value__discont">
              R$ {((combustivel / 100) * 7).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="home-calculator__text">Alimentação</td>
            <td>
              <div className="calculator-value__content">
                {!alimentacao ? (
                  <p className="calculator-value">R$ 0.00</p>
                ) : (
                  <p className="calculator-value">R$ {`${alimentacao}.00`}</p>
                )}
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  className="calculator-input"
                  placeholder="R$ 0,00"
                  onChange={(e) => setAlimentacao(e.target.value)}
                />
              </div>
            </td>
            <td className="calculator-value__discont">
              R$ {((alimentacao / 100) * 10).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="home-calculator__text">Seguro</td>
            <td>
              <div>
                {!seguro ? (
                  <p className="calculator-value">R$ 0.00</p>
                ) : (
                  <p className="calculator-value">R$ {`${seguro}.00`}</p>
                )}
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  className="calculator-input"
                  placeholder="R$ 0,00"
                  onChange={(e) => setSeguro(e.target.value)}
                />
              </div>
            </td>
            <td className="calculator-value__discont">
              R$ {((seguro / 100) * 10).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="home-calculator__text">Manutenção</td>
            <td>
              <div>
                {!manutencao ? (
                  <p className="calculator-value">R$ 0.00</p>
                ) : (
                  <p className="calculator-value">R$ {`${manutencao}.00`}</p>
                )}
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  className="calculator-input"
                  placeholder="R$ 0,00"
                  onChange={(e) => setManutencao(e.target.value)}
                />
              </div>
            </td>
            <td className="calculator-value__discont">
              R$ {((manutencao / 100) * 10).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="home-calculator__text">Locação</td>
            <td>
              <div>
                {!locacao ? (
                  <p className="calculator-value">R$ 0.00</p>
                ) : (
                  <p className="calculator-value">R$ {`${locacao}.00`}</p>
                )}
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  className="calculator-input"
                  placeholder="R$ 0,00"
                  onChange={(e) => setLocacao(e.target.value)}
                />
              </div>
            </td>
            <td className="calculator-value__discont">
              R$ {((locacao / 100) * 15).toFixed(2)}
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>
              <Link id="home-calculator__button" to={to}>
                {`Quero Economizar R$ ${total ? total.toFixed(2) : '0,00'}`}
              </Link>
            </td>
          </tr>
        </thead>
        <thead className="home-calculator__disclamer">
          <tr>
            <td>
              O cálculo é baseado na média de descontos oferecidos pelos
              estabelecimentos parceiros do clube.
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default DiscontCalculator;
