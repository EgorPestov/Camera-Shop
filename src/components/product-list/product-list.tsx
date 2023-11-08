import { ProductCard } from '../product-card/product-card';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getShowableProducts } from '../../store/product-process/selectors';

export const ProductList = () => {
  const products = useAppSelector(getShowableProducts);

  return (
    <div className="cards catalog__cards" data-testid="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
