import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';
import { cn } from '@bem-react/classname';

function Controls({ openModal, quantityUniqueProducts, costAllGods }) {
  const controls = cn('Controls');

  const pluralQuantity = plural(quantityUniqueProducts, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });

  return (
    <div className={controls()}>
      <span>В корзине: </span>
      {quantityUniqueProducts ? (
        <strong>{`${quantityUniqueProducts} ${pluralQuantity} / ${costAllGods} ₽`}</strong>
      ) : (
        <strong>пусто</strong>
      )}
      <button onClick={openModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  openModal: PropTypes.func,
  quantityUniqueProducts: PropTypes.number,
  costAllGods: PropTypes.string,
};

Controls.defaultProps = {
  openModal: () => {},
};

export default React.memo(Controls);
