import React, { createContext, useEffect } from 'react';
import './App.scss';
import Product from './components/ProductsList/Product';
import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductPage } from './pages/ProductPage';
import { About } from './pages/About';
import { Cart } from './pages/Cart';

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
      const productsWithQuantity = products.map((product) => ({
        ...product,
        quantity: 1,
      }));
      setProducts(productsWithQuantity);
    }

    getData();
  }, []);

  //All Products
  return (
    <div className="content">
      <NavBar totalItems={totalItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop products={products} />} />
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
        <Route path="about" element={<About />} />
        <Route
          path="cart"
          element={
            <Cart
              items={cartItems}
              setItems={setCartItems}
              totalItems={totalItems}
            />
          }
        />
      </Routes>
    </div>
  );
}
