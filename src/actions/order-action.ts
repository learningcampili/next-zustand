"use server";

import { getCookie } from "@/lib/helpers";

export interface CreateOrderType {
  items: Item[];
  orderAddress: Address;
  shippingAddress: Address;
}

export interface Item {
  productId: string;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  floor?: string;
  apartment?: string;
  cityName: string;
  postalCode: string;
  countryId: string;
  countryName?: string;
  areaCode: string;
  phone: string;
}

export interface OrderItems {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  type: string;
  imageUrl?: string;
  isDeleted: boolean;
  isOnSale: boolean;
  discount: number;
}

export const getOrderById = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/orders/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (data.error) {
    return {
      error: data.message,
    };
  }

  return {
    ok: true,
    order: data,
  };
};

export const createOrder = async (values: CreateOrderType) => {
  const token = await getCookie("accessToken");

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/orders`, {
    method: "POST", // Use PUT method for updates
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${token}`,
    },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await response.json();

  if (data.error) {
    return { error: data.message };
  }
  return { ok: true, data };
};

export const createPreference = async (orderId: string) => {
  console.log(
    `${process.env.NEXT_PUBLIC_BACK_URL}/mercadopago/create-preference/${orderId}`
  );
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/mercadopago/create-preference/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    console.log("createPreference del order-actions", data);

    const { url } = data;
    return url;
  } catch (error) {
    console.log(error);
  }
};
