import { Link } from 'react-router-dom';
import { AppRoute, MIN_SEARCH_LENGTH } from '../../const';
import { ChangeEvent, useState, useRef } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts } from '../../store/product-process/selectors';
import { ProductType } from '../../types';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setCurrentId } from '../../store/product-process/product-process';
import { redirectToRoute } from '../../store/actions';

export const Header = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const [isListOpened, setIsListOpened] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [foundProducts, setFoundProducts] = useState<ProductType[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const searchValue = evt.target.value;
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFoundProducts(filteredProducts);
    if (filteredProducts.length === 0) {
      setIsListEmpty(true);
    } else {
      setIsListEmpty(false);
    }

    if (searchValue.length >= MIN_SEARCH_LENGTH) {
      setIsListOpened(true);
    } else {
      setIsListOpened(false);
    }
  };

  const handleResetClick = () => {
    setIsListOpened(false);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Root}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Root}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${isListOpened ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg
                className="form-search__icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens" />
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                onChange={handleSearchChange}
                ref={searchRef}
              />
            </label>
            <ul className="form-search__select-list scroller">
              {isListEmpty ?
                <li
                  className="form-search__select-item"
                  style={{ pointerEvents: 'none' }}
                >
                  Ничего не найдено
                </li> :
                foundProducts.map((product) => (
                  <li
                    className="form-search__select-item"
                    tabIndex={0}
                    key={product.id}
                    onClick={() => {
                      dispatch(setCurrentId(product.id));
                      dispatch(redirectToRoute(`${AppRoute.Item}/${product.id}?tab=dscrptn`));
                    }}
                  >
                    {product.name}
                  </li>
                ))}
            </ul>
          </form>
          <button
            className="form-search__reset"
            type="reset"
            onClick={handleResetClick}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
        </Link>
      </div>
    </header>
  );
};
