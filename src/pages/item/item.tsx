import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { SimilarProducts } from '../../components/similar-products/similar-products';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { getCurrentProduct, getProductsLoadStatus, getModalAddItemStatus, getModalAddItemSuccessStatus } from '../../store/product-process/selectors';
import { setIsModalAddItemOpen } from '../../store/product-process/product-process';
import { setCurrentId } from '../../store/product-process/product-process';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { AppRoute } from '../../const';
import { ModalAddItem } from '../../components/modals/modal-add-item/modal-add-item';
import { ModalAddItemSuccess } from '../../components/modals/modal-add-item-success/modal-add-item-success';
import { Reviews } from '../../components/reviews/reviews';
import { Helmet } from 'react-helmet-async';
import { redirectToRoute } from '../../store/actions';
import { ModalAddReview } from '../../components/modals/modal-add-review/modal-add-review';

export const Item = () => {
  const currentId = useParams().id;
  const dispatch = useAppDispatch();
  const isModalAddItemOpen = useAppSelector(getModalAddItemStatus);
  const isModalAddItemSuccessOpen = useAppSelector(getModalAddItemSuccessStatus);

  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  let currentOption = searchParams.get('tab');


  if (!currentOption) {
    currentOption = 'dscrptn';
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setCurrentId(Number(currentId)));

    const baseUrl = location.pathname;

    if (!searchParams.has('tab')) {
      searchParams.append('tab', 'dscrptn');
      const newUrl = `${baseUrl}?${searchParams.toString()}`;
      history.replaceState(null, '', newUrl);
    }
  }, [dispatch, currentId, location, searchParams]);

  const product = useAppSelector(getCurrentProduct);
  const isProductsLoading = useAppSelector(getProductsLoadStatus);

  if (isProductsLoading) {
    return (<LoadingScreen />);
  } else if (product !== undefined && currentId !== undefined) {
    return (
      <div className="wrapper">
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <Header />
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Root}>
                      Главная
                      <svg width={5} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini" />
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Root}>
                      Каталог
                      <svg width={5} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini" />
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link breadcrumbs__link--active">
                      {product.name}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`/markup/${product.previewImgWebp}, /markup/${product.previewImgWebp2x} 2x`}
                      />
                      <img
                        src={`/markup/${product.previewImg}`}
                        srcSet={`/markup/${product.previewImg2x} 2x`}
                        width={560}
                        height={480}
                        alt={product.name}
                      />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{product.name}</h1>
                    <div className="rate product__rate">
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg key={index} width={17} height={16} aria-hidden="true">
                          <use xlinkHref={index < product.rating ? '#icon-full-star' : '#icon-star'} />
                        </svg>
                      ))}
                      <p className="visually-hidden">Рейтинг: 4</p>
                      <p className="rate__count">
                        <span className="visually-hidden">Всего оценок:</span>12
                      </p>
                    </div>
                    <p className="product__price">
                      <span className="visually-hidden">Цена:</span>73 450 ₽
                    </p>
                    <button className="btn btn--purple" type="button" onClick={() => dispatch(setIsModalAddItemOpen(true))}>
                      <svg width={24} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>
                      Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <button
                          className={`tabs__control ${currentOption === 'spec' ? 'is-active' : ''}`}
                          type="button"
                          onClick={() => {
                            dispatch(redirectToRoute(`${AppRoute.Item}/${currentId}?tab=spec`));
                          }}
                        >
                          Характеристики
                        </button>
                        <button
                          className={`tabs__control ${currentOption === 'dscrptn' ? 'is-active' : ''}`}
                          type="button"
                          onClick={() => {
                            dispatch(redirectToRoute(`${AppRoute.Item}/${currentId}?tab=dscrptn`));
                          }}
                        >
                          Описание
                        </button>
                      </div>
                      <div className="tabs__content">
                        <div className={`tabs__element ${currentOption === 'spec' ? 'is-active' : ''}`}>
                          <ul className="product__tabs-list">
                            <li className="item-list">
                              <span className="item-list__title">Артикул: </span>
                              <p className="item-list__text">{product.vendorCode}</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Категория:</span>
                              <p className="item-list__text">{product.type}</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">{product.category}</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">{product.level}</p>
                            </li>
                          </ul>
                        </div>
                        <div className={`tabs__element ${currentOption === 'dscrptn' ? 'is-active' : ''}`}>
                          <div className="product__tabs-text">
                            <p>
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <SimilarProducts />
            </div>
            <div className="page-content__section">
              <Reviews />
            </div>
          </div>
          {isModalAddItemOpen ? (<ModalAddItem />) : ''}
          {isModalAddItemSuccessOpen ? (<ModalAddItemSuccess />) : ''}
        </main>
        <a className="up-btn" href="#header">
          <svg width={12} height={18} aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </a>
        <ModalAddReview />
        <Footer />
      </div>
    );
  }
};
