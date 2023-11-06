import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sortAndFilterProducts, setFilterCategory, setFilterLevel, setFilterType } from '../../store/product-process/product-process';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getFilterCategory, getFilterType, getFilterLevel } from '../../store/product-process/selectors';
import { ChangeEvent, useEffect, useCallback } from 'react';
import { redirectToRoute } from '../../store/actions';
import { AppRoute } from '../../const';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterCategory, FilterLevel, FilterType } from '../../types';

export const Filtration = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(getFilterCategory);
  const selectedType = useAppSelector(getFilterType);
  const selectedLevel = useAppSelector(getFilterLevel);
  const location = useLocation();
  const navigate = useNavigate();

  const updateURL = useCallback(
    (
      category: FilterCategory,
      cameratype: FilterType,
      level: FilterLevel,
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

  const handleCategoryChange = (category: NonNullable<FilterCategory>) => (event: ChangeEvent<HTMLInputElement>) => {
    const newCategory = event.target.checked ? category : null;
    dispatch(setFilterCategory(newCategory));

    if (event.target.checked && category === 'Видеокамера' && (selectedType === 'Плёночная' || selectedType === 'Моментальная')) {
      dispatch(setFilterType(null));
    }
    updateURL(newCategory, newCategory === 'Видеокамера' && (selectedType === 'Плёночная' || selectedType === 'Моментальная') ? null : selectedType, selectedLevel, true);
    dispatch(sortAndFilterProducts());
  };

  const handleTypeChange = (type: NonNullable<FilterType>) => (event: ChangeEvent<HTMLInputElement>) => {
    const newType = event.target.checked ? type : null;
    dispatch(setFilterType(newType));
    updateURL(selectedCategory, newType, selectedLevel, true);
    dispatch(sortAndFilterProducts());
  };

  const handleLevelChange = (level: NonNullable<FilterLevel>) => (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = event.target.checked ? level : null;
    dispatch(setFilterLevel(newLevel));
    updateURL(selectedCategory, selectedType, newLevel, true);
    dispatch(sortAndFilterProducts());
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') as FilterCategory;
    const type = searchParams.get('cameratype') as FilterType;
    const level = searchParams.get('level') as FilterLevel;

    if (category) {
      if (category === 'Фотоаппарат' || category === 'Видеокамера') {
        dispatch(setFilterCategory(category));
      } else if (category !== null) {
        setTimeout(() => {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }, 0);
      }
    }
    if (type) {
      if (type === 'Цифровая' || type === 'Плёночная' || type === 'Моментальная' || type === 'Коллекционная') {
        dispatch(setFilterType(type));
      } else if (type !== null) {
        setTimeout(() => {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }, 0);
      }
    }
    if (level) {
      if (level === 'Нулевой' || level === 'Любительский' || level === 'Профессиональный') {
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

  return (
    <div className="catalog__aside" data-testid="filtration">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder="до"
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  checked={selectedCategory === 'Фотоаппарат'}
                  onChange={handleCategoryChange('Фотоаппарат')}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Фотокамера
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="videocamera"
                  checked={selectedCategory === 'Видеокамера'}
                  onChange={handleCategoryChange('Видеокамера')}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Видеокамера
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
                  onChange={handleTypeChange('Цифровая')}
                  checked={selectedType === 'Цифровая'}

                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Цифровая
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="film"
                  onChange={handleTypeChange('Плёночная')}
                  checked={selectedType === 'Плёночная'}
                  disabled={selectedCategory === 'Видеокамера'}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Плёночная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="snapshot"
                  onChange={handleTypeChange('Моментальная')}
                  checked={selectedType === 'Моментальная'}
                  disabled={selectedCategory === 'Видеокамера'}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Моментальная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="collection"
                  onChange={handleTypeChange('Коллекционная')}
                  checked={selectedType === 'Коллекционная'}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Коллекционная
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
                  onChange={handleLevelChange('Нулевой')}
                  checked={selectedLevel === 'Нулевой'}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="non-professional"
                  onChange={handleLevelChange('Любительский')}
                  checked={selectedLevel === 'Любительский'}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Любительский
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="professional"
                  onChange={handleLevelChange('Профессиональный')}
                  checked={selectedLevel === 'Профессиональный'}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Профессиональный
                </span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={() => {
              dispatch(setFilterCategory(null));
              dispatch(setFilterType(null));
              dispatch(setFilterLevel(null));
              updateURL(null, null, null);
              dispatch(sortAndFilterProducts());
            }}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
};
