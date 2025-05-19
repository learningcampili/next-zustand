import { CartProduct } from "@/store/cart--store";

export const getProductBySlug = async (slug: string) => {
  const response = await fetch(`http://localhost:3001/api/products/${slug}`);
  const product = await response.json();

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const getAllProducts = async () => {
  const response = await fetch("http://localhost:3001/api/products");
  const products: CartProduct[] = await response.json();

  if (!products) {
    throw new Error("Products not found");
  }

  return products;
};
