import { cn } from '@bem-react/classname';
import './style.css';

const LoginForm = props => {
  const loginForm = cn('login-form');

  return (
    <div className={loginForm()}>
      <h2>{props.t('title.login')}</h2>
      <form onSubmit={props.onSubmit}>
        <div className={loginForm('element')}>
          <label htmlFor="login">{props.t('form.login')}</label>
          <input
            value={props.valueLogin}
            onChange={e => props.setValueLogin(e.target.value)}
            type="text"
            id="login"
          />
        </div>
        <div className={loginForm('element')}>
          <label htmlFor="passwprd">{props.t('form.password')}</label>
          <input
            value={props.valuePassword}
            onChange={e => props.setValuePassword(e.target.value)}
            type="password"
            id="password"
          />
        </div>
        {props.error && <div className={loginForm({ error: 'message' })}>{props.error}</div>}
        <button>{props.t('form.btn')}</button>
      </form>
    </div>
  );
};

export default LoginForm;
