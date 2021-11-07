import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.showUser();
  }

  showUser = () => {
    this.setState({ loading: true });
    getUser()
      .then((user) => this.setState({
        loading: false,
        users: user,
      }));
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        {loading ? <Loading />
          : (
            <div>
              <img
                data-testid="profile-image"
                src={ `${users.image}` }
                alt={ users.name }
              />
              <h1>{users.name}</h1>
              <h4>{users.email}</h4>
              <h4>{users.description}</h4>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
