import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: () => props.onClose(),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          onClick={callbacks.closeModal}
          className={cn('link')}
          to={`product/${props.item._id}`}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.localText.pcs}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.localText.delete}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
};

export default memo(ItemBasket);
