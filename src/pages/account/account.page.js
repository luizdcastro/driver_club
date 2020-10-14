import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MaskedInput from "react-text-mask";

import { getMe } from "../../redux/actions/getme.action";
import {
	updateUser,
	updatePassword,
} from "../../redux/actions/account.actions";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PhoneIcon from "@material-ui/icons/Phone";
import "./account.styles.css";

const Account = ({
	getme,
	dispatchGetMeAction,
	dispatchUpdatePassword,
	dispatchUpdateUser,
}) => {
	const [name, setName] = useState(getme[0].name);
	const [email, setEmail] = useState(getme[0].email);
	const [phone, setPhone] = useState(getme[0].phone);
	const [serverErrorData, setServerErrorData] = useState("");
	const [serverErrorPassword, setServerErrorPassword] = useState("");
	const [passwordUpdated, setPasswordUpdated] = useState(false);
	const [dataUpdated, setDataUpdated] = useState(false);
	const [passwordCurrent, setpasswordCurrent] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction]);

	const handleUpdateData = (event) => {
		event.preventDefault();
		dispatchUpdateUser(
			name,
			email,
			phone,
			() => {
				setDataUpdated(true);
				setServerErrorData("");
			},
			(message) => setServerErrorData(message)
		);
		dispatchGetMeAction();
	};

	const handleUpdatePassword = (event) => {
		event.preventDefault();
		dispatchUpdatePassword(
			passwordCurrent,
			password,
			passwordConfirm,
			() => {
				setPasswordUpdated(true);
				setServerErrorPassword("");
			},
			(message) => setServerErrorPassword(message)
		);
		dispatchGetMeAction();
	};

	return (
		<div className="account-container">
			<h2 className="account-title">Configurações do Perfil</h2>
			<div className="account-content">
				<div className="account-data__pessoal ">
					<form onSubmit={handleUpdateData}>
						<h3 className="account-data__subtitle">Dados Pessoais</h3>
						<div className="account-input__group">
							<FormInput
								id="account-input"
								type="text"
								name="name"
								placeholder={getme[0].name}
								value={name}
								handleChange={(e) => setName(e.target.value)}
							/>
							<PersonIcon className="account-input__icon " />
						</div>
						<div className="account-input__group">
							<FormInput
								id="account-input"
								type="email"
								name="email"
								placeholder={getme[0].email}
								value={email}
								handleChange={(e) => setEmail(e.target.value)}
							/>
							<EmailIcon className="account-input__icon " />
						</div>
						<div className="account-input__group">
							<MaskedInput
								id="account-input"
								className="form-input"
								mask={[
									"(",
									/[1-9]/,
									/\d/,
									")",
									" ",
									/\d/,
									/\d/,
									/\d/,
									/\d/,
									"-",
									/\d/,
									/\d/,
									/\d/,
									/\d/,
									/\d/,
								]}
								placeholderChar={"\u2000"}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
							<PhoneIcon className="account-input__icon " />
						</div>

						<CustomButton name="Salvar Alteração" onClick={handleUpdateData} />
						{serverErrorData ? (
							<p className="account-data__error">{serverErrorData}</p>
						) : null}
						{dataUpdated ? (
							<p className="account-data__success">Dados alterados com sucesso!</p>
						) : null}
					</form>
				</div>
				<div className="account-data__password">
					<form onSubmit={handleUpdatePassword}>
						<h3 className="account-data__subtitle">Alterar Senha</h3>
						<div className="account-input__group">
							<FormInput
								id="account-input"
								type="password"
								name="password"
								placeholder="Senha atual"
								handleChange={(e) => setpasswordCurrent(e.target.value)}
							/>
							<LockOpenIcon className="account-input__icon " />
						</div>
						<div className="account-input__group">
							<FormInput
								id="account-input__password"
								type="password"
								name="password"
								placeholder="Nova senha"
								handleChange={(e) => setPassword(e.target.value)}
							/>
							<FormInput
								id="account-input__confirm-password"
								type="password"
								name="password"
								placeholder="Confirmar senha"
								handleChange={(e) => setPasswordConfirm(e.target.value)}
							/>
							<LockIcon className="account-input__icon " />
						</div>
						<CustomButton name="Salvar Senha" onClick={handleUpdatePassword} />
						{serverErrorPassword ? (
							<p className="account-data__error">{serverErrorPassword}</p>
						) : null}
						{passwordUpdated ? (
							<p className="account-data__success">Senha atualizada com sucesso!</p>
						) : null}
					</form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
	dispatchUpdateUser: (name, email, phone, onSuccess, onError) =>
		dispatch(updateUser({ name, email, phone }, onSuccess, onError)),
	dispatchUpdatePassword: (
		passwordCurrent,
		password,
		passwordConfirm,
		onSuccess,
		onError
	) =>
		dispatch(
			updatePassword(
				{ passwordCurrent, password, passwordConfirm },
				onSuccess,
				onError
			)
		),
	dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
