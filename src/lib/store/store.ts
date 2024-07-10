import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StorePerisistState {
  storeId: number;
  storeName: string;
  storeCurrency: string;
  storePriceSource: string;

  setStoreId: (storeId: number) => void;
  getStoreId: () => number;
  setStoreName: (storeName: string) => void;
  getStoreName: () => string;
  setStoreCurrency: (storeCurrency: string) => void;
  getStoreCurrency: () => string;
  setStorePriceSource: (storePriceSource: string) => void;
  getStorePriceSource: () => string;

  resetStore: () => void;
}

export const useStorePresistStore = create(
  persist<StorePerisistState>(
    (set, get) => ({
      storeId: 0,
      storeName: '',
      storeCurrency: '',
      storePriceSource: '',

      setStoreId: (value) => set(() => ({ storeId: value })),
      getStoreId: () => get().storeId,
      setStoreName: (value) => set(() => ({ storeName: value })),
      getStoreName: () => get().storeName,
      setStoreCurrency: (value) => set(() => ({ storeCurrency: value })),
      getStoreCurrency: () => get().storeCurrency,
      setStorePriceSource: (value) => set(() => ({ storePriceSource: value })),
      getStorePriceSource: () => get().storePriceSource,

      resetStore: () => {
        set((state) => {
          return {
            ...state,

            storeId: 0,
            storeName: '',
            storeCurrency: '',
            storePriceSource: '',
          };
        });
      },
    }),
    {
      name: 'cryptopayserver.store.store',
    },
  ),
);
