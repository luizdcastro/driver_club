import React from 'react';

import DiscontCalculator from '../../components/disconts-calculator/disconts-calculator.component';
import './calculator.styles.css';

const Calculator = () => {
  return (
    <div className="calculator-container">
      <h1 className="calculator-title">Calculadora de Descontos</h1>
      <div className="calculator-box">
        <DiscontCalculator to="/subscription" />
      </div>
    </div>
  );
};

export default Calculator;
