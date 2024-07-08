import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPerisistState {
  userEmail: string;

  setUserEmail: (userEmail: string) => void;
  getUserEmail: () => string;

  resetUser: () => void;
}

export const useUserPresistStore = create(
  persist<UserPerisistState>(
    (set, get) => ({
      userEmail: '',

      setUserEmail: (value) => set(() => ({ userEmail: value })),
      getUserEmail: () => get().userEmail,

      resetUser: () => {
        set((state) => {
          return {
            ...state,

            userEmail: '',
          };
        });
      },
    }),
    {
      name: 'cryptopayserver.user.store',
    },
  ),
);
