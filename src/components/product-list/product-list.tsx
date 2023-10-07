import { ProductCard } from '../product-card/product-card';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts } from '../../store/product-process/selectors';

export const ProductList = () => {
  const products = useAppSelector(getProducts);

  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
