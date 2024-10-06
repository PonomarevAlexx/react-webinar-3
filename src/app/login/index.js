import { memo, useEffect, useState, useCallback } from 'react';
import LoginForm from '../../components/login-form';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import LoginPanel from '../../components/login-panel';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';

function Login() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const callbacks = {
    onSubmit: useCallback(async e => {
      e.preventDefault();
      await store.actions.user.logIn(valueLogin, valuePassword);
    }),
    logOut: useCallback(() => store.actions.user.logOut(), [store]),
  };

  const select = useSelector(state => ({
    name: state.user.name,
    error: state.user.error,
    successfully: state.user.successfully,
  }));

  useEffect(() => {
    if (select.successfully) {
      navigate('/profile');
    }
  });

  useEffect(() => {
    store.actions.user.deleteError();
  }, []);

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
      <LoginForm
        onSubmit={callbacks.onSubmit}
        valueLogin={valueLogin}
        setValueLogin={setValueLogin}
        valuePassword={valuePassword}
        setValuePassword={setValuePassword}
        error={select.error}
        successfully={select.successfully}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Login);
