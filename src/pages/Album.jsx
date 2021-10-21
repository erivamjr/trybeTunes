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

  /* Requisito feito com a ajuda de Assis Meneghetti
  Função requisitada por ultimo com o componentDidMount()
  toda vez que a função é requisitada, é gerada um componente */
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((response) => {
      this.setState({
        musics: response,
      });
    });
  }

  render() {
    const { musics } = this.state;
    const infoAlbuns = musics[0]; // posição do array onde contem as informações do album sem arquivo track
    return (
      <div data-testid="page-album">
        <Header />
        <div>
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
