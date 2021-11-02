import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isSaveButtonDisabled: true,
      loading: false,
      redirect: false,
    };
    this.makeChange = this.makeChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  async handleOnClick(userName) {
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ redirect: true });
  }

  makeChange({ target }) {
    this.setState({ userName: target.value }, this.checkButton);
  }

  checkButton() {
    const { userName } = this.state;
    const MIN_LENGTH = 3;
    if (userName.length >= MIN_LENGTH) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  render() {
    const { userName, isSaveButtonDisabled, loading, redirect } = this.state;
    if (loading) {
      return redirect ? <Redirect to="/search" /> : <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            <input
              type="text"
              data-testid="login-name-input"
              value={ userName }
              onChange={ this.makeChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isSaveButtonDisabled }
            onClick={ () => this.handleOnClick(userName) }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

export default Login;
