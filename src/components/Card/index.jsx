import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

export default function Card({ imageUrl, title, artist }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card__image" />
      
      <h3 className="card__title">{title}</h3>
      <p className="card__artist">{artist}</p>
      
      <div className="button_wrapper">
        <button className="card__button">Select</button>
      </div>
    </div>
  );
}

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
}
