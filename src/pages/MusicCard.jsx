import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() { // simplismente cria o card da musica
    const { music: { previewUrl, trackName, trackId }, onClick } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor="favorite-music">
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            name="favorite-music"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => onClick() }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MusicCard;
