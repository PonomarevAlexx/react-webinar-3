import React, { memo } from 'react';
import './style.css';

function CommentsSection({ t, count, children }) {
  return (
    <div className="CommentsSection">
      <h3>
        {t('comment.title')} ({count})
      </h3>
      {children}
    </div>
  );
}

export default memo(CommentsSection);
