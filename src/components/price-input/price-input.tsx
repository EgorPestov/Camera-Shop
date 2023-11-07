import { ChangeEvent, KeyboardEvent, useState } from 'react';
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
    if (/^\d*$/.test(value)) {
      setLowestPrice(value);
      dispatch(setFilterLowestPrice(value ? Number(value) : null));
    } else {
      setLowestPrice('0');
      dispatch(setFilterLowestPrice(0));
    }
    dispatch(sortAndFilterProducts());
  };

  const handleHighestPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setHighestPrice(value);
      if (value && value.length >= MIN_SYMBOLS_COUNT_FOR_HIGHPRICE_FILTER) {
        dispatch(setFilterHighestPrice(Number(value)));
      } else if (!value) {
        dispatch(setFilterHighestPrice(null));
      }
    } else {
      setHighestPrice('0');
      dispatch(setFilterHighestPrice(0));
    }
    dispatch(sortAndFilterProducts());
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '-' || event.key === '+') {
      event.preventDefault();
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
              onKeyDown={handleInputKeyDown}
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
              onKeyDown={handleInputKeyDown}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};
