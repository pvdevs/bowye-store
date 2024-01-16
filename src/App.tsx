import React, { createContext, useEffect } from 'react';
import './App.scss';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Product from './components/ProductsList/Product';
import { useState } from 'react';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { AllProducts } from './components/AllProducts/AllProducts';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState([]);
  const totalItems = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

  useEffect(() => {
    async function getData() {
      const products = await fetch('https://fakestoreapi.com/products').then(
        (response) => {
          if (response.status >= 400) {
            throw new Error('server error');
          }
          return response.json();
        }
      );
      setProducts(products);
    }

    getData();
  }, []);

  //All Products
  return (
    <div className="content">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route
          path="shop/:productId"
          element={
            <ProductPage
              products={products}
              items={cartItems}
              setItems={setCartItems}
            />
          }
        />
      </Routes>
    </div>
  );

  // //Shopping Cart

  // return (
  //   <div>
  //     <ShoppingCart items={items} setItems={setItems} totalItems={totalItems} />
  //   </div>
  // );

  /*
  Product Details
  return (
    <ProductDetail
      items={items}
      setItems={setItems}
      totalItems={totalItems}
      currentProduct={mockItem}
    />
  );

  */
}
