import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../helpers';

const HighlightSearch = ({ text = '', query = '' }) => {
  if (query === '') return <span>{text}</span>;
  const regex = new RegExp(`(${query})`, 'gi');
  const pieces = text.split(regex);

  return (
    <span>
      {pieces
        .filter(piece => piece)
        .map((piece, index) =>
          regex.test(piece) ? (
            <mark key={index}>{piece}</mark>
          ) : (
            <span key={index}>{piece}</span>
          )
        )}
    </span>
  );
};

const RecipeItem = ({
  title = '',
  ingredients = '',
  thumbnail = '',
  searchString
}) => (
  <div className="col-sm-3 mt-4">
    <Link to={`/recipe/${slugify(title)}`}>
      <div className="card">
        <img className="card-img-top img-fluid" src={thumbnail} alt="" />
        <div className="card-body">
          <h5 className="card-title">
            <HighlightSearch query={searchString} text={title} />
          </h5>
          <p className="card-text">
            <strong>Ingredients: </strong>
            <HighlightSearch query={searchString} text={ingredients} />
          </p>
        </div>
      </div>
    </Link>
  </div>
);

export default RecipeItem;
