import { Link } from 'react-router-dom';
import { AppRoute, MIN_SEARCH_LENGTH } from '../../const';
import { ChangeEvent, useEffect, KeyboardEvent, useState, useRef } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts, getCurrentPage } from '../../store/product-process/selectors';
import { ProductType } from '../../types';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setCurrentId } from '../../store/product-process/product-process';
import { redirectToRoute } from '../../store/actions';

export const Header = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const products = useAppSelector(getProducts);
  const [isListOpened, setIsListOpened] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [foundProducts, setFoundProducts] = useState<ProductType[]>([]);

  const searchRef = useRef<HTMLInputElement>(null);
  const refList = useRef<Array<HTMLLIElement | null>>([]);

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const searchValue = evt.target.value;
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFoundProducts(filteredProducts);
    if (filteredProducts.length === 0) {
      setIsListEmpty(true);
      setFocusedIndex(-1);
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

  const handleKeyDown = (evt: KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < foundProducts.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if (focusedIndex === 0) {
        if (searchRef.current) {
          searchRef.current.focus();
        }
        setFocusedIndex(-1);
      } else {
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    } else if (evt.key === 'Enter' && focusedIndex !== -1) {
      evt.preventDefault();
      const selectedProduct = foundProducts[focusedIndex];
      dispatch(setCurrentId(selectedProduct.id));
      dispatch(
        redirectToRoute(`${AppRoute.Item}/${selectedProduct.id}?tab=dscrptn`)
      );
    }

  };

  useEffect(() => {
    if (focusedIndex !== -1 && refList.current[focusedIndex]) {
      const element = refList.current[focusedIndex];
      if (element) {
        element.focus();
      }
    }
  }, [focusedIndex]);

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link
          className="header__logo"
          to={`${AppRoute.Root}?page=${currentPage}`}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className="main-nav__link"
                to={`${AppRoute.Root}?page=${currentPage}`}
              >
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
          <form onKeyDown={handleKeyDown}>
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
                foundProducts.map((product, index) => (
                  <li
                    className="form-search__select-item"
                    tabIndex={0}
                    key={product.id}
                    onClick={() => {
                      dispatch(setCurrentId(product.id));
                      dispatch(redirectToRoute(`${AppRoute.Item}/${product.id}?tab=dscrptn`));
                    }}
                    onFocus={() => setFocusedIndex(index)}
                    ref={(element) => (refList.current[index] = element)}
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
            onBlur={() => {
              if (searchRef.current) {
                searchRef.current.focus();
              }
            }}
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
