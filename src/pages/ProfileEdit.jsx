import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
      loading: false,
      isButtonValidate: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.showUser();
  }

  saveEdit = (event) => {
    const { name, email, image, description } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    updateUser({ image, name, email, description })
      .then(() => this.setState({
        loading: false,
        redirect: true,
      }));
  }

  showUser = () => {
    this.setState({ loading: true });
    getUser()
      .then((user) => this.setState({
        loading: false,
        image: user.image,
        name: user.name,
        email: user.email,
        description: user.description,
      }));
  }

  // função retirada desse endereço que retorna um boleano
  // https://www.ti-enxame.com/pt/javascript/validacao-de-e-mail-de-expressao-regular-em-javascript/957575053/
 isEmail = (email) => {
   const pattern = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
   return pattern.test(email); // returns a boolean
 }

 // função retirada do endereço
 // https://www.devmedia.com.br/validando-e-mail-em-inputs-html-com-javascript/26427
 /* isEmail = (email) => {
   const usuario = email.substring(0, email.indexOf('@'));
   const dominio = email.substring(email.indexOf('@') + 1, email.length);
   const NUMBER_LENGTH = 3;

   if ((usuario.length >= 1)
      && (dominio.length >= NUMBER_LENGTH)
      && !(usuario.search('@'))
      && !(dominio.search('@'))
      && !(usuario.search(' '))
      && !(dominio.search(' '))
      && (dominio.search('.'))
      && (dominio.indexOf('.') >= 1)
      && (dominio.lastIndexOf('.') < dominio.length - 1)) {
     return true;
   }
   return false;
 } */

  changeHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.saveButtonOfValidation());
  }

  saveButtonOfValidation = () => {
    const { image, name, email, description } = this.state;
    let isButtonValidate = true;
    const isEmail = this.isEmail(email);
    console.log(isEmail);
    if (image && name && description && isEmail) isButtonValidate = false;
    this.setState({ isButtonValidate });
  }

  render() {
    const { name, email, image,
      description, loading, isButtonValidate, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          <h1>Profile-Edit</h1>
          <h1>Editar perfil</h1>
          {loading ? <Loading /> : (
            <div>
              {redirect && <Redirect to="/profile" />}
              <form className="profile-edit" action="">
                <label htmlFor="profile-image">
                  Image:
                  <input
                    name="image"
                    id="profile-image"
                    data-testid="edit-input-image"
                    type="text"
                    value={ image }
                    onChange={ this.changeHandler }
                  />
                </label>
                <label htmlFor="profile-name">
                  UserName:
                  <input
                    name="name"
                    id="profile-name"
                    data-testid="edit-input-name"
                    value={ name }
                    onChange={ this.changeHandler }
                  />
                </label>
                <label htmlFor="profile-email">
                  <input
                    name="email"
                    id="profile-email"
                    data-testid="edit-input-email"
                    type="email"
                    value={ email }
                    onChange={ this.changeHandler }
                  />
                </label>
                <textarea
                  data-testid="edit-input-description"
                  cols="30"
                  rows="10"
                  name="description"
                  value={ description }
                  onChange={ this.changeHandler }
                />
                <button
                  disabled={ isButtonValidate }
                  onClick={ this.saveEdit }
                  type="submit"
                  data-testid="edit-button-save"
                >
                  Salvar
                </button>

              </form>
            </div>
          )}
        </div>
      </div>);
  }
}

export default ProfileEdit;
