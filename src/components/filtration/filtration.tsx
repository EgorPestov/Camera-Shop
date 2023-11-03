import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sortAndFilterProducts, setFilterCatefory, setFilterLevel, setFilterType } from '../../store/product-process/product-process';
import { useState } from 'react';

export const Filtration = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<'Фотоаппарат' | 'Видеокамера' | null>(null);

  const handleCategoryChange = (category: 'Фотоаппарат' | 'Видеокамера') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectedCategory(isChecked ? category : null);
    dispatch(setFilterCatefory(isChecked ? category : null));
    dispatch(sortAndFilterProducts());
  };

  const handleTypeChange = (type: 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная') => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterType(event.target.checked ? type : null));
    dispatch(sortAndFilterProducts());
  };

  const handleLevelChange = (level: 'Нулевой' | 'Любительский' | 'Профессиональный') => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterLevel(event.target.checked ? level : null));
    dispatch(sortAndFilterProducts());
  };

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
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
};
