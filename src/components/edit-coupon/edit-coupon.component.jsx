import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import MaskedInput from "react-text-mask";
import { editCoupon, getCoupon } from "../../redux/actions/discont.actions";
import { fetchPartnerDetails } from "../../redux/actions/partner.actions";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";

import "./edit-coupon.styles.css";

const EditCoupon = ({
	dispatchPartnerDetails,
	dispatchEditCoupon,
	dispathCouponDetails,
	partnerId,
	couponId,
	setModalEditCoupon,
	discont,
}) => {
	const [name, setName] = useState("");
	const [percentage, setPercentage] = useState("");
	const [fromTime, setFromTime] = useState("");
	const [untilTime, setUntilTime] = useState("");
	const [days, setDays] = useState([]);
	const [description, setDescription] = useState("");
	const time = { fromTime: fromTime, untilTime: untilTime };

	useEffect(() => dispatchPartnerDetails(partnerId), [
		dispatchPartnerDetails,
		partnerId,
	]);

	useEffect(() => {
		dispathCouponDetails(couponId);
	}, [dispathCouponDetails, couponId]);

	const couponData = discont;

	useMemo(() => {
		if (couponData[0]) {
			setName(couponData[0].name);
			setPercentage(couponData[0].percentage);
			setFromTime(couponData[0].time.fromTime);
			setUntilTime(couponData[0].time.untilTime);
			setDays(couponData[0].days);
			setDescription(couponData[0].description);
		}
		if (couponData.data) {
			setName(couponData.data.name);
			setPercentage(couponData.data.percentage);
			setFromTime(couponData.data.time.fromTime);
			setUntilTime(couponData.data.time.untilTime);
			setDays(couponData.data.days);
			setDescription(couponData.data.description);
		}
	}, [couponData]);

	const handleEditCoupon = (event) => {
		event.preventDefault();
		dispatchEditCoupon(
			name,
			percentage,
			time,
			days,
			description,
			couponId,
			() => {
				setModalEditCoupon(false);
				dispatchPartnerDetails(partnerId);
			},
			() => console.log("Erro ao editar desconto")
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
				onClick={() => {
					dispatchPartnerDetails(partnerId);
					setModalEditCoupon(false);
				}}
			/>
			<form className="create-coupon__form" onSubmit={handleEditCoupon}>
				<label>Titulo do desconto</label>
				<FormInput
					id="create-coupun__input"
					placeHolder=""
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<label>Percentual</label>
				<MaskedInput
					className="form-input"
					id="create-coupun__input"
					placeholder="20%"
					mask={[/\d/, /\d/, "%"]}
					placeholderChar={"\u2000"}
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
						mask={[/\d/, /\d/, ":", /\d/, /\d/]}
						placeholderChar={"\u2000"}
						value={fromTime}
						onChange={(e) => setFromTime(e.target.value)}
					/>
					<span style={{ fontSize: 14 }}>às</span>
					<MaskedInput
						placeholder="00:00"
						className="form-input"
						id="create-coupon__time-input"
						mask={[/\d/, /\d/, ":", /\d/, /\d/]}
						placeholderChar={"\u2000"}
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
					name="Salvar alteraçao"
					onClick={() => handleEditCoupon}
				/>
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	dispatchPartnerDetails: (partnerId) =>
		dispatch(fetchPartnerDetails(partnerId)),
	dispathCouponDetails: (couponId) => dispatch(getCoupon(couponId)),
	dispatchEditCoupon: (
		name,
		percentage,
		time,
		days,
		description,
		couponId,
		onSuccess,
		onError
	) =>
		dispatch(
			editCoupon(
				{
					name,
					percentage,
					time,
					days,
					description,
				},
				couponId,
				onSuccess,
				onError
			)
		),
});

const mapStateToProps = (state) => ({
	discont: state.discont,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCoupon);
