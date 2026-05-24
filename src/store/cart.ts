'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Cart, CartLine } from '@/types/product';

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;

  setCart: (cart: Cart | null) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setLoading: (loading: boolean) => void;

  // Optimistic updates
  optimisticAddItem: (line: CartLine) => void;
  optimisticRemoveItem: (lineId: string) => void;
  optimisticUpdateQuantity: (lineId: string, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isOpen: false,
      isLoading: false,

      setCart: (cart) => set({ cart }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      setLoading: (isLoading) => set({ isLoading }),

      optimisticAddItem: (line) =>
        set((state) => {
          if (!state.cart) {
            return {
              cart: {
                id: 'optimistic',
                code: '',
                state: 'AddingItems',
                totalQuantity: line.quantity,
                subTotalWithTax: line.linePriceWithTax,
                totalWithTax: line.linePriceWithTax,
                shippingWithTax: 0,
                lines: [line],
                shippingLines: [],
              },
            };
          }

          const existingLineIndex = state.cart.lines.findIndex(
            (l) => l.productVariant.id === line.productVariant.id
          );

          if (existingLineIndex >= 0) {
            const updatedLines = [...state.cart.lines];
            const existingLine = updatedLines[existingLineIndex];
            if (existingLine) {
              updatedLines[existingLineIndex] = {
                ...existingLine,
                quantity: existingLine.quantity + line.quantity,
                linePriceWithTax:
                  existingLine.unitPriceWithTax * (existingLine.quantity + line.quantity),
              };
            }
            return {
              cart: {
                ...state.cart,
                lines: updatedLines,
                totalQuantity: state.cart.totalQuantity + line.quantity,
                subTotalWithTax: state.cart.subTotalWithTax + line.linePriceWithTax,
                totalWithTax: state.cart.totalWithTax + line.linePriceWithTax,
              },
            };
          }

          return {
            cart: {
              ...state.cart,
              lines: [...state.cart.lines, line],
              totalQuantity: state.cart.totalQuantity + line.quantity,
              subTotalWithTax: state.cart.subTotalWithTax + line.linePriceWithTax,
              totalWithTax: state.cart.totalWithTax + line.linePriceWithTax,
            },
          };
        }),

      optimisticRemoveItem: (lineId) =>
        set((state) => {
          if (!state.cart) return state;
          const line = state.cart.lines.find((l) => l.id === lineId);
          if (!line) return state;
          return {
            cart: {
              ...state.cart,
              lines: state.cart.lines.filter((l) => l.id !== lineId),
              totalQuantity: state.cart.totalQuantity - line.quantity,
              subTotalWithTax: state.cart.subTotalWithTax - line.linePriceWithTax,
              totalWithTax: state.cart.totalWithTax - line.linePriceWithTax,
            },
          };
        }),

      optimisticUpdateQuantity: (lineId, quantity) =>
        set((state) => {
          if (!state.cart) return state;
          const updatedLines = state.cart.lines.map((l) => {
            if (l.id !== lineId) return l;
            return {
              ...l,
              quantity,
              linePriceWithTax: l.unitPriceWithTax * quantity,
            };
          });
          const totals = updatedLines.reduce(
            (acc, l) => ({ qty: acc.qty + l.quantity, total: acc.total + l.linePriceWithTax }),
            { qty: 0, total: 0 }
          );
          return {
            cart: {
              ...state.cart,
              lines: updatedLines,
              totalQuantity: totals.qty,
              subTotalWithTax: totals.total,
              totalWithTax: totals.total + state.cart.shippingWithTax,
            },
          };
        }),
    }),
    {
      name: 'atelier-cart',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export const useCartCount = () => useCartStore((s) => s.cart?.totalQuantity ?? 0);
export const useIsCartOpen = () => useCartStore((s) => s.isOpen);
