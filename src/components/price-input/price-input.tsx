import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sortAndFilterProducts, setFilterLowestPrice, setFilterHighestPrice } from '../../store/product-process/product-process';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getHighestPrice, getLowestPrice } from '../../store/product-process/selectors';
import { MIN_SYMBOLS_COUNT_FOR_HIGHPRICE_FILTER } from '../../const';

export const PriceInput = () => {
  const dispatch = useAppDispatch();
  const [lowestPrice, setLowestPrice] = useState('');
  const [highestPrice, setHighestPrice] = useState('');
  const lowestDefaultPrice = useAppSelector(getLowestPrice);
  const highestDefaultPrice = useAppSelector(getHighestPrice);

  const handleLowestPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLowestPrice(value);
    if (value) {
      dispatch(setFilterLowestPrice(Number(value)));
    } else {
      dispatch(setFilterLowestPrice(null));
    }
    dispatch(sortAndFilterProducts());
  };

  const handleHighestPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHighestPrice(value);

    if (value.length >= MIN_SYMBOLS_COUNT_FOR_HIGHPRICE_FILTER) {
      const numericValue = Number(value);
      if (!isNaN(numericValue) && numericValue >= 0) {
        dispatch(setFilterHighestPrice(numericValue));
      }
      dispatch(sortAndFilterProducts());
    } else if (value === '') {
      dispatch(setFilterHighestPrice(null));
      dispatch(sortAndFilterProducts());
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              min="0"
              name="price"
              placeholder={`${lowestDefaultPrice ? lowestDefaultPrice : ''}`}
              value={lowestPrice}
              onChange={handleLowestPriceChange}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              min="0"
              name="priceUp"
              placeholder={`${highestDefaultPrice ? highestDefaultPrice : ''}`}
              value={highestPrice}
              onChange={handleHighestPriceChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};
