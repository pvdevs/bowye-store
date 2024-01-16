import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail/ProductDetail';
import ProductsList from '../components/ProductsList/ProductsList';

export const ProductPage = ({ products, items, setItems }: ProductsList) => {
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
        items={items}
        setItems={setItems}
        currentProduct={currentProduct}
        currentProductId={parseInt(productId)}
      />
    </>
  );
};
