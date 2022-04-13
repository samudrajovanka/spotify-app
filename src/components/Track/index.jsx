import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Button from '../Button';

export default function Track({ imageUrl, title, artist, select, toggleSelect }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className="track">
      <div className="track__image">
        <img src={imageUrl} alt={title} />
      </div>

      <div className="track__data">
        <h3 className="track__title truncate">{title}</h3>
        <p className="track__artist truncate">{artist}</p>
        
        <div className="track__action">
          <Button
            variant={isSelected ? 'primary' : 'secondary'}
            onClick={handleToggleSelect}
          >
            {isSelected ? 'Deselect' : 'Select'}
          </Button>
        </div>
      </div>
    </div>
  );
}

Track.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  select: PropTypes.bool.isRequired,
};
