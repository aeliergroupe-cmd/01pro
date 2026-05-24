'use client';

import { useCallback } from 'react';
import { useCartStore } from '@/store/cart';
import type { CartLine } from '@/types/product';

export function useCart() {
  const {
    cart,
    isOpen,
    isLoading,
    setCart,
    openCart,
    closeCart,
    toggleCart,
    setLoading,
    optimisticAddItem,
    optimisticRemoveItem,
    optimisticUpdateQuantity,
  } = useCartStore();

  const addItem = useCallback(
    async (productVariantId: string, quantity: number = 1, optimisticLine?: CartLine) => {
      if (optimisticLine) {
        optimisticAddItem(optimisticLine);
      }
      setLoading(true);
      openCart();

      try {
        const response = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productVariantId, quantity }),
        });
        const data = await response.json() as { cart?: typeof cart };
        if (data.cart) setCart(data.cart);
      } catch (error) {
        console.error('[Cart] Failed to add item:', error);
      } finally {
        setLoading(false);
      }
    },
    [optimisticAddItem, setLoading, openCart, setCart]
  );

  const removeItem = useCallback(
    async (orderLineId: string) => {
      optimisticRemoveItem(orderLineId);
      setLoading(true);

      try {
        const response = await fetch('/api/cart/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderLineId }),
        });
        const data = await response.json() as { cart?: typeof cart };
        if (data.cart) setCart(data.cart);
      } catch (error) {
        console.error('[Cart] Failed to remove item:', error);
      } finally {
        setLoading(false);
      }
    },
    [optimisticRemoveItem, setLoading, setCart]
  );

  const updateQuantity = useCallback(
    async (orderLineId: string, quantity: number) => {
      if (quantity <= 0) {
        return removeItem(orderLineId);
      }
      optimisticUpdateQuantity(orderLineId, quantity);
      setLoading(true);

      try {
        const response = await fetch('/api/cart/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderLineId, quantity }),
        });
        const data = await response.json() as { cart?: typeof cart };
        if (data.cart) setCart(data.cart);
      } catch (error) {
        console.error('[Cart] Failed to update quantity:', error);
      } finally {
        setLoading(false);
      }
    },
    [optimisticUpdateQuantity, setLoading, setCart, removeItem]
  );

  return {
    cart,
    isOpen,
    isLoading,
    lineCount: cart?.totalQuantity ?? 0,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    updateQuantity,
  };
}
