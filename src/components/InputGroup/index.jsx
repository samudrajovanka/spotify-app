import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

export default function InputGroup({ children }) {
  return (
    <div className="input-group">
      {children}
    </div>
  )
}

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
