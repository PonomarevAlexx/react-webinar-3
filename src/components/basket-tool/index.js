import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { NavLink } from 'react-router-dom';

function BasketTool({ sum, amount, onOpen, localText }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <NavLink className={cn('link')} to={'/'}>
        {localText.mainPage}
      </NavLink>
      <span className={cn('label')}>{localText.inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, localText.plural)} / ${numberFormat(sum)} ₽`
          : `${localText.empty}`}
      </span>
      <button onClick={onOpen}>{localText.go}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  localText: PropTypes.object,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  localText: {},
};

export default memo(BasketTool);
