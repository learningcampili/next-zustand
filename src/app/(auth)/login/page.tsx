"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("url") || "/cart";

  return <LoginForm returnUrl={returnUrl} />;
};

export default LoginPage;
