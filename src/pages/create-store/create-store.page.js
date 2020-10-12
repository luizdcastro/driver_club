import React from 'react';

import CreateStoreComponent from '../../components/create-store/create-store.component';
import './create-store.styles.css';

const CreateStore = () => {
  return (
    <div className="create-store__page-container">
       <h2 className="create-store__page-title">Adicionar novo estabelecimento</h2>
      <CreateStoreComponent />
    </div>
  );
};
export default CreateStore;
