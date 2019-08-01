import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { logout, isLogged } from '../services/loginService';

const handleLogout = props => {
  logout();
  return props.history.push('/user/login');
};

const User = props =>
  !isLogged() ? (
    <Redirect to="/" />
  ) : (
    <button className="btn" onClick={() => handleLogout(props)}>
      Logout
    </button>
  );

export default withRouter(User);
