import { CartProduct } from "../store/cart-store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:3001/api";

export const getProductBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);
  if (!response.ok) {
    throw new Error("Product not found");
  }
  const product = await response.json();
  return product;
};

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Products not found");
  }
  const products = await response.json();
  return products;
};

export const getFeaturedProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products?isFeatured=true`);
  if (!response.ok) {
    throw new Error("Products not found");
  }
  const products: CartProduct[] = await response.json();
  return products;
};
