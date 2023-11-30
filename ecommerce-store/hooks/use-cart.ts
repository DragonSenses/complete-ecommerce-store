import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {

    },
    removeItem: (id: string) => {

    },
    removeAll(): () => set({}),
  }))
);

export default useCart;