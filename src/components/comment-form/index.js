import { memo, useEffect, useRef, useState } from 'react';
import './style.css';
import { cn } from '@bem-react/classname';

function CommentForm({ t, title, isOpenedFormAnswer, setOpenAnswer, submitComment }) {
  const commentForm = cn('commentForm');
  const [text, setText] = useState('');
  const formRef = useRef();

  useEffect(() => {
    if (isOpenedFormAnswer) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [formRef]);

  const handelSubmit = e => {
    e.preventDefault();
    setText('');

    if (text.trim()) {
      submitComment(text, isOpenedFormAnswer);
      setText('');
      if (isOpenedFormAnswer) setOpenAnswer(null);
    }
  };

  return (
    <>
      <form ref={formRef} className={commentForm()} onSubmit={handelSubmit}>
        <h5 className={commentForm('title')}> {title}</h5>
        <textarea
          className={commentForm('textarea')}
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <div className={commentForm('btns')}>
          <button className={commentForm('btn')}>{t('comment.send')}</button>
          {isOpenedFormAnswer && (
            <button onClick={() => setOpenAnswer(null)} className={commentForm('btn')}>
              {t('comment.cancel')}
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default memo(CommentForm);
