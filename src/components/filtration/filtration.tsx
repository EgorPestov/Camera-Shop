import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sortAndFilterProducts, setFilterCatefory, setFilterLevel, setFilterType } from '../../store/product-process/product-process';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getFilterCategory, getFilterType, getFilterLevel } from '../../store/product-process/selectors';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { redirectToRoute } from '../../store/actions';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { formatString } from '../../utils';

export const Filtration = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(getFilterCategory);
  const selectedType = useAppSelector(getFilterType);
  const selectedLevel = useAppSelector(getFilterLevel);
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);


  const handleCategoryChange = (category: 'Фотоаппарат' | 'Видеокамера') => (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterCatefory(event.target.checked ? category : null));

    if (event.target.checked && category === 'Видеокамера' && (selectedType === 'Плёночная' || selectedType === 'Моментальная')) {
      dispatch(setFilterType(null));
    }

    dispatch(sortAndFilterProducts());
    dispatch(redirectToRoute(`${AppRoute.Root}?page=1`)); // вот здесь сложные ссылки со всеми параметрами если они есть
  };

  const handleTypeChange = (type: 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная') => (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterType(event.target.checked ? type : null));
    dispatch(sortAndFilterProducts());
    dispatch(redirectToRoute(`${AppRoute.Root}?page=1`));
  };

  const handleLevelChange = (level: 'Нулевой' | 'Любительский' | 'Профессиональный') => (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterLevel(event.target.checked ? level : null));
    dispatch(sortAndFilterProducts());
    dispatch(redirectToRoute(`${AppRoute.Root}?page=1`));
  };

  useEffect(() => {
    const updateUrlParams = () => {
      const params = new URLSearchParams(window.location.search);

      if (selectedCategory) {
        params.set('category', selectedCategory.toLowerCase());
      } else {
        params.delete('category');
      }

      if (selectedType) {
        params.set('cameratype', selectedType.toLowerCase());
      } else {
        params.delete('cameratype');
      }

      if (selectedLevel) {
        params.set('level', selectedLevel.toLowerCase());
      } else {
        params.delete('level');
      }

      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    };

    updateUrlParams();
  }, [selectedCategory, selectedType, selectedLevel]);

  useEffect(() => {
    const category = searchParams.get('category');
    const type = searchParams.get('cameratype');
    const level = searchParams.get('level');

    if (category) {
      console.log(category);
      if (category !== 'фотоаппарат' && category !== 'видеокамера') {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
      dispatch(setFilterCatefory(formatString(category)));
    }
    if (type) {
      if (type !== 'цифровая' && type !== 'плёночная' && type !== 'моментальная' && type !== 'коллекционная') {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
      dispatch(setFilterType(formatString(type)));
    }
    if (level) {
      if (level !== 'нулевой' && level !== 'любительский' && level !== 'профессиональный') {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
      dispatch(setFilterLevel(formatString(level)));
    }


    // dispatch(setFilterCatefory(category));
    // dispatch(setShowableProducts());
  }, [dispatch, location.search, searchParams]);

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
              dispatch(setFilterCatefory(null));
              dispatch(setFilterType(null));
              dispatch(setFilterLevel(null));
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
