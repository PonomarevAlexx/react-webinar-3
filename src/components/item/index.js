import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { formatPrices } from '../../utils';
import './style.css';

function Item(props) {
  const item = cn('Item');

  const callbacks = {
    addItemToCartList: e => {
      e.stopPropagation();
      props.addItemToCartList(props.item);
    },

    deleteItemFromCartList: e => {
      e.stopPropagation();
      props.deleteItemFromCartList(props.item.code);
    },
  };

  return (
    <div className={item()}>
      <div className={item('code')}>{props.item.code}</div>
      <div className={item('title')}>{props.item.title}</div>
      <div className={item('price')}>{`${formatPrices(props.item.price)} ₽`}</div>
      <div className={item('actions')}>
        {props.modalIsOpen ? (
          <>
            <span>{`${props.item.quantity} шт`}</span>
            <button onClick={callbacks.deleteItemFromCartList}>Удалить</button>
          </>
        ) : (
          <button onClick={callbacks.addItemToCartList}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  deleteItemFromCartList: PropTypes.func,
  addItemToCartList: PropTypes.func,
};

Item.defaultProps = {
  addItemToCartList: () => {},
  deleteItemFromCartList: () => {},
};

export default React.memo(Item);
