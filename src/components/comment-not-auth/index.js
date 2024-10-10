import { cn } from '@bem-react/classname';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function CommentNotAuth({ t }) {
  const commentNotAuth = cn('commentNotAuth');

  return (
    <div className={commentNotAuth()}>
      <Link className={commentNotAuth('link')} to="/login">
        {t('comment.signIn')}
      </Link>
      <div>, чтобы иметь возможность комментировать</div>
      {/* <button className={commentNotAuth('btn')}>Отмена</button> */}
    </div>
  );
}

export default memo(CommentNotAuth);
