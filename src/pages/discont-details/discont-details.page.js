import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import CreateCoupon from '../../components/create-coupon/create-coupon.component';
import PartnerDiscont from '../../components/partner-discont-card/partner-discont-card.component';
import { fetchPartnerDetails } from '../../redux/actions/partner.actions';
import './discont-details.styles.css';

const DiscontDetails = ({ partner, dispatchPartnerDetails }) => {
  const [partnerDetail, setPartnerDetail] = useState('');
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [couponCreated, setCouponCreated] = useState(false);
  const { partnerId } = useParams();

  useEffect(() => dispatchPartnerDetails(partnerId), [
    partnerId,
    dispatchPartnerDetails,
  ]);

  useEffect(() => {
    if (partner.length > 0) {
      setPartnerDetail(partner[0]);
    }
  }, [partner, couponCreated]);

  return (
    <div className="discont-details__page">
      <div className="discont-details__partner-info">
        <div>
          <h2>{partnerDetail.name}</h2>
          <p>Categoria: {partnerDetail.category}</p>
          <p>
            Endereço: {partner[0].address.street}, {partner[0].address.number}
          </p>
          <p>Contato: {partnerDetail.phone}</p>
        </div>
      </div>
      <div className="discont-details__button-box">
        <Link
          className="discont-details__button-add"
          onClick={() => setModalAddVisible(true)}
        >
          Adicionar novo desconto
        </Link>
        {modalAddVisible ? (
          <div className="discont-modal__container">
            <CreateCoupon
              partnerId={partnerId}
              setModalAddVisible={setModalAddVisible}
              setCouponCreated={setCouponCreated}
              couponCreated={couponCreated}
            />
          </div>
        ) : null}
      </div>
      <div className="discont-details__discont-list ">
        <h3 className="discont-details__title-list ">Descontos adicionados</h3>
        {partnerDetail.discont && !!partnerDetail.discont.length ? (
          partnerDetail.discont.map((item) => (
            <React.Fragment key={item._id}>
              <div className="discont-cards">
                <PartnerDiscont
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
        ) : (
          <div className="discont-details__no-data">
            <p>Estabelecimento ainda não possui descontos disponíveis</p>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscontDetails);
