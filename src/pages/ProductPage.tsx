import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail/ProductDetail';
import ProductsList from '../components/ProductsList/ProductsList';
import { useShopContext } from '../contexts/ShopContext';

export const ProductPage = () => {
  const { products, cartItems, setCartItems } = useShopContext();
  const { productId } = useParams();

  if (!productId) {
    throw new Error('Must contain a product id!');
  }

  const currentProduct = products?.find(
    (product) => product.id === parseInt(productId)
  );

  return (
    <>
      <ProductDetail
        items={cartItems}
        setItems={setCartItems}
        currentProduct={currentProduct}
        currentProductId={parseInt(productId)}
      />
    </>
  );
};
