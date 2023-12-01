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
      // Get the current state of items
      const currentItems = get().items;
      
      // Check if user already has an existing item in the cart
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast("Item already in cart.");
      }

      set({ items: [...get().items, data] });
      toast.success("Item added to cart.")
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
    },
    removeAll(): () => set({}),
  }))
);

export default useCart;