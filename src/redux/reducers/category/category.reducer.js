import IconRental from '../../../assets/icons/icon-rental.png';
import IconRestaurant from '../../../assets/icons/icon_restaurant.png';
import IconMaintence from '../../../assets/icons/icon_maintence.png';
import IconInsurance from '../../../assets/icons/icon_insurance.png';
import IconGas from '../../../assets/icons/icon_gas.png';
import IconLazer from '../../../assets/icons/icon_lazer.png';
import IconLavacar from '../../../assets/icons/icon_lavacar.png';

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
