import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export type FirmType = {
  id: number;
  name: string;
};
export type FirmStore = {
  firms: FirmType[];
  isLoading: boolean;
  isReady: boolean;
  fetchAllFirms: () => void;
  cleanFirms: () => void;
};


const defaultState = {
  firms: [],
  isLoading: false,
  isReady: false,
};


export const useFirmStore = create<FirmStore>()(
  persist(
    (set) => ({
      ...defaultState,

      fetchAllFirms: () => {
        const dummyFirms = [
          { id: 1, name: 'Firm One' },
          { id: 2, name: 'Firm Two' },
          { id: 3, name: 'Firm Three' },
          { id: 4, name: 'Firm Four' },
          { id: 5, name: 'Firm Five' },
          { id: 6, name: 'Firm Six' },
        ]
        set({ firms: dummyFirms, isReady: true, isLoading: false })
      },
      cleanFirms: () => set(defaultState),
    }),
    {
      name: 'firms-storage',
      storage: createJSONStorage(() => sessionStorage),
      // Optional: Specify which parts of state to persist
      partialize: (state) => ({
        firms: state.firms,
      }),
    }
  )
)
