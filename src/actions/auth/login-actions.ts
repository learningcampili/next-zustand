import { getCookie } from "@/lib/helpers";
import { LoginType } from "@/lib/zod";

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const loginAction = async (value: LoginType) => {
  const response = await fetch(`${BACK_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
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

export const logoutAction = async () => {
  const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

  const token = await getCookie("accessToken");

  await fetch(`${BACK_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${token}`,
    },
    credentials: "include",
  });
};
