import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StorePerisistState = {
  storeId: number;
  storeName: string;
  storeCurrency: string;
  storePriceSource: string;
  isStore: boolean;
};

type StorePerisistAction = {
  setStoreId: (storeId: number) => void;
  getStoreId: () => number;
  setStoreName: (storeName: string) => void;
  getStoreName: () => string;
  setStoreCurrency: (storeCurrency: string) => void;
  getStoreCurrency: () => string;
  setStorePriceSource: (storePriceSource: string) => void;
  getStorePriceSource: () => string;
  setIsStore: (isStore: boolean) => void;
  getIsStore: () => boolean;

  resetStore: () => void;
};

const initialStoreState: StorePerisistState = {
  storeId: 0,
  storeName: '',
  storeCurrency: '',
  storePriceSource: '',
  isStore: false,
};

export const useStorePresistStore = create(
  persist<StorePerisistState & StorePerisistAction>(
    (set, get) => ({
      ...initialStoreState,

      setStoreId: (value) => set(() => ({ storeId: value })),
      getStoreId: () => get().storeId,
      setStoreName: (value) => set(() => ({ storeName: value })),
      getStoreName: () => get().storeName,
      setStoreCurrency: (value) => set(() => ({ storeCurrency: value })),
      getStoreCurrency: () => get().storeCurrency,
      setStorePriceSource: (value) => set(() => ({ storePriceSource: value })),
      getStorePriceSource: () => get().storePriceSource,
      setIsStore: (value) => set(() => ({ isStore: value })),
      getIsStore: () => get().isStore,

      resetStore: () => {
        set(initialStoreState);
      },
    }),
    {
      name: 'cryptopayserver.store.store',
    },
  ),
);
