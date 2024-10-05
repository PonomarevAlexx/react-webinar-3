import { memo } from 'react';
import LoginForm from '../../components/login-form';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import LoginPanel from '../../components/login-panel';

import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Login() {
  const { t } = useTranslate();

  const store = useStore();

  useInit(() => {
    store.actions.user.getUser();
  },);

  return (
    <PageLayout>
      <LoginPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Login);
