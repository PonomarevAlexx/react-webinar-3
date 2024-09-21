import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

function ModalLayout({ children }) {
  const modalLayout = cn('modal-layout');

  return <div className={modalLayout()}>{children}</div>;
}

ModalLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
