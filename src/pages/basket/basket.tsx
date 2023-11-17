import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { AppRoute, CameraNames, MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from '../../const';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getBackupProducts, getProductsLoadStatus } from '../../store/product-process/selectors';
import { BasketType, ProductType } from '../../types';
import { fetchProducts } from '../../store/api-actions';
import { formatPrice } from '../../utils';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';

export const Basket = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getBackupProducts);
  const [basketProducts, setBasketProducts] = useState<ProductType[]>([]);
  const [productQuantities, setProductQuantities] = useState<BasketType>({});
  const basketData = localStorage.getItem('Basket');
  const isProductsLoading = useAppSelector(getProductsLoadStatus);
  const [isBasketDataLoading, setIsBasketDataLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (basketData) {
      const basket = JSON.parse(basketData) as BasketType;
      setProductQuantities(basket);
      const keys = Object.keys(basket);

      const filteredProducts = products.filter((product) => keys.includes(String(product.id)));
      setBasketProducts(filteredProducts);
    }
    setIsBasketDataLoading(false);
  }, [products, basketData]);

  useEffect(() => {
    if (!isProductsLoading && !isBasketDataLoading && products.length > 0) {
      setIsInitialized(true);
    }
  }, [isProductsLoading, isBasketDataLoading, products]);

  const increaseQuantity = (productId: string) => {
    const newQuantities = { ...productQuantities };
    newQuantities[productId] = Math.min(MAX_PRODUCT_QUANTITY, newQuantities[productId] + 1);
    setProductQuantities(newQuantities);
    localStorage.setItem('Basket', JSON.stringify(newQuantities));
  };

  const decreaseQuantity = (productId: string) => {
    const newQuantities = { ...productQuantities };
    newQuantities[productId] = Math.max(MIN_PRODUCT_QUANTITY, newQuantities[productId] - 1);
    setProductQuantities(newQuantities);
    localStorage.setItem('Basket', JSON.stringify(newQuantities));
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= MIN_PRODUCT_QUANTITY && quantity <= MAX_PRODUCT_QUANTITY) {
      const newQuantities = { ...productQuantities };
      newQuantities[productId] = quantity;
      setProductQuantities(newQuantities);
      localStorage.setItem('Basket', JSON.stringify(newQuantities));
    }
  };

  const handleDeleteClick = (productId: string) => {
    const newQuantities = { ...productQuantities };
    delete newQuantities[productId];
    setProductQuantities(newQuantities);
    localStorage.setItem('Basket', JSON.stringify(newQuantities));
    const updatedBasketProducts = basketProducts.filter((product) => String(product.id) !== productId);
    setBasketProducts(updatedBasketProducts);
  };

  const totalSum = basketProducts.reduce((sum, product) => sum + product.price * productQuantities[product.id], 0);

  const discount = 0.3; // УДАЛИТЬ ПОСЛЕ ДОБАВЛЕНИЯ СКИДОК
  const finalSum = discount ? Math.round(totalSum * (1 - discount)) : totalSum;

  if (!isInitialized) {
    return (<LoadingScreen />);
  } else {
    return (
      <div className='wrapper' data-testid="basket">
        <Helmet>
          <title>{'Корзина'}</title>
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
                      Корзина
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  {basketProducts.length > 0 && !isBasketDataLoading ? basketProducts.map((product) => (
                    <li
                      className="basket-item"
                      key={product.id}
                    >
                      <div className="basket-item__img">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}
                          />
                          <img
                            src={`/${product.previewImg}`}
                            srcSet={`/${product.previewImg2x} 2x`}
                            width={140}
                            height={120}
                            alt={product.name}
                          />
                        </picture>
                      </div>
                      <div className="basket-item__description">
                        <p className="basket-item__title">{product.name}</p>
                        <ul className="basket-item__list">
                          <li className="basket-item__list-item">
                            <span className="basket-item__article">Артикул: </span>
                            <span className="basket-item__number">{product.vendorCode}</span>
                          </li>
                          <li className="basket-item__list-item">{product.type} {CameraNames[product.category]}</li>
                          <li className="basket-item__list-item">{product.level} уровень</li>
                        </ul>
                      </div>
                      <p className="basket-item__price">
                        <span className="visually-hidden">Цена:</span>
                        {formatPrice(product.price)} ₽
                      </p>
                      <div className="quantity">
                        <button
                          className="btn-icon btn-icon--prev"
                          aria-label="уменьшить количество товара"
                          onClick={() => decreaseQuantity(String(product.id))}
                        >
                          <svg width={7} height={12} aria-hidden="true">
                            <use xlinkHref="#icon-arrow" />
                          </svg>
                        </button>
                        <label className="visually-hidden" htmlFor="counter1" />
                        <input
                          type="number"
                          id={`counter-${product.id}`}
                          value={productQuantities[product.id]}
                          min={MIN_PRODUCT_QUANTITY}
                          max={MAX_PRODUCT_QUANTITY}
                          aria-label="количество товара"
                          onChange={(e) => handleQuantityChange(String(product.id), e.target.value)}
                        />
                        <button
                          className="btn-icon btn-icon--next"
                          aria-label="увеличить количество товара"
                          onClick={() => increaseQuantity(String(product.id))}
                        >
                          <svg width={7} height={12} aria-hidden="true">
                            <use xlinkHref="#icon-arrow" />
                          </svg>
                        </button>
                      </div>
                      <div className="basket-item__total-price">
                        <span className="visually-hidden">Общая цена:</span>
                        {formatPrice(product.price * productQuantities[product.id])} ₽
                      </div>
                      <button
                        className="cross-btn"
                        type="button"
                        aria-label="Удалить товар"
                        onClick={() => handleDeleteClick(String(product.id))}
                      >
                        <svg width={10} height={10} aria-hidden="true">
                          <use xlinkHref="#icon-close" />
                        </svg>
                      </button>
                    </li>
                  )) : (
                    <p>Пока в корзине ничего нет</p>
                  )}
                </ul>

                <div className="basket__summary">
                  <div className="basket__promo">
                    <p className="title title--h4">
                      Если у вас есть промокод на скидку, примените его в этом поле
                    </p>
                    <div className="basket-form">
                      <form action="#">
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Промокод</span>
                            <input
                              type="text"
                              name="promo"
                              placeholder="Введите промокод"
                            />
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">Промокод принят!</p>
                        </div>
                        <button className="btn" type="submit">
                          Применить
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Всего:</span>
                      <span className="basket__summary-value">{formatPrice(totalSum)} ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span
                        className="basket__summary-value basket__summary-value--bonus"
                        style={discount ? {} : { color: 'black' }}
                      >
                        {discount ? formatPrice(totalSum - finalSum) : 0} ₽
                      </span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text basket__summary-text--total">
                        К оплате:
                      </span>
                      <span className="basket__summary-value basket__summary-value--total">
                        {formatPrice(finalSum)} ₽
                      </span>
                    </p>
                    <button className="btn btn--purple" type="submit">
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
};
