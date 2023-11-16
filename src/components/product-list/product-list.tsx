import { ProductCard } from '../product-card/product-card';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getShowableProducts } from '../../store/product-process/selectors';
import { BasketType } from '../../types';

export const ProductList = () => {
  const products = useAppSelector(getShowableProducts);
  const basket = JSON.parse(localStorage.getItem('Basket') || '{}') as BasketType;

  return (
    <div className="cards catalog__cards" data-testid="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          basket={!!basket[product.id]}
        />
      ))}
    </div>
  );
};
