import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPerisistState {
  userId: number;
  userEmail: string;
  username: string;
  isLogin: boolean;
  useStoreId: number;

  setUserId: (userId: number) => void;
  getUserId: () => number;
  setUserEmail: (userEmail: string) => void;
  getUserEmail: () => string;
  setUsername: (username: string) => void;
  getUsername: () => string;
  setIsLogin: (isLogin: boolean) => void;
  getIsLogin: () => boolean;
  setUseStoreId: (useStoreId: number) => void;
  getUseStoreId: () => number;

  resetUser: () => void;
}

export const useUserPresistStore = create(
  persist<UserPerisistState>(
    (set, get) => ({
      userId: 0,
      userEmail: '',
      username: '',
      isLogin: false,
      useStoreId: 0,

      setUserId: (value) => set(() => ({ userId: value })),
      getUserId: () => get().userId,
      setUserEmail: (value) => set(() => ({ userEmail: value })),
      getUserEmail: () => get().userEmail,
      setUsername: (value) => set(() => ({ username: value })),
      getUsername: () => get().username,
      setIsLogin: (value) => set(() => ({ isLogin: value })),
      getIsLogin: () => get().isLogin,
      setUseStoreId: (value) => set(() => ({ useStoreId: value })),
      getUseStoreId: () => get().useStoreId,

      resetUser: () => {
        set((state) => {
          return {
            ...state,

            userId: 0,
            userEmail: '',
            username: '',
            isLogin: false,
            useStoreId: 0,
          };
        });
      },
    }),
    {
      name: 'cryptopayserver.store.user',
    },
  ),
);
