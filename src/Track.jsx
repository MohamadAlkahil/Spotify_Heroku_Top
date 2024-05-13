import React from 'react';

function Track({ trackData }) {
  return (
    <div className="track-wrapper">
      <img className="track-image" src={trackData.album.images[0].url} />
      <p className="track-name">{trackData.name}</p>
      <p className="track-album-artist">{trackData.artists[0].name} - {trackData.album.name}</p>
    </div>
  );
}

export default Track;
