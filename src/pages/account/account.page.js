import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getMe } from '../../redux/actions/getme.action';
import { updateUser } from '../../redux/actions/account.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './account.styles.css';

const Account = ({ getme, dispatchGetMeAction, dispatchUpdateUser }) => {
  const [getMeData, setGetMeData] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('');

  const handleOnUpdate = (event) => {
    event.preventDefault();
    dispatchUpdateUser(
      name,
      email,
      () => console.log('Updated'),
      (message) => setServerError(message)
    );
    dispatchGetMeAction();
    setName('');
    setEmail('');
  };

  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction]);

  useEffect(() => {
    if (getme.length > 0) {
      setGetMeData(getme[0]);
    }
  }, [getme]);

  return (
    <div>
      <h2>Account Settings</h2>
      <div>
        <h3>Information</h3>
        <form>
          <label>Name</label>
          <FormInput
            type="text"
            name="name"
            placeholder={getMeData.name}
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <FormInput
            type="email"
            name="email"
            placeholder={getMeData.email}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <CustomButton name="Save Changes" onClick={handleOnUpdate} />
          {serverError ? (
            <div>
              <p>{serverError}</p>
            </div>
          ) : null}
        </form>
      </div>
      <div>
        <h3>Billing</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateUser: (name, email, onSuccess, onError) =>
    dispatch(updateUser({ name, email }, onSuccess, onError)),
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
