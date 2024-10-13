import useTranslate from '../../hooks/use-translate';
import { memo, useCallback, useMemo, useState } from 'react';
import CommentsSection from '../../components/comments-section';
import CommentList from '../../components/comment-list';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowEqual from 'shallowequal';
import useSelector from '../../hooks/use-selector';
import CommentNotAuth from '../../components/comment-not-auth';
import CommentForm from '../../components/comment-form';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import commentsActions from '../../store-redux/comment/actions';
import { useDispatch } from 'react-redux';

function CommentsContainer() {
  const { t } = useTranslate();
  const dispatch = useDispatch();

  const MAX_LEVEL_COMMENT = 4;
  const GAP_COMMENT_PX = 30;

  const [isOpenedFormAnswer, setisOpenedFormAnswer] = useState(null);

  const select = useSelectorRedux(
    state => ({
      count: state.comment.count,
      list: state.comment.items,
      waiting: state.comment.waiting,
    }),
    shallowEqual,
  );
console.log(select.count, select.list)
  const tree = useMemo(() => listToTree(select.list)[0]?.children || [], [select.list]);
  const list = useMemo(
    () =>
      treeToList(tree, (item, level) => ({
        ...item,
        level,
      })),
    [select.list],
  );


  const callbacks = {
    submitComment: useCallback((text, id) => {
      dispatch(
        commentsActions.post({
          text,
          parent: {
            _id: id,
            _type: id ? 'comment' : 'article',
          },
        }),
      );
    }, []),
  };

  const selectStore = useSelector(state => ({
    exists: state.session.exists,
  }));

  return (
    <CommentsSection t={t} count={select.count}>
      <CommentList
        submitComment={callbacks.submitComment}
        gap={GAP_COMMENT_PX}
        level={MAX_LEVEL_COMMENT}
        isOpenedFormAnswer={isOpenedFormAnswer}
        setOpenAnswer={setisOpenedFormAnswer}
        list={list}
        labelAdd={t('comment.btnAnswer')}
        exists={selectStore.exists}
      />
      {!selectStore.exists ? (
        <CommentNotAuth
          t={t}
          text={t('comment.notAuthComment')}
          isOpenedFormAnswer={isOpenedFormAnswer}
        />
      ) : (
        !isOpenedFormAnswer && (
          <CommentForm
            submitComment={callbacks.submitComment}
            title={t('comment.titleFormComment')}
            t={t}
          />
        )
      )}
    </CommentsSection>
  );
}

export default memo(CommentsContainer);
