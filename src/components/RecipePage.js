import React from 'react';
import PropTypes from 'prop-types';
import CommentsBlock from './CommentsBlock';
import { withRouter } from 'react-router-dom';
import { slugify } from '../helpers';

const RecipePage = ({ recipe }) => {
  return recipe ? (
    <div className="col-sm-3 rounded mx-auto d-block mt-4">
      <img
        className="card-img-top img-fluid"
        src={recipe.thumbnail}
        alt={recipe.title}
      />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">
          <strong>Ingredients: </strong>
          {recipe.ingredients}
        </p>
      </div>
      <CommentsBlock slugify={slugify(recipe.title)} />
    </div>
  ) : (
    <h1>Recipe not found</h1>
  );
};
RecipePage.propTypes = {
  recipe: PropTypes.object
};

export default withRouter(RecipePage);
