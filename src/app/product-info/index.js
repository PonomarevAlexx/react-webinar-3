import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProductCard from '../../components/product-card';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { useParams } from 'react-router-dom';
import useSelector from '../../store/use-selector';

function ProductInfo() {
  const store = useStore();
  const { id } = useParams();
  
  useEffect(() => {
    store.actions.product.productLoad(id);
  }, [id]);

  const select = useSelector(state => ({
    productItem: state.product.productItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.productItem?.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ProductCard productInfo={select.productItem} addToBasket={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(ProductInfo);
