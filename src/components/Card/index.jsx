import React from 'react';
import dataAlbum from '../../data/dataAlbum';
import './index.css';

export default function Card() {
  return (
    <div className="card">
      <img src={dataAlbum.album.images[0].url} alt={dataAlbum.album.name} className="card__image" />
      
      <h3 className="card__album">{dataAlbum.name}</h3>
      <p className="card__artist">{dataAlbum.artists[0].name}</p>
      
      <div className="button_wrapper">
        <button className="card__button">Select</button>
      </div>
    </div>
  );
}
