import React from 'react';
import PropTypes from 'prop-types';

function Button({ className = '', onClick, children }) {
  return (
    <button
      className={ className }
      onClick={ onClick }
      type="button" >
      { children }
    </button>
  )
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
