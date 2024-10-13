import { cn } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';
import formatCommentTime from '../../utils/formatCommentTime';
import CommentForm from '../comment-form';
import useTranslate from '../../hooks/use-translate';
import CommentNotAuth from '../comment-not-auth';

function CommentItem({
  item,
  labelAdd,
  isOpenedFormAnswer,
  setOpenAnswer,
  exists,
  level,
  gap,
  lastChild,
  submitComment,
}) {
  const commentItem = cn('commentItem');
  const { t } = useTranslate();

  return (
    <div
      className={commentItem()}
      style={{ marginLeft: `${(item.level <= level ? item.level : level) * gap}px` }}
    >
      <div className={commentItem('header')}>
        <div className={commentItem('author-name')}>{item.author.profile.name}</div>
        <div className={commentItem('date')}>{formatCommentTime(item.dateCreate)}</div>
      </div>
      <div className={commentItem('comment-text')}>{item.text}</div>
      <button onClick={() => setOpenAnswer(item._id)} className={commentItem('btn')}>
        {labelAdd}
      </button>
      {lastChild === item._id ? (
        exists ? (
          <CommentForm submitComment={submitComment}
            t={t}
            title={t('comment.titleFormAnswer')}
            setOpenAnswer={setOpenAnswer}
            isOpenedFormAnswer={isOpenedFormAnswer}
          />
        ) : (
          <CommentNotAuth t={t} text={t('comment.notAuthAnswer')} setOpenAnswer={setOpenAnswer} />
        )
      ) : null}
    </div>
  );
}

export default memo(CommentItem);
