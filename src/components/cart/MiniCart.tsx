"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";

import { useCartStore } from "@/store/cart-store";
import { elipsisString, formatNumber } from "@/lib/utils";
import { BsQrCode } from "react-icons/bs";

const MiniCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  return (
    <div className="mb-5">
      {productsInCart.map((item) => (
        <div key={item.id} className="flex  space-x-4 border-b py-4">
          <Link href={`/products/${item.slug}?origin=/cart`}>
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md"
              />
            ) : (
              <BsQrCode size={50} className="text-white" />
            )}
          </Link>

          <div className="flex flex-1 flex-col justify-between ">
            <h2 className="text-sm font-semibold">
              {elipsisString(item.name, 50)}
            </h2>
            <p className="text-gray-400">
              ${item.quantity} x ${formatNumber(item.price)}
            </p>
          </div>
          <div className="flex items-center h-10 ">
            <p className="text-sm">
              ${formatNumber(item.price * item.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniCart;
