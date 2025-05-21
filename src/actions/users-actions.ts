"use server";

import { getCookie } from "@/lib/helpers";
import { UpdateUserType } from "@/lib/zod";

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const getUsers = async () => {
  const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

  const response = await fetch(`${BACK_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.error) {
    return {
      error: data.message,
    };
  }

  return {
    success: true,
    data,
  };
};

export const getUser = async () => {
  const token = await getCookie("accessToken");
  const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

  const response = await fetch(`${BACK_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (data.error) {
    return {
      error: data.message,
    };
  }

  return {
    success: true,
    data,
  };
};

export const updateUser = async (values: UpdateUserType) => {
  const token = await getCookie("accessToken");

  delete values.confirmPassword;

  const response = await fetch(`${BACK_URL}/users/${values.id}`, {
    method: "PATCH", // Use PUT method for updates
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

  return data;
};
