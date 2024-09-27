import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Panigation from '../../components/panigation';
import LangBtn from '../../components/lang-btn';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    activePage: state.catalog.activePage,
    currentLanguage: state.languages.currentLanguage,
    localText: state.languages.text[state.languages.currentLanguage],
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setActivePage: useCallback(page => store.actions.catalog.load(page), [store]),
    changeLanguage: useCallback(lang => store.actions.languages.setLanguages(lang), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} localText={select.localText} />;
      },
      [callbacks.addToBasket, select.localText],
    ),
  };

  return (
    <PageLayout>
      <Head title={select.localText.titleShop}>
        <LangBtn
          changeLanguage={callbacks.changeLanguage}
          currentLanguage={select.currentLanguage}
        />
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        localText={select.localText}
      />
      <List list={select.list} renderItem={renders.item} />
      <Panigation
        currentPage={select.activePage}
        totalCount={select.count}
        pageSize={10}
        onPageChange={callbacks.setActivePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
