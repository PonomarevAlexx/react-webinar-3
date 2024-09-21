import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import ModalLayout from './components/modal-layout';
import { formatPrices } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const costAllGods = store.getState().costAllGods;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

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
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          openModal={openModal}
          quantityUniqueProducts={cartList.length}
          costAllGods={formatPrices(costAllGods)}
        />
        <List list={list} addItemToCartList={callbacks.addItemToCartList} />

        {isModalOpen && <ModalLayout>
          <Modal
            cartList={cartList}
            closeModal={closeModal}
            deleteItemFromCartList={callbacks.deleteItemFromCartList}
            costAllGods={formatPrices(costAllGods)}
          />
        </ModalLayout>}
      </PageLayout>
    </>
  );
}

export default App;
