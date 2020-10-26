import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PartnerCard from "../../components/partner-card/partner-card.component";
import { getPartnerByUser } from "../../redux/actions/partner.actions";
import PartnerIcon from "../../assets/icons/partner.svg";
import "./create-discont.css";

const CreateDiscont = ({ dispatchGetPartners, user, partner }) => {
	const [filteredPartners, setFilteredPartners] = useState([]);
	const userId = user.userId;

	useEffect(() => {
		if (userId) {
			dispatchGetPartners(userId);
		}
	}, [dispatchGetPartners, userId]);

	useEffect(() => {
		setFilteredPartners(partner);
	}, [setFilteredPartners, partner]);
	return (
		<div className="create-discont__page">
			<h1 className="create-discont__page-title">Selecione o estabelecimento</h1>
			<div className="partners-container">
				<div className="partners-grid">
					{filteredPartners.length >= 1 ? (
						filteredPartners.map((item) => (
							<React.Fragment key={item._id}>
								<PartnerCard
									to={`/discont-details/${item._id}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDiscont);
