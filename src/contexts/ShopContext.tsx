import React, { useState, useContext, createContext, useEffect } from 'react';

type ShopContextProviderProps = {
  children: React.ReactNode;
};

type ShopContext = {
  cartItems: [];
  setCartItems: React.Dispatch<React.SetStateAction<never[]>>;
  products: [];
  setProducts: React.Dispatch<React.SetStateAction<never[]>>;
  totalItems: number;
};

export const ShopContext = createContext<ShopContext | null>(null);

//    Products | cartItems - setCartItems - totalItems (may be just a regular function idk)

export default function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
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
    <ShopContext.Provider
      value={{ cartItems, setCartItems, products, totalItems }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShopContext must be used within a ShopContextProvider');
  }

  return context;
}
