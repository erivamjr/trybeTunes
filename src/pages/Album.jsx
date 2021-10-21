import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = ({
      musics: [],
    });
  }

  componentDidMount() { // Essa função é executada no momento que o componente é montado. Por isso funciona como um evento uma vez que foi criado um link em todos os albuns, então uma vez que vc clica nele 'gera' um novo componente
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((response) => {
      this.setState({
        musics: response,
      });
    });
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="page-album">
          {musics.length
          && (
            <div>
              <img
                src={ infoAlbuns.artworkUrl100 }
                alt={ infoAlbuns.collectionName }
              />
              <h4 data-testid="artist-name">{ infoAlbuns.artistName }</h4>
              <h4 data-testid="album-name">{ infoAlbuns.collectionName }</h4>
            </div>
          )}
          { musics
            .filter((music) => music.trackId)
            .map((music, index) => (
              <MusicCard
                key={ index }
                music={ music }
              />
            ))}
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
