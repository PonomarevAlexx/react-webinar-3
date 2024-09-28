import React, { memo } from 'react';
import { usePagination, DOTS } from '../../store/use-panigation';
import { cn } from '@bem-react/classname';
import './style.css';

const Pagination = props => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const pagination = cn('panigation');

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className={pagination()}>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className={pagination('item-dots')}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={pagination('item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(Pagination);
