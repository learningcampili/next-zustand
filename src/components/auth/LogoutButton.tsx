// components/LogoutButton.tsx
"use client";

import { logoutAction } from "@/actions/auth/login-actions";
import { useUserStore } from "@/store/user/user-store";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    if (!user) return;
    await logoutAction();
    setUser(null); // Limpia el usuario del store y sessionStorage
    router.refresh(); // Opcional, actualiza navbar o layout
    router.push("/login"); // Redirige al login
  };

  return (
    <button
      onClick={handleLogout}
      //   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      className="text-red-700 hover:text-white pointer"
    >
      Logout
    </button>
  );
};
