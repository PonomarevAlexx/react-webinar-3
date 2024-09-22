import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import Button from '../button';
import { cn } from '@bem-react/classname';

function Modal({ cartList, closeModal, deleteItemFromCartList, costAllGods }) {
  const modal = cn('modal');

  return (
    <div className={modal()}>
      <div className={modal('content')}>
        <Head title="Корзина" />
        <Button onClick={closeModal} className={modal('close')}>
          Закрыть
        </Button>
        <div className={modal('list')}>
          {cartList.length > 0 ? (
            <List
              list={cartList}
              modalIsOpen={true}
              deleteItemFromCartList={deleteItemFromCartList}
            />
          ) : (
            <div className={modal('empty')}>
              <span>Корзина пока пуста...</span>
            </div>
          )}
        </div>
        {cartList.length > 0 && (
          <div className={modal('result')}>
            <span>Итого</span>
            <span>{costAllGods} ₽</span>
          </div>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  cartList: PropTypes.array,
  closeModal: PropTypes.func,
  deleteItemFromCartList: PropTypes.func,
  costAllGods: PropTypes.string,
};

Modal.defaultProps = {
  closeModal: () => {},
  deleteItemFromCartList: () => {},
};

export default React.memo(Modal);
