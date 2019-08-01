import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';
import { withRouter } from 'react-router-dom';

const filterRecipes = (recipes, search = '') => {
  return recipes.filter(
    recipe =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(search.toLowerCase())
  );
};

const Home = ({ recipes = [], match }) => {
  const listRecipes = filterRecipes(recipes, match.params.searchString);

  return (
    <Fragment>
      <div className="row">
        {listRecipes.length !== 0 ? (
          listRecipes.map((recipe, index) => (
            <RecipeItem key={index} {...recipe} />
          ))
        ) : (
          <h1>No results</h1>
        )}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.array
};

export default withRouter(Home);
