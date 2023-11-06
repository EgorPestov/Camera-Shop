import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setSortingType, setSortingDirection, sortAndFilterProducts } from '../../store/product-process/product-process';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSortingType, getSortingDirection } from '../../store/product-process/selectors';
import { redirectToRoute } from '../../store/actions';
import { AppRoute } from '../../const';

export const Sorting = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sortingType = useAppSelector(getSortingType);
  const sortingDirection = useAppSelector(getSortingDirection);

  const [isPriceChecked, setIsPriceChecked] = useState(false);
  const [isPopularityChecked, setIsPopularityChecked] = useState(false);
  const [isTopChecked, setIsTopChecked] = useState(false);
  const [isDownChecked, setIsDownChecked] = useState(false);

  const updateURL = useCallback((type: 'price' | 'popularity', direction: 'top' | 'down') => {
    const currentQueryParams = new URLSearchParams(location.search);
    currentQueryParams.set('type', type);
    currentQueryParams.set('direction', direction);

    navigate({
      pathname: location.pathname,
      search: currentQueryParams.toString()
    });
  }, [location.search, location.pathname, navigate]);

  const handleTypeChange = (item: 'price' | 'popularity') => {
    let direction: 'down' | 'top' = isDownChecked ? 'down' : 'top';
    if (isTopChecked === false && isDownChecked === false) {
      setIsDownChecked(true);
      dispatch(setSortingDirection('down'));
      direction = 'down';
    }

    if (item === 'price') {
      setIsPriceChecked((prevValue) => (!prevValue));
      setIsPopularityChecked(false);
    } else {
      setIsPopularityChecked((prevValue) => (!prevValue));
      setIsPriceChecked(false);
    }
    dispatch(setSortingType(item));
    dispatch(sortAndFilterProducts());
    updateURL(item, direction);
  };

  const handleDirectionChange = (item: 'top' | 'down') => {
    let type: 'price' | 'popularity' = isPriceChecked ? 'price' : 'popularity';
    if (isPriceChecked === false && isPopularityChecked === false) {
      setIsPriceChecked(true);
      dispatch(setSortingType('price'));
      type = 'price';
    }

    if (item === 'top') {
      setIsTopChecked((prevValue) => (!prevValue));
      setIsDownChecked(false);
    } else {
      setIsDownChecked((prevValue) => (!prevValue));
      setIsTopChecked(false);
    }
    dispatch(setSortingDirection(item));
    dispatch(sortAndFilterProducts());
    updateURL(type, item);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let type = queryParams.get('type');
    let direction = queryParams.get('direction');

    if (!type && sortingType) {
      type = sortingType;
    }

    if (!direction && sortingDirection) {
      direction = sortingDirection;
    }

    if (type) {
      if (type === 'price') {
        setIsPriceChecked(true);
        setIsPopularityChecked(false);
        dispatch(setSortingType('price'));
      } else if (type === 'popularity') {
        setIsPopularityChecked(true);
        setIsPriceChecked(false);
        dispatch(setSortingType('popularity'));
      } else {
        dispatch(redirectToRoute(AppRoute.NotFound));
        return;
      }
    }

    if (direction) {
      if (direction === 'top') {
        setIsTopChecked(true);
        setIsDownChecked(false);
        dispatch(setSortingDirection('top'));
      } else if (direction === 'down') {
        setIsDownChecked(true);
        setIsTopChecked(false);
        dispatch(setSortingDirection('down'));
      } else {
        dispatch(redirectToRoute(AppRoute.NotFound));
        return;
      }
    }

    if (type && direction) {
      updateURL(type as 'price' | 'popularity', direction as 'top' | 'down');
    }
  }, [location.search, dispatch, sortingType, sortingDirection, updateURL]);


  return (
    <div className="catalog-sort" data-testid="sorting">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={isPriceChecked}
                onChange={() => handleTypeChange('price')}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={isPopularityChecked}
                onChange={() => handleTypeChange('popularity')}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                checked={isTopChecked}
                aria-label="По возрастанию"
                onChange={() => handleDirectionChange('top')}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                checked={isDownChecked}
                aria-label="По убыванию"
                onChange={() => handleDirectionChange('down')}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
