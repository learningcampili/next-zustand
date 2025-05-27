import { redirect } from "next/navigation";

export const logout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  if (data.error) {
    return {
      error: data.message,
    };
  }

  localStorage.removeItem("user");
  localStorage.removeItem("id");

  redirect("/");

  return {
    success: true,
    data,
  };
};
