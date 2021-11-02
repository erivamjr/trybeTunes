import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchAlbum: '',
      nameInput: '',
      loading: false,
      isSaveButtonDisabled: true,
      albums: [],
    };
    this.makeChange = this.makeChange.bind(this);
    this.searchAlbumsMusic = this.searchAlbumsMusic.bind(this);
  }

  makeChange({ target }) {
    const { value } = target;
    this.setState({ searchAlbum: value }, this.checkButton);
  }

  checkButton() {
    const { searchAlbum } = this.state;
    const MIN_LENGTH = 2;
    if (searchAlbum.length >= MIN_LENGTH) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  searchAlbumsMusic(e) {
    e.preventDefault();
    const { searchAlbum } = this.state;
    this.setState(
      { searchAlbum: '', loading: true }, // setando loading para true para depois execulcar a callback
      () => searchAlbumsAPI(searchAlbum).then((promise) => {
        // console.log(promise);
        this.setState({ loading: false,
          albums: promise,
          nameInput: searchAlbum });
      }),
    );
  }

  render() {
    const { searchAlbum,
      isSaveButtonDisabled,
      loading,
      albums,
      nameInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form action="">
            <label htmlFor="search-artist-input">
              <input
                type="text"
                name="searchAlbum"
                data-testid="search-artist-input"
                value={ searchAlbum }
                onChange={ this.makeChange }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.searchAlbumsMusic }
            >
              Pesquisar

            </button>
          </form>
        )}
        <p>
          {`Resultado de álbuns de: ${nameInput}`}
        </p>
        {albums.length
          ? (
            <div>
              <ul>
                {albums
                  .map(({ collectionName, collectionId, artworkUrl100 }) => (
                    <li key={ collectionId }>
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        {collectionName}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )
          : <p>Nenhum álbum foi encontrado</p>}

      </div>
    );
  }
}

export default Search;
