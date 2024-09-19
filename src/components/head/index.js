import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn } from '@bem-react/classname';

function Head({ title }) {
  const head = cn('Head');

  return (
    <div className={head()}>
      <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
