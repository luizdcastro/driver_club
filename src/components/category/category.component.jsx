import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectCategorySections } from '../../redux/reducers/category/category.selector';
import './category.styles.css';

const Category = ({ category }) => {
  return (
    <div>
      {category.map((item) => (
        <React.Fragment key={item.id}>
          <div>
            <p>{item.id}</p>
            <Link to={`/categories/${item.title.toLowerCase()}`}>
              {item.title}
            </Link>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  category: selectCategorySections,
});

export default connect(mapStateToProps)(Category);
