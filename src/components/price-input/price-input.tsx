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
    }
    dispatch(sortAndFilterProducts());
  };

  const handleLowestPriceBlur = () => {
    if (lowestDefaultPrice && lowestPrice && Number(lowestPrice) < lowestDefaultPrice) {
      setLowestPrice(String(lowestDefaultPrice));
      dispatch(setFilterLowestPrice(lowestDefaultPrice));
      dispatch(sortAndFilterProducts());
    } else if (lowestPrice && highestPrice && Number(lowestPrice) > Number(highestPrice)) {
      setLowestPrice(highestPrice);
      dispatch(setFilterLowestPrice(Number(highestPrice)));
      dispatch(sortAndFilterProducts());
    }
  };

  const handleHighestPriceBlur = () => {
    if (highestDefaultPrice && highestPrice && Number(highestPrice) > highestDefaultPrice) {
      setHighestPrice(String(highestDefaultPrice));
      dispatch(setFilterHighestPrice(highestDefaultPrice));
      dispatch(sortAndFilterProducts());
    } else if (highestPrice && lowestPrice && Number(highestPrice) < Number(lowestPrice)) {
      setHighestPrice(lowestPrice);
      dispatch(setFilterHighestPrice(Number(lowestPrice)));
      dispatch(sortAndFilterProducts());
    }
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
              name="price"
              placeholder={`${lowestDefaultPrice || ''}`}
              value={lowestPrice}
              onChange={handleLowestPriceChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleLowestPriceBlur}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`${highestDefaultPrice || ''}`}
              value={highestPrice}
              onChange={handleHighestPriceChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleHighestPriceBlur}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

