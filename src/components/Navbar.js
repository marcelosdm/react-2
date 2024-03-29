import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import loginService from '../services/loginService';
import { withRouter } from 'react-router-dom';

const Navbar = props => (
  <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
    <div className="navbar-brand col-1">
      <img src={logo} className="Navbar-logo" alt="logo" />
    </div>

    <div className="form-group justify-content-center row col-10 my-2">
      <input
        value={props.searchString}
        onChange={e => props.history.push(`/${e.target.value}`)}
        className="form-control col-9 mr-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </div>

    {// Criar lógica de roteamento de login/profile
    loginService.isLogged() ? (
      <Link to="/user/profile">
        <button className="btn btn-secondary">
          {loginService.getUser().username}
        </button>
      </Link>
    ) : (
      <Link to="/user/login">
        <button className="btn btn-secondary">Login</button>
      </Link>
    )}
  </nav>
);

Navbar.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  searchString: PropTypes.string
};

export default withRouter(Navbar);
