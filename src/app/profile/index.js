import { memo, useEffect, useCallback } from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import useTranslate from '../../hooks/use-translate';
import LoginPanel from '../../components/login-panel';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    if (!select.successfully) {
      navigate('/login');
    }
  });

  const callbacks = {
    logOut: useCallback(() => store.actions.user.logOut(), [store]),
  };

  const select = useSelector(state => ({
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email,
    successfully: state.user.successfully,
  }));

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
      <ProfileCard t={t} name={select.name} phone={select.phone} email={select.email} />
    </PageLayout>
  );
}

export default memo(Profile);
