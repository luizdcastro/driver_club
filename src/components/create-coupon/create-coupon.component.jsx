import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import MaskedInput from 'react-text-mask';
import { createCoupon } from '../../redux/actions/discont.actions';
import { fetchPartnerDetails } from '../../redux/actions/partner.actions';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';

import './create-coupon.styles.css';

const CreateCoupon = ({
  dispatchCreateCoupon,
  dispatchPartnerDetails,
  partnerId,
  setModalAddVisible,
}) => {
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [untilTime, setUntilTime] = useState('');
  const [days, setDays] = useState([]);
  const [description, setDescription] = useState('');
  const time = `${fromTime} às ${untilTime}`;
  const partner = partnerId;

  const handleCreateCoupon = (event) => {
    event.preventDefault();
    dispatchCreateCoupon(
      partner,
      name,
      percentage,
      time,
      days,
      description,
      () => {
        dispatchPartnerDetails(partnerId);
        setModalAddVisible(false);
      },
      () => console.log('Erro ao criar desconto')
    );
  };

  const DaySelected = ({ day, onClick }) => {
    return (
      <Link className="dayselected-box" onClick={onClick}>
        <p className="daySelected-text">
          {day}
          <span className="daySelected-icon">
            <CloseIcon style={{ fontSize: 13 }} />
          </span>
        </p>
      </Link>
    );
  };
  return (
    <div className="create-coupon__container">
      <CloseIcon
        className="create-coupon__close-icon"
        style={{ fontSize: 30 }}
        onClick={() => setModalAddVisible(false)}
      />
      <form className="create-coupon__form" onSubmit={handleCreateCoupon}>
        <label>Titulo do desconto</label>
        <FormInput
          id="create-coupun__input"
          placeHolder="Troca de óleo"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Percentual</label>
        <MaskedInput
          className="form-input"
          id="create-coupun__input"
          placeholder="20%"
          mask={[/\d/, /\d/, '%']}
          placeholderChar={'\u2000'}
          onChange={(e) => setPercentage(e.target.value)}
          value={percentage}
        />

        <label>Dias e horário de utilização</label>
        <select
          className="create-coupon__select"
          onChange={(e) => {
            const duplicate = days.some(
              (value) => value.days === `${e.target.value}`
            );
            if (!duplicate) {
              setDays([...days, { days: e.target.value }]);
            }
          }}
        >
          <option value="" disabled selected hidden>
            Selecione os dias da semana
          </option>
          <option value="segunda">Segunda</option>
          <option value="terça">Terça</option>
          <option value="quarta">Quarta</option>
          <option value="quinta">Quinta</option>
          <option value="sexta">Sexta</option>
          <option value="sábado">Sábado</option>
          <option value="domingo">Domingo</option>
        </select>
        <div className="create-coupon__selected-box">
          {days.length > 0
            ? days.map((item) => (
                <React.Fragment key={item.days}>
                  <DaySelected
                    day={item.days}
                    onClick={() => {
                      setDays(days.filter(({ days }) => days !== item.days));
                    }}
                  />
                </React.Fragment>
              ))
            : null}
        </div>
        <div className="create-coupon__time-container">
          <MaskedInput
            className="form-input"
            id="create-coupon__time-input"
            placeholder="00:00"
            mask={[/\d/, /\d/, ':', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
          <span style={{ fontSize: 14 }}>às</span>
          <MaskedInput
            placeholder="00:00"
            className="form-input"
            id="create-coupon__time-input"
            mask={[/\d/, /\d/, ':', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            value={untilTime}
            onChange={(e) => setUntilTime(e.target.value)}
          />
        </div>
        <div className="create_coupon-textarea">
          <label>Regras de utilização</label>
          <textarea
            className="create-coupon__description-input"
            maxlength="150"
            placeHolder="Descreva aqui caso tenha alguma regra para utilização desse cupom."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <CustomButton
          id="create-coupon__button"
          name="Criar desconto"
          onClick={() => handleCreateCoupon}
        />
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPartnerDetails: (partnerId) =>
    dispatch(fetchPartnerDetails(partnerId)),
  dispatchCreateCoupon: (
    partner,
    name,
    percentage,
    time,
    days,
    description,
    onSuccess,
    onError
  ) =>
    dispatch(
      createCoupon(
        {
          partner,
          name,
          percentage,
          time,
          days,
          description,
        },
        onSuccess,
        onError
      )
    ),
});

export default connect(null, mapDispatchToProps)(CreateCoupon);
