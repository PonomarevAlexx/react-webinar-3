import useTranslate from '../../hooks/use-translate';
import { memo, useCallback, useMemo, useState } from 'react';
import CommentsSection from '../../components/comments-section';
import CommentList from '../../components/comment-list';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowEqual from 'shallowequal';
import useSelector from '../../hooks/use-selector';
import CommentNotAuth from '../../components/comment-not-auth';
import CommentForm from '../../components/comment-form';
import commentsTree from '../../utils/comment-to-tree';

function CommentsContainer() {
  const { t } = useTranslate();

  const [isOpenedFormAnswer, setisOpenedFormAnswer] = useState(null);

  const select = useSelectorRedux(
    state => ({
      count: state.comment.count,
      list: state.comment.data.items,
      waiting: state.comment.waiting,
    }),
    shallowEqual,
  );

  const list = useMemo(() => commentsTree(select.list), [select.list]);
  console.log(select.list);

  const selectStore = useSelector(state => ({
    exists: state.session.exists,
  }));

  //   const renders = {
  //     item: useCallback(item => <CommentItem item={item} labelAdd={t('comment.btnAnswer')} />),
  //   };

  return (
    <CommentsSection t={t} count={select.count}>
      <CommentList
        isOpenedFormAnswer={isOpenedFormAnswer}
        setOpenAnswer={setisOpenedFormAnswer}
        list={list}
        labelAdd={t('comment.btnAnswer')}
      />
      {!selectStore.exists ? (
        <CommentNotAuth t={t} />
      ) : (
        <CommentForm title={t('comment.titleFormComment')} />
      )}
    </CommentsSection>
  );
}

export default memo(CommentsContainer);
