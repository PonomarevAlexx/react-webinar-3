import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { formatPrices } from '../../utils';
import Button from '../button';
import '../item/style.css';

function ItemModal(props) {
  const item = cn('Item');

  const callbacks = {
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
        <>
          <span>{`${props.item.quantity} шт`}</span>
          <Button onClick={callbacks.deleteItemFromCartList}>Удалить</Button>
        </>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  deleteItemFromCartList: PropTypes.func,
};

ItemModal.defaultProps = {
  deleteItemFromCartList: () => {},
};

export default React.memo(ItemModal);
