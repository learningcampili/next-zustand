"use client";

import React from "react";
import Button from "../button/Button";

import Link from "next/link";
import Image from "next/image";

import { useCartStore } from "@/store/cart-store";
import { QuantitySelector } from "./QuantitySelector";
import { elipsisString, formatNumber } from "@/lib/utils";
import { BsQrCode } from "react-icons/bs";

const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  return (
    <>
      {productsInCart.map((item) => (
        <div key={item.id} className="flex  space-x-4 border-b pb-4">
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
            <p className="text-gray-400">${formatNumber(item.price)}</p>
          </div>

          <QuantitySelector
            quantity={item.quantity}
            onQuantityChanged={(quantity) =>
              updateProductQuantity(item, quantity)
            }
          />
          <div className="flex items-center h-10 ">
            <Button
              variant="transparent"
              size="md"
              title="Eliminar"
              onClick={() => removeProduct(item)}
              className="text-2xl"
            >
              x
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
