import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserPerisistState = {
  userId: number;
  userEmail: string;
  username: string;
  isLogin: boolean;
  userTheme: 'auto' | 'light' | 'dark';
  userHideSensitiveInfo: boolean;
};

type UserPerisistAction = {
  setUserId: (userId: number) => void;
  getUserId: () => number;
  setUserEmail: (userEmail: string) => void;
  getUserEmail: () => string;
  setUsername: (username: string) => void;
  getUsername: () => string;
  setIsLogin: (isLogin: boolean) => void;
  getIsLogin: () => boolean;
  setUserTheme: (theme: 'auto' | 'light' | 'dark') => void;
  getUserTheme: () => string;
  setUserHideSensitiveInfo: (userHideSensitiveInfo: boolean) => void;
  getUserHideSensitiveInfo: () => boolean;

  resetUser: () => void;
};

const initialUserState: UserPerisistState = {
  userId: 0,
  userEmail: '',
  username: '',
  isLogin: false,
  userTheme: 'auto',
  userHideSensitiveInfo: false,
};

export const useUserPresistStore = create(
  persist<UserPerisistState & UserPerisistAction>(
    (set, get) => ({
      ...initialUserState,

      setUserId: (value) => set(() => ({ userId: value })),
      getUserId: () => get().userId,
      setUserEmail: (value) => set(() => ({ userEmail: value })),
      getUserEmail: () => get().userEmail,
      setUsername: (value) => set(() => ({ username: value })),
      getUsername: () => get().username,
      setIsLogin: (value) => set(() => ({ isLogin: value })),
      getIsLogin: () => get().isLogin,
      setUserTheme: (value) => set(() => ({ userTheme: value })),
      getUserTheme: () => get().userTheme,
      setUserHideSensitiveInfo: (value) => set(() => ({ userHideSensitiveInfo: value })),
      getUserHideSensitiveInfo: () => get().userHideSensitiveInfo,

      resetUser: () => {
        set(initialUserState);
      },
    }),
    {
      name: 'cryptopayserver.store.user',
    },
  ),
);
