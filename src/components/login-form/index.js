import { cn } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';
import { useCallback, useState } from 'react';

const LoginForm = () => {
  const loginForm = cn('login-form');
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.error,
  }));

  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const callbacks = {
    onSubmit: useCallback(e => {
      e.preventDefault();
      store.actions.user.logIn(valueLogin, valuePassword);
      setValueLogin('');
      setValuePassword('');
    }),
  };

  return (
    <div className={loginForm()}>
      <h2>{t('title.login')}</h2>
      <form onSubmit={callbacks.onSubmit}>
        <div className={loginForm('element')}>
          <label htmlFor="login">{t('form.login')}</label>
          <input
            value={valueLogin}
            onChange={e => setValueLogin(e.target.value)}
            type="text"
            id="login"
          />
        </div>
        <div className={loginForm('element')}>
          <label htmlFor="passwprd">{t('form.password')}</label>
          <input
            value={valuePassword}
            onChange={e => setValuePassword(e.target.value)}
            type="password"
            id="password"
          />
        </div>
        {select.error && <div className={loginForm({'error': 'message'})}>{select.error}</div>}
        <button>{t('form.btn')}</button>
      </form>
    </div>
  );
};

export default LoginForm;
