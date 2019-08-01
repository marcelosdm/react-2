import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { register, login, isLogged } from '../services/loginService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      action: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, action } = this.state;
    try {
      if (action === 'register') {
        register({ username, password });
      }
      login({ username, password });
      this.setState({ username: '', password: '', action: '' });
    } catch (error) {
      return error;
    }
  };

  handleAction = e => {
    this.setState({ action: e.target.name });
  };

  render = () => {
    const { username, password } = this.state;
    if (isLogged()) {
      return <Redirect to="/" />;
    }
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Login / Register</h1>
        </div>

        <div className="form-label-group">
          <label htmlFor="inputEmail">Username</label>
          <input
            name="username"
            onChange={this.handleChange}
            value={username}
            className="form-control"
            placeholder="Username"
            required
          />
        </div>

        <div className="form-label-group mt-2">
          <label htmlFor="inputPassword">Password</label>
          <input
            name="password"
            onChange={this.handleChange}
            value={password}
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>

        <div className="mt-5">
          <button
            className="login btn btn-lg btn-primary btn-block"
            type="submit"
            name="login"
            onClick={this.handleAction}
          >
            Login
          </button>
          <button
            className="register btn btn-lg btn-secondary btn-block"
            type="submit"
            name="register"
            onClick={this.handleAction}
          >
            Register
          </button>
        </div>
      </form>
    );
  };
}

export default Login;
