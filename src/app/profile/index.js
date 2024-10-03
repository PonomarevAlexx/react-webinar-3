import { memo, useEffect } from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import useTranslate from '../../hooks/use-translate';
import LoginPanel from '../../components/login-panel';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  const select = useSelector(state => ({
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email,
  }));

  return (
    <PageLayout>
      <LoginPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard name={select.name} phone={select.phone} email={select.email} />
    </PageLayout>
  );
}

export default memo(Profile);
