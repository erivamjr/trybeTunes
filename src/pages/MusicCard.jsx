import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() { // simplismente cria o card da musica
    const { previewUrl, trackName, trackId, onClick, checkbox } = this.props;
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
            checked={ checkbox(trackId) }
            id="favorite-music"
            name="favorite-music"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => onClick({ trackId, trackName, previewUrl }) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checkbox: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MusicCard;
