import IconOne from '../../../assets/images/icon_one.svg';
import IconTwo from '../../../assets/images/icon_two.svg';
import IconThree from '../../../assets/images/icon_three.svg';

const INITIAL_STATE = {
  categories: [
    {
      title: 'Postos',
      imageUrl: `${IconOne}`,
      id: 1,
      linkUrl: 'category/postos',
    },
    {
      title: 'Locadoras',
      imageUrl: `${IconTwo}`,
      id: 2,
      linkUrl: 'category/locadoras',
    },
    {
      title: 'Seguros',
      imageUrl: `${IconThree}`,
      id: 3,
      linkUrl: 'category/seguros',
    },
    {
      title: 'Alimentação',
      imageUrl: `${IconOne}`,
      id: 4,
      linkUrl: 'category/alimentacao',
    },
    {
      title: 'Manutenção',
      imageUrl: `${IconTwo}`,
      id: 5,
      linkUrl: 'category/manutencao',
    },
    {
      title: 'Lava-car',
      imageUrl: `${IconThree}`,
      id: 6,
      linkUrl: 'category/lava-car',
    },
    {
      title: 'Lazer',
      imageUrl: `${IconOne}`,
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
