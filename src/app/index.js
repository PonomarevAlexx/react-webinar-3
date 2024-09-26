import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import ProductInfo from './product-info';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Routes, Route } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ProductInfo />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
