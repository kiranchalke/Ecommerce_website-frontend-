"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  qty: number;
  color?: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (id: number, color?: string, size?: string) => void;
  cartLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "ecom_cart";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
          console.log("[CartProvider] Cart loaded from localStorage:", parsed);
        } else {
          setCart([]);
          console.log("[CartProvider] localStorage cart is not an array, resetting.");
        }
      } catch (e) {
        setCart([]);
        console.log("[CartProvider] Failed to parse cart from localStorage.", e);
      }
    } else {
      setCart([]);
      console.log("[CartProvider] No cart found in localStorage, starting empty.");
    }
    setCartLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      console.log("[CartProvider] Cart saved to localStorage:", cart);
    }
  }, [cart, cartLoaded]);

  // Sync cart across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) {
        try {
          const newCart = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(newCart)) {
            setCart(newCart);
            console.log("[CartProvider] Cart updated from storage event:", newCart);
          } else {
            setCart([]);
            console.log("[CartProvider] Storage event cart is not an array, resetting.");
          }
        } catch (err) {
          setCart([]);
          console.log("[CartProvider] Failed to parse cart from storage event.", err);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addToCart = (item: Omit<CartItem, "qty">, qty: number = 1) => {
    setCart((prev) => {
      const found = prev.find(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
      );
      let updatedCart;
      if (found) {
        updatedCart = prev.map((i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, qty: i.qty + qty }
            : i
        );
      } else {
        updatedCart = [...prev, { ...item, qty }];
      }
      console.log("[CartProvider] addToCart called. Updated cart:", updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id: number, color?: string, size?: string) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => !(item.id === id && item.color === color && item.size === size));
      console.log("[CartProvider] removeFromCart called. Updated cart:", updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartLoaded }}>
      {children}
    </CartContext.Provider>
  );
} 