import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sortAndFilterProducts, setFilterCategory, setFilterLevel, setFilterType, setFilterLowestPrice, setFilterHighestPrice } from '../../store/product-process/product-process';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getFilterCategory, getFilterType, getFilterLevel } from '../../store/product-process/selectors';
import { ChangeEvent, useEffect, useCallback } from 'react';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, FilterCategory, FilterType, FilterLevel } from '../../const';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterCategoryType, FilterLevelType, FilterTypeType } from '../../types';
import { PriceInput } from '../price-input/price-input';

export const Filtration = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(getFilterCategory);
  const selectedType = useAppSelector(getFilterType);
  const selectedLevel = useAppSelector(getFilterLevel);
  const location = useLocation();
  const navigate = useNavigate();

  const updateURL = useCallback(
    (
      category: FilterCategoryType,
      cameratype: FilterTypeType,
      level: FilterLevelType,
      needUpdate?: boolean,
    ) => {
      const params = new URLSearchParams(location.search);
      if (category) {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      if (cameratype) {
        params.set('cameratype', cameratype);
      } else {
        params.delete('cameratype');
      }
      if (level) {
        params.set('level', level);
      } else {
        params.delete('level');
      }

      if (needUpdate) {
        params.set('page', '1');
      }

      navigate({
        pathname: location.pathname,
        search: params.toString()
      });
    }, [location.search, location.pathname, navigate]);

  const handleCategoryChange = (category: NonNullable<FilterCategoryType>) => (event: ChangeEvent<HTMLInputElement>) => {
    const newCategory = event.target.checked ? category : null;
    dispatch(setFilterCategory(newCategory));

    if (event.target.checked && category === FilterCategory.Video && (selectedType === FilterType.Film || selectedType === FilterType.Instant)) {
      dispatch(setFilterType(null));
    }
    updateURL(newCategory, newCategory === FilterCategory.Video && (selectedType === FilterType.Film || selectedType === FilterType.Instant) ? null : selectedType, selectedLevel, true);
    dispatch(sortAndFilterProducts());
  };

  const handleTypeChange = (type: NonNullable<FilterTypeType>) => (event: ChangeEvent<HTMLInputElement>) => {
    const newType = event.target.checked ? type : null;
    dispatch(setFilterType(newType));
    updateURL(selectedCategory, newType, selectedLevel, true);
    dispatch(sortAndFilterProducts());
  };

  const handleLevelChange = (level: NonNullable<FilterLevelType>) => (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = event.target.checked ? level : null;
    dispatch(setFilterLevel(newLevel));
    updateURL(selectedCategory, selectedType, newLevel, true);
    dispatch(sortAndFilterProducts());
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') as FilterCategoryType;
    const type = searchParams.get('cameratype') as FilterTypeType;
    const level = searchParams.get('level') as FilterLevelType;

    if (category) {
      if (category === FilterCategory.Photo || category === FilterCategory.Video) {
        dispatch(setFilterCategory(category));
      } else if (category !== null) {
        setTimeout(() => {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }, 0);
      }
    }
    if (type) {
      if (type === FilterType.Digital || type === FilterType.Film || type === FilterType.Instant || type === FilterType.Collection) {
        dispatch(setFilterType(type));
      } else if (type !== null) {
        setTimeout(() => {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }, 0);
      }
    }
    if (level) {
      if (level === FilterLevel.Zero || level === FilterLevel.Amateur || level === FilterLevel.Professional) {
        dispatch(setFilterLevel(level));
      } else if (level !== null) {
        setTimeout(() => {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }, 0);
      }
    }

    updateURL(category, type, level);
  }, [dispatch, location.search, updateURL]);

  useEffect(() => {
    dispatch(sortAndFilterProducts());
  }, [selectedCategory, selectedType, selectedLevel, updateURL, dispatch]);

  const handleResetButtonClick = () => {
    dispatch(setFilterCategory(null));
    dispatch(setFilterType(null));
    dispatch(setFilterLevel(null));
    dispatch(setFilterLowestPrice(null));
    dispatch(setFilterHighestPrice(null));
    updateURL(null, null, null);
    const params = new URLSearchParams(location.search);
    params.delete('pricelow');
    params.delete('pricehigh');
    params.delete('category');
    params.delete('cameratype');
    params.delete('level');
    dispatch(sortAndFilterProducts());
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <div className="catalog__aside" data-testid="filtration">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <PriceInput />
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  checked={selectedCategory === FilterCategory.Photo}
                  onChange={handleCategoryChange(FilterCategory.Photo)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterCategory.Photo}
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="videocamera"
                  checked={selectedCategory === FilterCategory.Video}
                  onChange={handleCategoryChange(FilterCategory.Video)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterCategory.Video}
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="digital"
                  onChange={handleTypeChange(FilterType.Digital)}
                  checked={selectedType === FilterType.Digital}

                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterType.Digital}
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="film"
                  onChange={handleTypeChange(FilterType.Film)}
                  checked={selectedType === FilterType.Film}
                  disabled={selectedCategory === FilterCategory.Video}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterType.Film}
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="snapshot"
                  onChange={handleTypeChange(FilterType.Instant)}
                  checked={selectedType === FilterType.Instant}
                  disabled={selectedCategory === FilterCategory.Video}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterType.Instant}
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="collection"
                  onChange={handleTypeChange(FilterType.Collection)}
                  checked={selectedType === FilterType.Collection}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterType.Collection}
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="zero"
                  onChange={handleLevelChange(FilterLevel.Zero)}
                  checked={selectedLevel === FilterLevel.Zero}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">{FilterLevel.Zero}</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="non-professional"
                  onChange={handleLevelChange(FilterLevel.Amateur)}
                  checked={selectedLevel === FilterLevel.Amateur}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterLevel.Amateur}
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="professional"
                  onChange={handleLevelChange(FilterLevel.Professional)}
                  checked={selectedLevel === FilterLevel.Professional}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {FilterLevel.Professional}
                </span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetButtonClick}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
};
