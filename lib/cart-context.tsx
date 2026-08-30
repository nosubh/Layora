"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartItem } from "./types";

const STORAGE_KEY = "layora-cart";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string | null, color: string | null) => void;
  updateQuantity: (
    productId: string,
    size: string | null,
    color: string | null,
    quantity: number
  ) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function sameLine(
  a: CartItem,
  productId: string,
  size: string | null,
  color: string | null
) {
  return a.productId === productId && a.size === size && a.color === color;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage once, on mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // Ignore corrupted storage — cart just starts empty.
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist to localStorage whenever the cart changes (after initial load).
  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage might be unavailable (private browsing, quota) — ignore.
    }
  }, [items, isLoaded]);

  function addItem(newItem: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) =>
        sameLine(i, newItem.productId, newItem.size, newItem.color)
      );
      if (existing) {
        return prev.map((i) =>
          sameLine(i, newItem.productId, newItem.size, newItem.color)
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  }

  function removeItem(
    productId: string,
    size: string | null,
    color: string | null
  ) {
    setItems((prev) =>
      prev.filter((i) => !sameLine(i, productId, size, color))
    );
  }

  function updateQuantity(
    productId: string,
    size: string | null,
    color: string | null,
    quantity: number
  ) {
    if (quantity <= 0) {
      removeItem(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        sameLine(i, productId, size, color) ? { ...i, quantity } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    isLoaded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
