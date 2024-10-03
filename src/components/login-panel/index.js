import React, { useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import './style.css';
import useStore from '../../hooks/use-store';

const LoginPanel = () => {
  const navigate = useNavigate();
  const btn = cn('btn');
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector(state => ({
    token: state.user.token,
    name: state.user.name,
  }));

  const callbacks = {
    logOut: useCallback(() => store.actions.user.logOut(), [store]),
  };

  return select.token ? (
    <SideLayout side="end">
      <Link to={'/profile'}>{`${select.name}`}</Link>
      <button onClick={callbacks.logOut} className={btn()}>
        {t('btn.exit')}
      </button>
    </SideLayout>
  ) : (
    <SideLayout side="end">
      <button onClick={() => navigate('/login')} className={btn()}>
        {t('btn.enter')}
      </button>
    </SideLayout>
  );
};

export default LoginPanel;
