import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WalletPerisistState = {
  walletId: number;
  isWallet: boolean;
};

type WalletPerisistAction = {
  setWalletId: (walletId: number) => void;
  getWalletId: () => number;
  setIsWallet: (isWallet: boolean) => void;
  getIsWallet: () => boolean;

  resetWallet: () => void;
};

const initialWalletState: WalletPerisistState = {
  walletId: 0,
  isWallet: false,
};

export const useWalletPresistStore = create(
  persist<WalletPerisistState & WalletPerisistAction>(
    (set, get) => ({
      ...initialWalletState,

      setWalletId: (value) => set(() => ({ walletId: value })),
      getWalletId: () => get().walletId,
      setIsWallet: (value) => set(() => ({ isWallet: value })),
      getIsWallet: () => get().isWallet,

      resetWallet: () => {
        set(initialWalletState);
      },
    }),
    {
      name: 'cryptopayserver.store.wallet',
    },
  ),
);
