import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn } from '@bem-react/classname';

function List({ list, addItemToCartList, deleteItemFromCartList, modalIsOpen }) {
  const List = cn('List');
  
  return (
    <div className={List()}>
      {list.map(itemList => (
        <div key={itemList.code} className={List('item')}>
          <Item
            item={itemList}
            addItemToCartList={addItemToCartList}
            deleteItemFromCartList={deleteItemFromCartList}
            modalIsOpen={modalIsOpen}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  addItemToCartList: PropTypes.func,
  deleteItemFromCartList: PropTypes.func,
  modalIsOpen: PropTypes.bool,
};

List.defaultProps = {
  addItemToCartList: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
