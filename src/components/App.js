import React from 'react';
import { Route, matchPath } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import RecipePage from './RecipePage';
import Login from './Login';
import User from './User';
import { slugify } from '../helpers';
import recipes from '../sample_data/recipes.json';

const findRecipe = (list, url) => {
  const item = list.find(recipe => slugify(recipe.title) === url);
  return item;
};

const getRecipe = () => {
  const { location } = this.props;
  const result = matchPath(location.pathname, {
    path: '/recipe/:recipe',
    exact: true
  });
  const recipe = recipes.results.filter(
    item => slugify(item.title) === result.params.recipe
  );
  return recipe[0];
};

const HomeRoute = () => (
  <Home recipes={[...recipes.results]} filterRecipes={findRecipe} />
);
const LoginRoute = () => <Login />;
const ProfileRoute = () => <User />;
const RecipePageRoute = () => <RecipePage recipes={this.getRecipe()} />;

const App = () => (
  <div className="App">
    <Route
      exact
      path="/:searchString?"
      render={props => (
        <Navbar searchString={props.match.params.searchString} />
      )}
    />

    <Route exact path="/recipe/:id?" component={Navbar} />

    <div className="container mt-10">
      <Route
        exact
        path="/:searchString?"
        render={() => <Home recipes={recipes.results} />}
      />

      <Route
        exact
        path="/recipe/:title?"
        render={props => (
          <RecipePage
            recipe={findRecipe(recipes.results, props.match.params.title)}
          />
        )}
      />

      <div className="container mt-10">
        <Route path="/recipe/recipe" component={RecipePageRoute} />
        <Route path="/user/login" component={LoginRoute} />
        <Route path="/user/profile" component={ProfileRoute} />
        <Route exact path="/" component={HomeRoute} />
      </div>
    </div>
  </div>
);

export default App;
