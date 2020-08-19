import IconRental from '../../../assets/icons/bicycle-parking.svg';
import IconRestaurant from '../../../assets/icons/groceries.svg';
import IconMaintence from '../../../assets/icons/crane.svg';
import IconInsurance from '../../../assets/icons/test.svg';
import IconGas from '../../../assets/icons/gas-station.svg';
import IconLazer from '../../../assets/icons/validating-ticket.svg';
import IconLavacar from '../../../assets/icons/clean.svg';

const INITIAL_STATE = {
  categories: [
    {
      title: 'Postos',
      imageUrl: `${IconGas}`,
      id: 1,
      linkUrl: 'category/postos',
    },
    {
      title: 'Locadoras',
      imageUrl: `${IconRental}`,
      id: 2,
      linkUrl: 'category/locadoras',
    },
    {
      title: 'Seguros',
      imageUrl: `${IconInsurance}`,
      id: 3,
      linkUrl: 'category/seguros',
    },
    {
      title: 'Alimentação',
      imageUrl: `${IconRestaurant}`,
      id: 4,
      linkUrl: 'category/alimentacao',
    },
    {
      title: 'Manutenção',
      imageUrl: `${IconMaintence}`,
      id: 5,
      linkUrl: 'category/manutencao',
    },
    {
      title: 'Lava-car',
      imageUrl: `${IconLavacar}`,
      id: 6,
      linkUrl: 'category/lava-car',
    },
    {
      title: 'Lazer',
      imageUrl: `${IconLazer}`,
      id: 7,
      linkUrl: 'category/lava-car',
    },
  ],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default categoryReducer;
