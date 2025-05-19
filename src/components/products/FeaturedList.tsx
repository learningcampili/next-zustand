import React from "react";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/actions/product-actions";
import type { CartProduct } from "@/store/cart-store";

const FeaturedList = async () => {
  let products: CartProduct[] = [];
  let error: string | null = null;

  try {
    //products = await getFeaturedProducts();
    // products = await getAllProducts();
    products = await getFeaturedProducts();
  } catch (err) {
    error = (err as Error).message || "Failed to load products";
  }

  if (error) {
    return (
      <div className=" text-red-600 text-lg text-center mt-10">
        Error en busqueda de productos
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="">
        <h3 className="text-2xl ">No hay productos disponibles</h3>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedList;
