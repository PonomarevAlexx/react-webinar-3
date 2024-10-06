import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import LoginPanel from '../../components/login-panel';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const callbacks = {
    logOut: useCallback(() => store.actions.user.logOut(), [store]),
  };

  const select = useSelector(state => ({
    name: state.user.name,
    successfully: state.user.successfully,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginPanel
        t={t}
        name={select.name}
        successfully={select.successfully}
        logOut={callbacks.logOut}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
