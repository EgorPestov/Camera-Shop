import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setSortingType, setSortingDirection, sortProducts, setShowableProducts } from '../../store/product-process/product-process';


export const Sorting = () => {
  const dispatch = useAppDispatch();

  const handleTypeClick = (item: 'price' | 'popularity') => {
    dispatch(setSortingType(item));
    dispatch(sortProducts());
    dispatch(setShowableProducts());
  };

  const handleDirectionClick = (item: 'top' | 'down') => {
    dispatch(setSortingDirection(item));
    dispatch(sortProducts());
    dispatch(setShowableProducts());
  };

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
                defaultChecked
                onClick={() => handleTypeClick('price')}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onClick={() => handleTypeClick('popularity')}
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
                defaultChecked
                aria-label="По возрастанию"
                onClick={() => handleDirectionClick('top')}
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
                aria-label="По убыванию"
                onClick={() => handleDirectionClick('down')}
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
