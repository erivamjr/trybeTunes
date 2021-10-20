import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchAlbum: '',
      isSaveButtonDisabled: true,
    };
    this.makeChange = this.makeChange.bind(this);
  }

  makeChange({ target }) {
    this.setState({ searchAlbum: target.value }, this.checkButton);
  }

  checkButton() {
    const { searchAlbum } = this.state;
    const minLength = 2;
    if (searchAlbum.length >= minLength) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  render() {
    const { searchAlbum, isSaveButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
