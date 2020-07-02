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
  ],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default categoryReducer;
