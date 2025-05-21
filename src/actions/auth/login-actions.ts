import { LoginType } from "@/lib/zod";

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const loginAction = async (value: LoginType) => {
  const response = await fetch(`${BACK_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
    // credentials: "include",
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
