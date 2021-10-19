import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="name-input">
            <input type="text" data-testid="login-name-input" />
          </label>
          <button type="submit" name="" data-testid="login-submit-button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
