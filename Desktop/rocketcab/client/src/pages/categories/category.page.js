import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CategoryCard from '../../components/category-card/category-card.component';
import { selectCategorySections } from '../../redux/reducers/category/category.selector';
import { selectGetMeData } from '../../redux/reducers/getme/getme.selector';
import './category.styles.css';

const Category = ({ category, getme }) => {
  return (
    <div className="category">
      <div className="category-container">
        <div className="category-title">
          <h2 className="category-title__greeting">
            Olá {getme[0].name.split(' ')[0]}
          </h2>
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
  getme: selectGetMeData,
});

export default connect(mapStateToProps)(Category);
