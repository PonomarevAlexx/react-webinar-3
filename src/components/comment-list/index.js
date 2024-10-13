import { memo } from 'react';
import './style.css';
import CommentItem from '../comment-item';
import { cn } from '@bem-react/classname';
import './style.css';

function CommentList({
  list,
  labelAdd,
  isOpenedFormAnswer,
  setOpenAnswer,
  exists,
  gap,
  level,
  submitComment,
}) {
  const comentList = cn('comentList');

  const lastIndex = list.findLastIndex(item => item.parent._id === isOpenedFormAnswer);
  const lastChild = lastIndex === -1 ? isOpenedFormAnswer : list[lastIndex]?._id;

  return (
    <div className={comentList()}>
      {list?.map(item => (
        <div key={item._id} className={comentList('item')}>
          <CommentItem
            submitComment={submitComment}
            gap={gap}
            level={level}
            lastChild={lastChild}
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
