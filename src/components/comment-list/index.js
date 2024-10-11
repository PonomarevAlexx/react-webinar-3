import { memo } from 'react';
import './style.css';
import CommentItem from '../comment-item';
import { cn } from '@bem-react/classname';
import './style.css';

function CommentList({ list, child, labelAdd, isOpenedFormAnswer, setOpenAnswer, exists}) {
  const comentList = cn('comentList');
  return (
    <div className={comentList({ child: child })}>
      {list?.map(item => (
        <div key={item._id} className={comentList('item')}>
          <CommentItem
            isOpenedFormAnswer={isOpenedFormAnswer}
            setOpenAnswer={setOpenAnswer}
            item={item}
            labelAdd={labelAdd}
            exists={exists}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(CommentList);
