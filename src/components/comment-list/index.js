import { memo } from 'react';
import './style.css';
import CommentItem from '../comment-item';
import { cn } from '@bem-react/classname';
import './style.css';

function CommentList({ list, child,  labelAdd}) {
  const comentList = cn('comentList');
  return (
    <div className={comentList({ child: child })}>
      {list?.map(item => (
        <div key={item._id} className={comentList('item')}>
          <CommentItem item={item} labelAdd={labelAdd}/>
        </div>
      ))}
    </div>
  );
}

export default memo(CommentList);
