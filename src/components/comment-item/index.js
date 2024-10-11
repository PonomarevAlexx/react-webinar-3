import { cn } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';
import formatCommentTime from '../../utils/formatCommentTime';
import CommentList from '../comment-list';
import CommentForm from '../comment-form';
import useTranslate from '../../hooks/use-translate';
import CommentNotAuth from '../comment-not-auth';

function CommentItem({ item, labelAdd, isOpenedFormAnswer, setOpenAnswer, exists }) {
  const commentItem = cn('commentItem');
  const { t } = useTranslate();
  console.log(exists);

  return (
    <div className={commentItem()}>
      <div className={commentItem('header')}>
        <div className={commentItem('author-name')}>{item.author.profile.name}</div>
        <div className={commentItem('date')}>{formatCommentTime(item.dateCreate)}</div>
      </div>
      <div className={commentItem('comment-text')}>{item.text}</div>
      <button onClick={() => setOpenAnswer(item._id)} className={commentItem('btn')}>
        {labelAdd}
      </button>
      {isOpenedFormAnswer === item._id ? (
        exists ? (
          <CommentForm
            t={t}
            title={t('comment.titleFormAnswer')}
            setOpenAnswer={setOpenAnswer}
            isOpenedFormAnswer={isOpenedFormAnswer}
          />
        ) : (
          <CommentNotAuth t={t} text={t('comment.notAuthAnswer')} setOpenAnswer={setOpenAnswer} />
        )
      ) : null}
      {item.children && (
        <CommentList
          list={item.children}
          isOpenedFormAnswer={isOpenedFormAnswer}
          setOpenAnswer={setOpenAnswer}
          labelAdd={labelAdd}
          child
          exists={exists}
        />
      )}
    </div>
  );
}

export default memo(CommentItem);
