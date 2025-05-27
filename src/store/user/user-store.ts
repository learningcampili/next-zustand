import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getUser } from "@/actions/users-actions";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      refreshUser: async () => {
        try {
          const res = await getUser();
          if (res.success) {
            set({ user: res.data });
          } else {
            set({ user: null });
          }
        } catch {
          set({ user: null });
        }
      },
    }),
    {
      name: "user-session", // clave de almacenamiento
      storage: createJSONStorage(() => sessionStorage), // almacena en sessionStorage no en localStorage
      partialize: (state) => ({ user: state.user }), // solo persiste `user`
    }
  )
);
