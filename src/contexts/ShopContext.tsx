import React, { useState, useContext, createContext, useEffect } from 'react';

type ShopContext = {
  cartItems: [];
  setCartItems: React.Dispatch<React.SetStateAction<never[]>>;
  products: [];
  setProducts: React.Dispatch<React.SetStateAction<never[]>>;
  totalItems: number;
};

export const ShopContext = createContext<ShopContext | null>(null);

export function useShopContext() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShopContext must be used within a ShopContextProvider');
  }

  return context;
}
