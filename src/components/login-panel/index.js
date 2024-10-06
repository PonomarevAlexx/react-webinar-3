import React from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import './style.css';

const LoginPanel = props => {
  const btn = cn('btn');
  const navigate = useNavigate();

  return props.successfully ? (
    <SideLayout side="end">
      <Link to={'/profile'}>{`${props.name}`}</Link>
      <button onClick={props.logOut} className={btn()}>
        {props.t('btn.exit')}
      </button>
    </SideLayout>
  ) : (
    <SideLayout side="end">
      <button onClick={() => navigate('/login')} className={btn()}>
        {props.t('btn.enter')}
      </button>
    </SideLayout>
  );
};

export default LoginPanel;
