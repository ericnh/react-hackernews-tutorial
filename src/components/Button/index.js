import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className = '', onClick, children }) =>
  <button
    className={ className }
    onClick={ onClick }
    type="button"
  >
    { children }
  </button>

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
