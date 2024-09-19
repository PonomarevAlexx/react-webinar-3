import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import { formatPrices } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const isOpenModal = store.getState().isOpenModal;

  const costAllGods = formatPrices(
    cartList.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  const callbacks = {
    addItemToCartList: useCallback(
      item => {
        store.addItemToCartList(item);
      },
      [store],
    ),

    deleteItemFromCartList: useCallback(
      code => {
        store.deleteItemFromCartList(code);
      },
      [store],
    ),

    openModal: useCallback(() => {
      store.openModal();
    }, [store]),

    closeModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          openModal={callbacks.openModal}
          quantityUniqueProducts={cartList.length}
          costAllGods={costAllGods}
        />
        <List list={list} addItemToCartList={callbacks.addItemToCartList} />

        <Modal
          cartList={cartList}
          isOpenModal={isOpenModal}
          closeModal={callbacks.closeModal}
          deleteItemFromCartList={callbacks.deleteItemFromCartList}
          costAllGods={costAllGods}
        />
      </PageLayout>
    </>
  );
}

export default App;
