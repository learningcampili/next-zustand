"use client";

//import { logout } from "@/actions/auth/logout-actions";
// import { useUser } from "@/context/UserContext";
import { useCartStore } from "@/store/cart-store";
import { useCounterStore } from "@/store/counter-store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
// import Button from "./button/Button";
// import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user/user-store";
import { LogoutButton } from "./auth/LogoutButton";

const Navbar = () => {
  // trae el total de items en el carrito de la store
  const itemsInCart = useCartStore((state) => state.getTotalItems());

  const refreshUser = useUserStore((state) => state.refreshUser);

  const user = useUserStore((state) => state.user);

  // const router = useRouter();

  // trae el contador de la store
  const count = useCounterStore((state) => state.count);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // const handleLogout = async () => {
  //   await logout();
  //   await refreshUser();
  //   router.refresh();
  // };

  return (
    <nav className=" h-16 px-10 py-2 bg-gray-900">
      <Link href="/" className="flex items-end">
        Home
      </Link>
      <ul className="flex items-center justify-end w-full gap-10">
        <li>{count}</li>
        {!user && (
          <Link className="mr-10" href="/login">
            Login
          </Link>
        )}
        {/* {user && (
          <Button
            title="Logout"
            type="button"
            size="sm"
            onClick={handleLogout}
          />
        )} */}
        {user && <LogoutButton />}
        <li>
          <Link href="/cart" className="relative">
            <FaCartShopping />
            {isMounted && itemsInCart > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {itemsInCart}
              </span>
            )}
          </Link>
        </li>
        <li>{user && <span>Hola, {user.firstName}</span>}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
