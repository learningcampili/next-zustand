"use client";

import { Product } from "@/lib/interfaces";

import Link from "next/link";
import Swal from "sweetalert2";
import { useCartStore } from "@/store/cart-store";
import Button from "../button/Button";

interface ProductDetailsPageProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsPageProps) => {
  const addProductTocart = useCartStore((state) => state.addProductTocart);

  const handleClick = () => {
    addProductTocart({ ...product, quantity: 1 });
    Swal.fire({
      title: `Se ha agregado al carrito`,
      html: `<b>${product.name}</b>`,
      icon: "success",
      timer: 2000,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
      <div className="flex items-baseline mb-4">
        {product.isOnSale && product.discount ? (
          <>
            <span className="text-xl font-medium mr-5 text-bold">
              ${product.price * (1 - product.discount / 100)}
            </span>
            <span className="text-gray-500 line-through text-xl">
              ${product.price}
            </span>
          </>
        ) : (
          <span className="text-xl font-medium">${product.price}</span>
        )}
      </div>

      <Button size="sm" title="Agregar al carrito" onClick={handleClick} />

      <p className="text-sm mt-2">
        <Link href="/cart" className="text-gray-600 hover:underline">
          Ver carrito
        </Link>
      </p>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-sm font-medium mb-2">{product.description}</h3>
      </div>
    </div>
  );
};

export default ProductDetails;
