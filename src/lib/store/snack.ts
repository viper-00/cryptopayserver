import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SnackPerisistState {
  snackOpen: boolean;
  snackMessage: string;
  snackSeverity: 'success' | 'info' | 'warning' | 'error';

  setSnackOpen: (snackOpen: boolean) => void;
  getSnackOpen: () => boolean;
  setSnackMessage: (message: string) => void;
  getSnackMessage: () => string;
  setSnackSeverity: (severity: 'success' | 'info' | 'warning' | 'error') => void;
  getSnackSeverity: () => 'success' | 'info' | 'warning' | 'error';

  resetSnack: () => void;
}

export const useSnackPresistStore = create(
  persist<SnackPerisistState>(
    (set, get) => ({
      snackOpen: false,
      snackMessage: '',
      snackSeverity: 'success',

      setSnackOpen: (value) => set(() => ({ snackOpen: value })),
      getSnackOpen: () => get().snackOpen,
      setSnackMessage: (value) => set(() => ({ snackMessage: value })),
      getSnackMessage: () => get().snackMessage,
      setSnackSeverity: (value) => set(() => ({ snackSeverity: value })),
      getSnackSeverity: () => get().snackSeverity,

      resetSnack: () => {
        set((state) => {
          return {
            ...state,

            snackOpen: false,
            snackMessage: '',
            snackSeverity: 'success',
          };
        });
      },
    }),
    {
      name: 'cryptopayserver.store.snack',
    },
  ),
);
