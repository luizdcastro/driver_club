import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import CategoryCard from '../../components/category-card/category-card.component';
import { selectCategorySections } from '../../redux/reducers/category/category.selector';
import './category.styles.css';

const Category = ({ category }) => {
  return (
    <div className="category">
      <div className="category-container">
        <div className="category-title">
          <h2 className="category-title__greeting">Olá Luiz,</h2>
          <h3 className="category-title__text">
            Encontre descontos navegando por categoria
          </h3>
        </div>
        <div className="category-main">
          {category.map((item) => (
            <React.Fragment key={item.id}>
              <CategoryCard
                to={`/categories/${item.title.toLowerCase()}`}
                name={item.title}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  category: selectCategorySections,
});

export default connect(mapStateToProps)(Category);
