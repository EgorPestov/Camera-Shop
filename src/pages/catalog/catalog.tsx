import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { Filtration } from '../../components/filtration/filtration';
import { Sorting } from '../../components/sorting/sorting';
import { Pagination } from '../../components/pagination/pagination';
import { ProductList } from '../../components/product-list/product-list';
import { Banner } from '../../components/banner/banner';
import { ModalAddItem } from '../../components/modals/modal-add-item/modal-add-item';
import { ModalAddItemSuccess } from '../../components/modals/modal-add-item-success/modal-add-item-success';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getModalAddItemStatus, getModalAddItemSuccessStatus } from '../../store/modals-process/selectors';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchProducts } from '../../store/api-actions';
import { getShowableProducts } from '../../store/product-process/selectors';
import { setFilterCategory, setFilterLevel, setFilterType, setSortingDirection, setSortingType } from '../../store/product-process/product-process';

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const isModalAddItemOpen = useAppSelector(getModalAddItemStatus);
  const isModalAddItemSuccessOpen = useAppSelector(getModalAddItemSuccessStatus);
  const showableProducts = useAppSelector(getShowableProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="wrapper" data-testid="catalog">
      <Helmet>
        <title>Фотошоп</title>
      </Helmet>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    className="breadcrumbs__link"
                    to={AppRoute.Root}
                    onClick={() => {
                      dispatch(setFilterCategory(null));
                      dispatch(setFilterType(null));
                      dispatch(setFilterLevel(null));
                      dispatch(setSortingDirection(null));
                      dispatch(setSortingType(null));
                    }}
                  >
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <Filtration />
                <div className="catalog__content">
                  <Sorting />
                  <ProductList />
                  {showableProducts.length === 0 ? (<h1>Ничего не найдено</h1>) : ''}
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
        {isModalAddItemOpen ? (<ModalAddItem />) : ''}
        {isModalAddItemSuccessOpen ? (<ModalAddItemSuccess />) : ''}
      </main>
      <Footer />
    </div>
  );
};
