const INITIAL_STATE = {
  categories: [
    {
      title: 'Postos',
      imageUrl: '',
      id: 1,
      linkUrl: 'category/postos',
    },
    {
      title: 'Locadoras',
      imageUrl: '',
      id: 2,
      linkUrl: 'category/locadoras',
    },
    {
      title: 'Seguros',
      imageUrl: '',
      id: 3,
      linkUrl: 'category/seguros',
    },
    {
      title: 'Alimentação',
      imageUrl: '',
      id: 4,
      linkUrl: 'category/alimentacao',
    },
    {
      title: 'Manutenção',
      imageUrl: '',
      id: 5,
      linkUrl: 'category/manutencao',
    },
    {
      title: 'Lava-car',
      imageUrl: '',
      id: 6,
      linkUrl: 'category/lava-car',
    },
    {
      title: 'Lazer',
      imageUrl: '',
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
