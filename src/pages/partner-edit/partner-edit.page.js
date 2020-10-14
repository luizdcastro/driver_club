import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getMe } from "../../redux/actions/getme.action.js";
import { fetchPartnerDetails } from "../../redux/actions/partner.actions";
import EditStore from "../../components/edit-store/edit-store.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./partner-edit.styles.css";

const PartnerEdit = ({
	partner,
	dispatchPartnerDetails,
	dispatchGetMeAction,
}) => {
	const [partnerDetail, setPartnerDetail] = useState("");
	const [details, setDetails] = useState([]);
	const [modalEditPartner, setModalEditPartner] = useState(false);
	const { partnerId } = useParams();

	useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

	useEffect(() => dispatchPartnerDetails(partnerId), [
		partnerId,
		dispatchPartnerDetails,
	]);

	useEffect(() => {
		if (partner.length > 0) {
			setPartnerDetail(partner[0]);
		}
	}, [partner]);

	const toggleShow = (id) => {
		const showState = details.slice();
		const index = showState.indexOf(id);
		if (index >= 0) {
			showState.splice(index, 1);
			setDetails(showState);
		} else {
			showState.push(id);
			setDetails(showState);
		}
	};

	const openGoogleMap = () => {
		window.open(
			`https://www.google.com/maps/dir/?api=1&destination=${partner[0].address.street},${partner[0].address.number}&travelmode=driving`
		);
	};

	return (
		<div className="partner-edit__container">
			<div className="partner-details__hero">
				<h3 className="details-hero__title">{partnerDetail.name}</h3>
				<p className="details-hero__subtitle">{partnerDetail.category}</p>
				<div className="partner-edit__button-container">
					<button
						className="partner-edit__button__edit"
						onClick={() => setModalEditPartner(!modalEditPartner)}
					>
						Editar
					</button>
					<button className="partner-edit__button__delete" onClick={() => {}}>
						Deletar
					</button>
				</div>
			</div>
			{modalEditPartner ? (
				<div className="edit-partner__modal-container ">
					<EditStore
						partnerId={partnerId}
						modalEditCoupon={modalEditPartner}
						setModalEditPartner={setModalEditPartner}
					/>
				</div>
			) : null}
			<div className="partner-details__info">
				<h3 className="info-title">Informações adicionais</h3>
				<ExpandMoreIcon
					onClick={() => toggleShow(partnerId)}
					className="info-dropicon"
					style={{ fontSize: 40 }}
				/>
				<p className="info-address">
					Endereço: {partnerDetail && partnerDetail.address.street},{" "}
					{partnerDetail && partnerDetail.address.number}
				</p>
				<p className="info-time">
					Horário de atendimento: {partnerDetail && partnerDetail.hours.open_at} às{" "}
					{partnerDetail && partnerDetail.hours.close_at}
				</p>
			</div>
			{details.includes(partnerId) && (
				<div className="expanded-details">
					<h3 className="expanded-payment">Formas de pagamento</h3>
					<ul className="payment-list">
						{partnerDetail.payment_methods.map((item) => (
							<React.Fragment key={item.paymentMethods}>
								<li className="payment-item">{item.paymentMethods}</li>
							</React.Fragment>
						))}
					</ul>
					<h3 className="expanded-contact">Contato</h3>
					<p className="expanded-phone">
						Telefone:
						<span>
							<a id="links" href={`tel:${partnerDetail.phone}`}>
								{partnerDetail.phone}
							</a>
						</span>
					</p>
					<p className="expanded-site">
						Website:{" "}
						<span>
							<a id="links" href={`http://${partnerDetail.website}`} target="_blank">
								{partnerDetail.website}
							</a>
						</span>
					</p>
					<h3 className="expanded-map">Mostrar no mapa</h3>
					<button className="expanded-button__map" onClick={openGoogleMap}>
						Abrir com Google Maps
					</button>
				</div>
			)}
			<div className="partner-edit__preview-box">
				<p className="partner-edit__image-title ">
					Pré-visualização do estabelecimento
				</p>
				<div className="partner-edit__card-preview">
					<PartnerCard
						name={partnerDetail.name}
						category={partnerDetail.category}
						address={partnerDetail && partnerDetail.address}
						image={partnerDetail.image}
					/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	partner: state.partner,
});

const mapDispatchToProps = (dispatch) => ({
	dispatchGetMeAction: () => dispatch(getMe()),

	dispatchPartnerDetails: (partnerId) =>
		dispatch(fetchPartnerDetails(partnerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerEdit);
