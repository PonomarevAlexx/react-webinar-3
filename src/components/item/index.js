import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { formatPrices } from '../../utils';
import Button from '../button';
import './style.css';

function Item(props) {
  const item = cn('Item');

  const callbacks = {
    addItemToCartList: e => {
      e.stopPropagation();
      props.addItemToCartList(props.item);
    },
  };

  return (
    <div className={item()}>
      <div className={item('code')}>{props.item.code}</div>
      <div className={item('title')}>{props.item.title}</div>
      <div className={item('price')}>{`${formatPrices(props.item.price)} ₽`}</div>
      <div className={item('actions')}>
        <Button onClick={callbacks.addItemToCartList}>Добавить</Button>
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
  addItemToCartList: PropTypes.func,
};

Item.defaultProps = {
  addItemToCartList: () => {},
};

export default React.memo(Item);
