"use client";

import { useCartStore } from "@/store/cart-store";
import { useCounterStore } from "@/store/counter-store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  // trae el total de items en el carrito de la store
  const itemsInCart = useCartStore((state) => state.getTotalItems());

  // trae el contador de la store
  const count = useCounterStore((state) => state.count);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className=" h-16 px-10 py-2 bg-gray-900">
      <Link href="/" className="flex items-end">
        Home
      </Link>
      <ul className="flex items-center justify-end w-full gap-10">
        <li>{count}</li>
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
      </ul>
    </nav>
  );
};

export default Navbar;
