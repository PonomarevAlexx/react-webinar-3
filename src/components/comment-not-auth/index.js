import { cn } from '@bem-react/classname';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function CommentNotAuth({ t, text, isOpenedFormAnswer, setOpenAnswer }) {
  const commentNotAuth = cn('commentNotAuth');

  return (
    <div className={commentNotAuth()}>
      <Link className={commentNotAuth('link')} to="/login">
        {t('comment.signIn')}
      </Link>
      <div>, {text}</div>
      {!isOpenedFormAnswer && (
        <button onClick={() => setOpenAnswer(null)} className={commentNotAuth('btn')}>{t('comment.cancel')}</button>
      )}
    </div>
  );
}

export default memo(CommentNotAuth);
