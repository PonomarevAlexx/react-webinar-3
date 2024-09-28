import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn } from '@bem-react/classname';

function ProductCard({ productInfo, addToBasket = () => {}, localText }) {
  const productCard = cn('product-card');

  return (
    <div className={productCard()}>
      <div className={productCard('description')}>{productInfo.description}</div>
      <div className={productCard('country')}>
        {localText.countryOrigin}:{' '}
        <span>{`${productInfo.madeIn?.title} (${productInfo.madeIn?.code})`}</span>{' '}
      </div>
      <div className={productCard('category')}>
        {localText.category}: <span>{productInfo.category?.title}</span>{' '}
      </div>
      <div className={productCard('year')}>
        {localText.yearManufacture}: <span>{productInfo.edition}</span>{' '}
      </div>
      <div className={productCard('price')}>
        {localText.price}: {productInfo.price} ₽
      </div>
      <button className={productCard('btn')} onClick={() => addToBasket(productInfo._id)}>
        {localText.add}
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
    edition: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
  }).isRequired,
  addToBasket: PropTypes.func,
};

export default memo(ProductCard);
