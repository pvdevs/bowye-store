import React, { useEffect } from 'react';
import './App.scss';
import Product from './components/Interfaces/Product';
import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductPage } from './pages/ProductPage';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { ShopContext } from './contexts/ShopContext';

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

  return (
    <div className="content">
      <ShopContext.Provider
        value={{ cartItems, setCartItems, products, totalItems }}
      >
        <NavBar totalItems={totalItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:productId" element={<ProductPage />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </ShopContext.Provider>
    </div>
  );
}
