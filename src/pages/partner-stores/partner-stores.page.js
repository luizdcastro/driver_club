import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PartnerCard from "../../components/partner-card/partner-card.component";
import { getPartnerByUser } from "../../redux/actions/partner.actions";
import PartnerIcon from "../../assets/icons/partner.svg";
import "./partner-stores.styles.css";

const PartnerStores = ({ dispatchGetPartners, user, partner }) => {
	const userId = user.userId;

	useEffect(() => {
		if (userId) {
			dispatchGetPartners(userId);
		}
	}, [dispatchGetPartners, userId]);

	return (
		<div className="partner-stores__page">
			<h1 className="partner-stores__page-title">Meus estabelecimentos</h1>
			<div className="partners-container">
				<div className="partners-grid">
					{(partner.length >= 1) & (partner[0] != null) ? (
						partner.map((item) => (
							<React.Fragment key={item._id}>
								<PartnerCard
									to={`/partner-edit/${item._id}`}
									name={item.name}
									category={item.category}
									address={item.address}
									image={item.image}
								/>
							</React.Fragment>
						))
					) : (
						<div className="no-partner__discont-container">
							<div>
								<img className="no-partner__icon" src={PartnerIcon} alt="" />
								<p className="no-partner__discont-text">
									Você não possui estabelecimentos.
								</p>
								<Link className="no-partner__discont-link" to="/categories">
									Voltar para categorias
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	dispatchGetPartners: (userId) => dispatch(getPartnerByUser(userId)),
});

const mapStateToProps = (state) => ({
	user: state.user,
	partner: state.partner,
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerStores);
