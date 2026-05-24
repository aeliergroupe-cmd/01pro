'use client';

import { create } from 'zustand';

interface UIState {
  isMobileNavOpen: boolean;
  isMegaMenuOpen: boolean;
  activeMegaMenuCategory: string | null;
  isSearchOpen: boolean;
  quickViewProductId: string | null;

  openMobileNav: () => void;
  closeMobileNav: () => void;
  openMegaMenu: (category: string) => void;
  closeMegaMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  isMegaMenuOpen: false,
  activeMegaMenuCategory: null,
  isSearchOpen: false,
  quickViewProductId: null,

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  openMegaMenu: (category) => set({ isMegaMenuOpen: true, activeMegaMenuCategory: category }),
  closeMegaMenu: () => set({ isMegaMenuOpen: false, activeMegaMenuCategory: null }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openQuickView: (productId) => set({ quickViewProductId: productId }),
  closeQuickView: () => set({ quickViewProductId: null }),
}));
