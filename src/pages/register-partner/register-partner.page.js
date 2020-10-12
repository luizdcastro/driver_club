import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import { getMe } from '../../redux/actions/getme.action';
import { registerUser } from '../../redux/actions/auth.actions';
import RegisterImage from '../../assets/images/register_image.jpg';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import IconOne from '../../assets/icons/space.svg';
import IconTwo from '../../assets/icons/taxi.svg';
import IconThree from '../../assets/icons/report.svg';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PhoneIcon from '@material-ui/icons/Phone';
import './register-partner.styles.css';

const RegisterPartner = ({ dispatchRegisterAction, dispatchGetme }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [serverError, setServerError] = useState('');
  const name = `${firstName} ${lastName}`;
  const isPartner = true;

  useEffect(() => dispatchGetme, [dispatchGetme]);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchRegisterAction(
      name,
      email,
      phone,
      password,
      passwordConfirm,
      isPartner,
      () => console.log('Account created'),
      (message) => setServerError(message)
    );
    dispatchGetme();
  };
  return (
    <div className="register-partner__container">
      <div className="register-partner__hero">
        <h1 className="register-partner__hero-title">
          Seja um parceiro Rocketcab
        </h1>
        <h2 className="register-partner__hero-subtitle ">
          Aumente o movimento do seu negócio e fidelize clientes através de
          descontos exclusivos.
        </h2>
        <img
          className="register-partner__hero-image"
          src={RegisterImage}
          alt=""
        />
      </div>
      <div className="register-partner__form-container">
        <div className="register-partner__form">
          <h2>Cadastre seu negócio grátis</h2>
          <form>
            <div className="register-partner-input__group">
              <FormInput
                id="registerpartner-input__firstname"
                type="name"
                name="name"
                placeholder="Nome"
                value={firstName}
                handleChange={(e) => setFirstName(e.target.value)}
              />
              <FormInput
                id="register-partner-input__lastname"
                type="name"
                name="name"
                placeholder="Nome"
                value={lastName}
                handleChange={(e) => setLastName(e.target.value)}
              />
              <PersonIcon className="register-partner-input__icon-name" />
            </div>
            <div className="register-partner-input__group">
              <FormInput
                id="register-partner__input"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
              />
              <EmailIcon className="register-partner-input__icon" />
            </div>
            <div className="register-partner-input__group">
             <MaskedInput
                id="register-partner__input"
          className="form-input"
          mask={[
            '(',
            /[1-9]/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          placeholderChar={'\u2000'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
             
              <PhoneIcon className="register-partner-input__icon" />
            </div>
            <div className="register-partner-input__group">
              <FormInput
                id="register-partner-input__password"
                type="password"
                name="password"
                placeholder="Senha"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
              />
              <FormInput
                id="register-partner-input__confirm-password"
                type="password"
                name="passwordConfirm"
                placeholder="Confirmar Senha"
                value={passwordConfirm}
                handleChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <LockIcon className="register-partner-input__icon" />
            </div>
            <CustomButton name="Cadastrar" onClick={handleOnSubmmit} />
            {serverError ? (
              <p className="register-error">{serverError}</p>
            ) : null}
            <Link className="register-link" to="/login">
              Já tem cadastro?
            </Link>
          </form>
        </div>
      </div>
      <div className="register-partner__items-container">
        <h2 className="register-partner__items-title">
          Lorem ipsum dolor sit amet
        </h2>
        <div>
          <ul className="register-partner__items ">
            <li className="register-partner__items-sub">
              <img
                className="register-partner__items-icons"
                src={IconOne}
                alt="icon"
              />
              <h3>Lorem ipsum dolor amet.</h3>
              <p>
                Extra safety and hygiene measures so that you can ride around
                the city as safely as ever.
              </p>
            </li>
            <li className="register-partner__items-sub">
              <img
                className="register-partner__items-icons"
                src={IconTwo}
                alt="icon"
              />
              <h3>Lorem ipsum dolor amet.</h3>
              <p>
                Extra safety and hygiene measures so that you can ride around
                the city as safely as ever.
              </p>
            </li>
            <li className="register-partner__items-sub">
              <img
                className="register-partner__items-icons"
                src={IconThree}
                alt="icon"
              />
              <h3>Lorem ipsum dolor amet.</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                ornare faucibus sollicitudin. Nam viverra felis.
              </p>
            </li>
          </ul>
        </div>
        <div className="register-partner__footer">
          <h2 className="register-partner__footer-title">
            Pronto para aumentar suas vendas?
          </h2>
          <h3 className="register-partner__footer-subtitle">
            Cadastre seu estabelecimento gratuitamente e aumente o movimento do
            seu negócio.
          </h3>
          <Link className="register-partner__button">Quero me cadastrar</Link>
        </div>
      </div>
    </div>
  );
};

const mapDispathToProps = (dispatch) => ({
  dispatchRegisterAction: (
    name,
    email,
    phone,
    password,
    passwordConfirm,
    isPartner,
    onSuccess,
    onError
  ) =>
    dispatch(
      registerUser(
        { name, email, phone, password, passwordConfirm, isPartner },
        onSuccess,
        onError
      )
    ),
  dispatchGetme: () => dispatch(getMe()),
});
export default connect(null, mapDispathToProps)(RegisterPartner);
