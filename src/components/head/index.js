import { memo } from 'react';
import PropTypes from 'prop-types';
import LangBtn from '../lang-btn';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LangBtn />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
