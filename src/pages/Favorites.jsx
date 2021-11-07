import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteTracks: [],
    };
  }

  componentDidMount() {
    this.showFavoriteMusic();
  }

  checkboxChecked = (trackId) => {
    const { favoriteTracks } = this.state;
    const favorite = favoriteTracks.find((song) => song.trackId === trackId);
    if (favorite) return true;
    return false;
  }

  showFavoriteMusic = () => {
    this.setState({ loading: true });
    getFavoriteSongs()
      .then((songs) => this.setState({
        loading: false,
        favoriteTracks: songs,
      }));
  }

  removeFavorites = (track) => {
    this.setState({ loading: true });
    removeSong(track)
      .then(() => getFavoriteSongs())
      .then((songs) => this.setState({
        favoriteTracks: songs,
        loading: false,
      }));
  }

  render() {
    const { loading, favoriteTracks } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <h1>Favorites</h1>
          {loading ? <Loading /> : favoriteTracks.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              onClick={ this.removeFavorites }
              checkbox={ this.checkboxChecked }
            />
          )) }
        </div>
      </div>
    );
  }
}

export default Favorites;
