import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Favorite from "../../components/favorite/favorite.component";
import DiscontCard from "../../components/discont-card/discont-card.component";
import { fetchPartnerDetails } from "../../redux/actions/partner.actions";
import "./partner-details.styles.css";

const PartnerDetails = ({ partner, dispatchPartnerDetails }) => {
	const [partnerDetail, setPartnerDetail] = useState("");
	const [details, setDetails] = useState([]);
	const { partnerId } = useParams();

	// Get partner details
	useEffect(() => {
		if (partnerId) {
			dispatchPartnerDetails(partnerId);
		}
	}, [dispatchPartnerDetails, partnerId]);

	useEffect(() => {
		if (partner.length > 0) {
			setPartnerDetail(partner[0]);
		}
	}, [partner]);

	// Expanded partner details info

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
		<div className="partner-datails__container">
			<div className="partner-details__hero">
				<h3 className="details-hero__title">{partnerDetail.name}</h3>
				<p className="details-hero__subtitle">{partnerDetail.category}</p>
				<div className="details_favicon">
					<Favorite />
				</div>
			</div>
			<div className="partner-details__info">
				<h3 className="info-title">Informações adicionais</h3>
				<ExpandMoreIcon
					onClick={() => toggleShow(partnerId)}
					className="info-dropicon"
					style={{ fontSize: 40 }}
				/>
				<p className="info-address">
					Endereço: {partner[0].address.street}, {partner[0].address.number}
				</p>
				<p className="info-time">
					Horário de atendimento: {partner[0].hours.open_at} às{" "}
					{partner[0].hours.close_at}
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
			<div className="partner-details__disconts">
				<h3 className="disconts-title">Descontos disponíveis</h3>
				{partnerDetail.discont
					? partnerDetail.discont.map((item) => (
							<React.Fragment key={item._id}>
								<div className="discont-cards">
									<DiscontCard
										couponId={item._id}
										title={item.name}
										percentage={item.percentage}
										days={item.days}
										time={item.time}
										description={item.description}
									/>
								</div>
							</React.Fragment>
					  ))
					: null}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	partner: state.partner,
});

const mapDispatchToProps = (dispatch) => ({
	dispatchPartnerDetails: (partnerId) =>
		dispatch(fetchPartnerDetails(partnerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDetails);
