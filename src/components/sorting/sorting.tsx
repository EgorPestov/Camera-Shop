import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setSortingType, setSortingDirection, sortAndFilterProducts } from '../../store/product-process/product-process';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSortingType, getSortingDirection } from '../../store/product-process/selectors';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, SortType, SortDirection, SortingOptions } from '../../const';
import { SortTypeType, SortDirectionType } from '../../types';

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

  const updateURL = useCallback((type: SortTypeType, direction: SortDirectionType) => {
    const currentQueryParams = new URLSearchParams(location.search);
    currentQueryParams.set(SortingOptions.Type, type);
    currentQueryParams.set(SortingOptions.Direction, direction);

    navigate({
      pathname: location.pathname,
      search: currentQueryParams.toString()
    });
  }, [location.search, location.pathname, navigate]);

  const handleTypeChange = (item: SortTypeType) => {
    let direction: SortDirectionType = isDownChecked ? SortDirection.Down : SortDirection.Top;
    if (isTopChecked === false && isDownChecked === false) {
      setIsDownChecked(true);
      dispatch(setSortingDirection(SortDirection.Top));
      direction = SortDirection.Top;
    }

    if (item === SortType.Price) {
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

  const handleDirectionChange = (item: SortDirectionType) => {
    let type: SortTypeType = isPriceChecked ? SortType.Price : SortType.Popularity;
    if (isPriceChecked === false && isPopularityChecked === false) {
      setIsPriceChecked(true);
      dispatch(setSortingType(SortType.Price));
      type = SortType.Price;
    }

    if (item === SortDirection.Top) {
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
    let type = queryParams.get(SortingOptions.Type);
    let direction = queryParams.get(SortingOptions.Direction);

    if (!type && sortingType) {
      type = sortingType;
    }

    if (!direction && sortingDirection) {
      direction = sortingDirection;
    }

    if (type) {
      if (type === SortType.Price) {
        setIsPriceChecked(true);
        setIsPopularityChecked(false);
        dispatch(setSortingType(SortType.Price));
      } else if (type === SortType.Popularity) {
        setIsPopularityChecked(true);
        setIsPriceChecked(false);
        dispatch(setSortingType(SortType.Popularity));
      } else {
        dispatch(redirectToRoute(AppRoute.NotFound));
        return;
      }
    }

    if (direction) {
      if (direction === SortDirection.Top) {
        setIsTopChecked(true);
        setIsDownChecked(false);
        dispatch(setSortingDirection(SortDirection.Top));
      } else if (direction === SortDirection.Down) {
        setIsDownChecked(true);
        setIsTopChecked(false);
        dispatch(setSortingDirection(SortDirection.Down));
      } else {
        dispatch(redirectToRoute(AppRoute.NotFound));
        return;
      }
    }

    if (type && direction) {
      updateURL(type as SortTypeType, direction as SortDirectionType);
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
                checked={sortingType === SortType.Price}
                onChange={() => handleTypeChange(SortType.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortingType === SortType.Popularity}
                onChange={() => handleTypeChange(SortType.Popularity)}
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
                checked={sortingDirection === SortDirection.Top}
                aria-label="По возрастанию"
                onChange={() => handleDirectionChange(SortDirection.Top)}
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
                checked={sortingDirection === SortDirection.Down}
                aria-label="По убыванию"
                onChange={() => handleDirectionChange(SortDirection.Down)}
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
