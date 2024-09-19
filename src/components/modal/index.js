import React from 'react';
import './style.css';
import PropTypes from 'prop-types'
import Head from '../head';
import List from '../list';
import { cn } from '@bem-react/classname';

function Modal({ cartList, isOpenModal, closeModal, deleteItemFromCartList, costAllGods }) {
  const modal = cn('modal');

  if (isOpenModal) {
    return (
      <div className={modal()}>
        <div className={modal('layout')}>
          <div className={modal('content')}>
            <Head title="Корзина" />
            <button onClick={closeModal} className={modal('close')}>
              Закрыть
            </button>
            <div className={modal('list')}>
              <List
                list={cartList}
                modalIsOpen={true}
                deleteItemFromCartList={deleteItemFromCartList}
              />
            </div>
            {cartList.length > 0 && (
              <div className={modal('result')}>
                <span>Итого</span>
                <span>{costAllGods} ₽</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  cartList: PropTypes.array,
  isOpenModal: PropTypes.bool,
  closeModal: PropTypes.func,
  deleteItemFromCartList: PropTypes.func,
  costAllGods: PropTypes.string,
};

Modal.defaultProps = {
  closeModal: () => {},
  deleteItemFromCartList: () => {},
};

export default React.memo(Modal);
