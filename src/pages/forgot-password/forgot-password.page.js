import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './forgot-password.styles.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password__container">
      <form className="forgot-password">
        <h2 className="forgot-password__title">Forgot Password</h2>
        <FormInput name="email" type="email" placeholder="Email" />
        <CustomButton name="Enviar Link" />
      </form>
    </div>
  );
};

export default ForgotPassword;
