import { SHOWABLE_CARDS_PER_PAGE_COUNT } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts } from '../../store/product-process/selectors';

export const Pagination = () => {

  const products = useAppSelector(getProducts);

  if (products.length > SHOWABLE_CARDS_PER_PAGE_COUNT) {
    return (
      <div className="pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--active"
              href={1}
            >
              1
            </a>
          </li>
          <li className="pagination__item">
            <a className="pagination__link" href={2}>
              2
            </a>
          </li>
          <li className="pagination__item">
            <a className="pagination__link" href={3}>
              3
            </a>
          </li>
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              href={2}
            >
              Далее
            </a>
          </li>
        </ul>
      </div>
    );
  }
};
