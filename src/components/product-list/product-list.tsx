import { ProductCard } from '../product-card/product-card';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts, getProductsLoadStatus } from '../../store/product-process/selectors';
import { LoadingScreen } from '../loading-screen/loading-screen';

export const ProductList = () => {
  const products = useAppSelector(getProducts);
  const isLoading = useAppSelector(getProductsLoadStatus);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="cards catalog__cards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
};
