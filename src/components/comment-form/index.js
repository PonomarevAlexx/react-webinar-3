import { memo, useState } from 'react';
import './style.css';
import { cn } from '@bem-react/classname';

function CommentForm() {
  const commentForm = cn('commentForm');
  const [text, setText] = useState('');

  return (
    <>
      <form className={commentForm()}>
        <h5 className={commentForm('title')}> New comment</h5>
        <textarea
          placeholder="Text"
          className={commentForm('textarea')}
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <button className={commentForm('btn')}>Sent</button>
      </form>
    </>
  );
}

export default memo(CommentForm);
