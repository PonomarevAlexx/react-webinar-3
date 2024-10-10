import { cn } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';
import formatCommentTime from '../../utils/formatCommentTime';
import CommentList from '../comment-list';

function CommentItem(props) {
  const commentItem = cn('commentItem');

  return (
    <div className={commentItem()}>
      <div className={commentItem('header')}>
        <div className={commentItem('author-name')}>{props.item.author.profile.name}</div>
        <div className={commentItem('date')}>{formatCommentTime(props.item.dateCreate)}</div>
      </div>
      <div className={commentItem('comment-text')}>{props.item.text}</div>
      <button className={commentItem('btn')}>{props.labelAdd}</button>
      {props.item.children && <CommentList list={props.item.children} labelAdd={props.labelAdd} child/>}
    </div>
  );
}

export default memo(CommentItem);
