import { memo, useState } from 'react';
import './style.css';
import { cn } from '@bem-react/classname';

function CommentForm({ title, isOpenedFormAnswer, setOpenAnswer }) {
  const commentForm = cn('commentForm');
  const [text, setText] = useState('');

  return (
    <>
      <form className={commentForm()}>
        <h5 className={commentForm('title')}> {title}</h5>
        <textarea
          placeholder="Text"
          className={commentForm('textarea')}
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <div className={commentForm('btns')}>
          <button className={commentForm('btn')}>Sent</button>
          {isOpenedFormAnswer && (
            <button onClick={() => setOpenAnswer(null)} className={commentForm('btn')}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default memo(CommentForm);
