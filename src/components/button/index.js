import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className }) => {
  return <button className={className}  onClick={onClick}>{children}</button>;
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

Button.defaultProps = {
  children: '',
  className: '',
  onClick: () => {},
};

export default React.memo(Button);
