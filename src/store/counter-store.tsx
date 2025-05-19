import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Counter {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<Counter>()(
  persist(
    (set) => ({
      count: 0,

      // Methods
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () =>
        set((state) => {
          if (state.count === 0) return { count: 0 };
          return { count: state.count - 1 };
        }),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "counter-store",
    }
  )
);
