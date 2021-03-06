import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MaskedInput from "react-text-mask";
import CloseIcon from "@material-ui/icons/Close";

import {
	createPartner,
	getPartnerByUser,
} from "../../redux/actions/partner.actions";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import UploadImage from "../upload-image/upload-image.component";
import "./create-store.component.styles.css";
const CreateStoreComponent = ({
	user,
	uploadImage,
	dispatchCreatePartner,
	dispatchGetPartnerByUser,
}) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [website, setWebsite] = useState("");
	const [category, setCategory] = useState("");
	const [street, setStreet] = useState("");
	const [number, setNumber] = useState("");
	const [cep, setCep] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [open_at, setOpen_at] = useState("");
	const [close_at, setClose_at] = useState("");
	const [paymentMethods, setPaymenMethods] = useState([]);
	const [created, setCreated] = useState("");
	const [modal, setModal] = useState(false);
	const [serverError, setServerError] = useState("");
	const userId = user.userId;
	const image = uploadImage.url;
	const address = {
		street: street,
		number: number,
		cep: cep,
		city: city,
		state: state,
	};
	const hours = {
		open_at: open_at,
		close_at: close_at,
	};

	const handleOnSubmmit = (event) => {
		event.preventDefault();
		dispatchCreatePartner(
			user.userId,
			name,
			category,
			address,
			phone,
			website,
			hours,
			paymentMethods,
			image,
			() => {
				setCreated(true);
				setModal(true);
			},
			(message) => setServerError(message)
		);
		if (created) {
			dispatchGetPartnerByUser(userId);
		}
		setCreated("");
	};

	useEffect(() => {
		dispatchGetPartnerByUser(userId);
	}, [dispatchGetPartnerByUser, userId, created]);

	const modalCreated = () => {
		return (
			<div className="modal-partner__created">
				<div className="modal-partner__content">
					<Link
						className="modal-partner__button"
						to="/partner-stores"
						onClick={() => setCreated(false)}
					>
						Visualizar
					</Link>
					<Link
						className="modal-partner__button"
						onClick={() => setCreated(false)}
						to="/create-store"
					>
						Adicionar novo
					</Link>
				</div>
			</div>
		);
	};

	const PaymentSelected = ({ paymentMethods, onClick }) => {
		return (
			<Link className="dayselected-box" onClick={onClick}>
				<p className="daySelected-text">
					{paymentMethods}
					<span className="daySelected-icon">
						<CloseIcon style={{ fontSize: 13 }} />
					</span>
				</p>
			</Link>
		);
	};

	return (
		<div className="create-partner__container">
			{modal && modalCreated()}
			<form className="create-partner__form" onSubmit={handleOnSubmmit}>
				<h2 className="create-partner__title">
					Preencha as informações do seu negócio
				</h2>
				<label className="create-partner__label">Nome do estabelecimento</label>
				<FormInput
					id="create-partner__input-form"
					type="text"
					name="name"
					value={name}
					handleChange={(e) => setName(e.target.value)}
				/>
				<label className="create-partner__label">Telefone comercial</label>
				<MaskedInput
					id="create-partner__input-form"
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
				<label className="create-partner__label">Website </label>

				<FormInput
					id="create-partner__input-form"
					type="text"
					name="site"
					value={website}
					handleChange={(e) => setWebsite(e.target.value)}
				/>
				<label className="create-partner__label">
					Categoria do estabelecimento
				</label>

				<select
					className="create-partner__select-category"
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="" disabled selected hidden>
						Selecione uma categoria
					</option>
					<option value="postos">Postos</option>
					<option value="locadoras">Locadoras</option>
					<option value="seguros">Seguros</option>
					<option value="alimentação">Alimentação</option>
					<option value="manutenção">Manutenção</option>
					<option value="lava-car">Lava-car</option>
					<option value="lazer">Lazer</option>
				</select>
				<label className="create-partner__label">Horário de atendimento</label>

				<div className="create-partner__time-container">
					<MaskedInput
						className="form-input"
						id="create-partner__input-time"
						placeholder="00:00"
						mask={[/\d/, /\d/, ":", /\d/, /\d/]}
						placeholderChar={"\u2000"}
						value={open_at}
						onChange={(e) => setOpen_at(e.target.value)}
					/>
					<span style={{ fontSize: 14 }}>às</span>
					<MaskedInput
						placeholder="00:00"
						className="form-input"
						id="create-partner__input-time"
						mask={[/\d/, /\d/, ":", /\d/, /\d/]}
						placeholderChar={"\u2000"}
						value={close_at}
						onChange={(e) => setClose_at(e.target.value)}
					/>
				</div>
				<label className="create-partner__label">Métodos de pagamento</label>
				<select
					className="create-partner__payment"
					onChange={(e) => {
						const duplicate = paymentMethods.some(
							(value) => value.paymentMethods === `${e.target.value}`
						);
						if (!duplicate) {
							setPaymenMethods([
								...paymentMethods,
								{ paymentMethods: e.target.value },
							]);
						}
					}}
				>
					<option value="" disabled selected hidden>
						Selecione as formas de pagamento
					</option>
					<option value="dinheiro">Dinheiro</option>
					<option value="mastercard">Matercard</option>
					<option value="visa">Visa</option>
					<option value="picpay">PicPay</option>
				</select>
				<div className="create-coupon__selected-box">
					{paymentMethods.length > 0
						? paymentMethods.map((item) => (
								<React.Fragment key={item.paymentMethods}>
									<PaymentSelected
										paymentMethods={item.paymentMethods}
										onClick={() => {
											setPaymenMethods(
												paymentMethods.filter(
													({ paymentMethods }) => paymentMethods !== item.paymentMethods
												)
											);
										}}
									/>
								</React.Fragment>
						  ))
						: null}
				</div>
				<label className="create-partner__label">Imagem do estabelecimento</label>
				<div className="create-partner__image">
					<UploadImage imageUrl />
				</div>
				<label className="create-partner__label">Endereço comercial</label>
				<div className="create-partner__addrees-group ">
					<FormInput
						id="create-partner__input-street"
						type="text"
						name="rua"
						placeholder="Rua"
						value={street}
						handleChange={(e) => setStreet(e.target.value)}
					/>
					<FormInput
						id="create-partner__input-number"
						type="text"
						name="numero"
						placeholder="Número"
						value={number}
						handleChange={(e) => setNumber(e.target.value)}
					/>
				</div>
				<div>
					<MaskedInput
						id="create-partner__input-form"
						className="form-input"
						placeholder="CEP"
						mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
						placeholderChar={"\u2000"}
						value={cep}
						onChange={(e) => setCep(e.target.value)}
					/>
				</div>
				<FormInput
					id="create-partner__address-form"
					type="text"
					name="cidade"
					placeholder="Cidade"
					value={city}
					handleChange={(e) => setCity(e.target.value)}
				/>
				<select
					className="create-partner__select-category"
					id="create-partner__address-form"
					onChange={(e) => setState(e.target.value)}
				>
					<option value="" disabled selected hidden>
						Estado
					</option>
					<option value="Acre">Acre</option>
					<option value="Alagoas">Alagoas </option>
					<option value="Amapá">Amapá </option>
					<option value="Bahia">Bahia</option>
					<option value="Ceará">Ceará</option>
					<option value="Distrito Federal">Distrito Federal</option>
					<option value="Espírito Santo">Espírito Santo</option>
					<option value="Goiás">Goiás</option>
					<option value="Maranhão">Maranhão</option>
					<option value="Mato Grosso">Mato Grosso</option>
					<option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
					<option value="Minas Gerais">Minas Gerais</option>
					<option value="Distrito Federal">Distrito Federal</option>
					<option value="Pará">Pará</option>
					<option value="Paraíba">Paraíba</option>
					<option value="Paraná">Paraná</option>
					<option value="Pernambuco">Pernambuco</option>
					<option value="Piauí">Piauí</option>
					<option value="Rio de Janeiro<">Rio de Janeiro</option>
					<option value="Rio Grande do Norte">Rio Grande do Norte</option>
					<option value="Rio Grande do Sul">Rio Grande do Sul</option>
					<option value="Rondônia">Rondônia</option>
					<option value="Roraima">Roraima</option>
					<option value="Santa Catarina">Santa Catarina</option>
					<option value="São Paulo">São Paulo</option>
					<option value="Sergipe">Sergipe</option>
					<option value="Tocantins">Tocantins</option>
				</select>
				<CustomButton
					id="create-partner__button"
					name="Cadastrar"
					onClick={() => handleOnSubmmit}
				/>
				{serverError ? <p className="login-error">{serverError}</p> : null}
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	dispatchCreatePartner: (
		user,
		name,
		category,
		address,
		phone,
		website,
		hours,
		payment_methods,
		image,
		onSuccess,
		onError
	) =>
		dispatch(
			createPartner(
				{
					user,
					name,
					category,
					address,
					phone,
					website,
					hours,
					payment_methods,
					image,
				},
				onSuccess,
				onError
			)
		),
	dispatchGetPartnerByUser: (userId) => dispatch(getPartnerByUser(userId)),
});

const mapStateToProps = (state) => ({
	user: state.user,
	uploadImage: state.uploadImage,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateStoreComponent);
