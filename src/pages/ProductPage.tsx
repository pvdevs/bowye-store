import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail/ProductDetail';
import { useShopContext } from '../contexts/ShopContext';

export const ProductPage = () => {
  const { products } = useShopContext();
  const { productId } = useParams();

  if (!productId) {
    throw new Error('Must contain a product id!');
  }

  const currentProduct = products?.find(
    (product) => product.id === parseInt(productId)
  );

  if (!currentProduct) {
    throw new Error('Current product id not found');
  }

  return (
    <>
      <ProductDetail
        currentProduct={currentProduct}
        currentProductId={parseInt(productId)}
      />
    </>
  );
};
