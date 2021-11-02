import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = ({
      musics: [], // renderiza as musicas na tela
      loading: false, // renderiza carregando... quando true
      favoriteTracks: [], // guarda musicas favoritas
    });
    this.favoriteTrack = this.favoriteTrack.bind(this);
    this.addFavorites = this.addFavorites.bind(this);
    this.findFavorite = this.findFavorite.bind(this);
    this.checkboxChecked = this.checkboxChecked.bind(this);
  }

  /* Requisito feito com a ajuda de Assis Meneghetti
  Função requisitada por ultimo com o componentDidMount()
  toda vez que a função é requisitada, é gerada um
  componente de cada card de musica */
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((response) => {
      this.setState({
        musics: response,
      });
    });
    this.addFavorites();
  }

  // adiciona os cards a favoriteTracks para usar como favoritos
  addFavorites() {
    this.setState({
      loading: true,
    });
    getFavoriteSongs().then((musicsFavorites) => {
      this.setState({
        loading: false,
        favoriteTracks: musicsFavorites,
      });
    });
  }

  /* função que vai retornar true ou false dependendo
  do que tiver dentro do array favoritetracks ex: caso
  ja tiver uma musica igual, retorna false, caso não,
  retorna true */
  checkboxChecked(trackId) {
    const { favoriteTracks } = this.state;
    const favorite = favoriteTracks.find((track) => track.trackId === trackId);
    if (favorite) return true;
    return false;
  }

  /* função criada para retornar true or false,
  para ser usada na função favoriteTrack e assim
  não ficar tão grande */
  findFavorite(music) {
    const { favoriteTracks } = this.state;
    return favoriteTracks.find((favMusic) => (
      music.trackId === favMusic.trackId
    ));
  }

  // função que vai adicionar ou remover a musica dos favoritos
  favoriteTrack(music) {
    const favorite = this.findFavorite(music);
    this.setState({ loading: true });
    if (!favorite) {
      addSong(music)
        .then(() => this.setState((prevState) => ({
          loading: false,
          favoriteTracks: [...prevState.favoriteTracks, music],
        })));
    } else {
      this.setState({ loading: true });
      removeSong(music)
        .then(() => this.setState((prevState) => ({
          favoriteTracks: prevState.favoriteTracks.filter((favTrack) => (
            favTrack.trackId !== music.trackId
          )),
          loading: false,
        })));
    }
  }

  render() {
    const { musics, loading } = this.state;
    const infoAlbuns = musics[0]; // posição do array onde contem as informações do album sem arquivo track
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { loading ? <Loading />
            : musics.length
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
            .map((music) => (
              <MusicCard
              // props sendo passada para MusicCard
                key={ music.trackId }
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
                trackId={ music.trackId }
                onClick={ this.favoriteTrack }
                checkbox={ this.checkboxChecked }
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
