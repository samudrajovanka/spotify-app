import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

export default function Card({ imageUrl, title, artist }) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={imageUrl} alt={title} />
      </div>

      <div className="card__data">
        <div className="card__content">
          <h3 className="card__title">{title}</h3>
          <p className="card__artist">{artist}</p>
        </div>
        
        <div className="card__action">
          <button className="btn">Select</button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
}
