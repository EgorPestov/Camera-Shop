import { ChangeEvent, KeyboardEvent, useState, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sortAndFilterProducts, setFilterLowestPrice, setFilterHighestPrice } from '../../store/product-process/product-process';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getHighestPrice, getLowestPrice } from '../../store/product-process/selectors';
import { MIN_SYMBOLS_COUNT_FOR_HIGHPRICE_FILTER } from '../../const';
import { useNavigate, useLocation } from 'react-router-dom';

export const PriceInput = () => {
  const dispatch = useAppDispatch();
  const [lowestPrice, setLowestPrice] = useState('');
  const [highestPrice, setHighestPrice] = useState('');
  const lowestDefaultPrice = useAppSelector(getLowestPrice);
  const highestDefaultPrice = useAppSelector(getHighestPrice);
  const navigate = useNavigate();
  const location = useLocation();

  const updateURL = useCallback((lowest: string, highest: string) => {
    const params = new URLSearchParams(location.search);

    if (lowest) {
      params.set('pricelow', lowest);
    } else {
      params.delete('pricelow');
    }

    if (highest) {
      params.set('pricehigh', highest);
    } else {
      params.delete('pricehigh');
    }

    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [location.pathname, location.search, navigate]);

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
      updateURL(String(lowestDefaultPrice), highestPrice);
    } else if (lowestPrice && highestPrice && Number(lowestPrice) > Number(highestPrice)) {
      setLowestPrice(highestPrice);
      dispatch(setFilterLowestPrice(Number(highestPrice)));
      dispatch(sortAndFilterProducts());
      updateURL(highestPrice, highestPrice);
    }
  };

  const handleHighestPriceBlur = () => {
    if (highestDefaultPrice && highestPrice && Number(highestPrice) > highestDefaultPrice) {
      setHighestPrice(String(highestDefaultPrice));
      dispatch(setFilterHighestPrice(highestDefaultPrice));
      dispatch(sortAndFilterProducts());
      updateURL(lowestPrice, String(highestDefaultPrice));
    } else if (highestPrice && lowestPrice && Number(highestPrice) < Number(lowestPrice)) {
      setHighestPrice(lowestPrice);
      dispatch(setFilterHighestPrice(Number(lowestPrice)));
      dispatch(sortAndFilterProducts());
      updateURL(lowestPrice, lowestPrice);
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

