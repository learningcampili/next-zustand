"use client";

import React, { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";

import Button from "../button/Button";

import { loginSchema, LoginType } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { loginAction } from "@/actions/auth/login-actions";

export const LoginForm = ({ returnUrl }: { returnUrl: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refreshUser } = useUser();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  async function onSubmit(values: LoginType) {
    setError(null);

    startTransition(async () => {
      const data = await loginAction(values);

      console.log(data);

      if (data?.error) {
        setError(data.error || "An unexpected error occurred.");
      }
      if (data?.success) {
        localStorage.setItem(
          "user",
          data.data.firstName + " " + data.data.lastName
        );
        localStorage.setItem("id", data.data.id);
        await refreshUser(); // si usás contexto (opcional)
        router.refresh(); // 🔁 refresca layout/server components/navbar
        router.push(returnUrl);
      }
      form.reset();
    });
  }

  return (
    <div className="w-full border border-slate-700 shadow-lg rounded p-5 sm:max-w-[400px] mx-auto bg-slate-800 text-white">
      <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="user@gmail.com"
            {...form.register("email")}
            className="mt-1 text-slate-600 selection:mb-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Contarseña</label>
          <input
            type="password"
            placeholder="********"
            {...form.register("password")}
            className="mt-1 text-slate-600 mb-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div>
          {error && (
            <p className="text-center p-2 rounded border border-red-600 text-red-600">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          title="Login"
          variant="primary"
          size="full"
          disabled={isPending}
        />
      </form>

      <div className=" w-full flex  flex-col justify-center items-center  gap-5 text-sm mt-3 text-slate-500  sm:flex-row ">
        <Link className="hover:text-slate-200" href={"/register"}>
          No estás registrado?
        </Link>
        <Link className="hover:text-slate-200" href={"/forgoten-password"}>
          Olvidaste la contraseña?
        </Link>
      </div>
    </div>
  );
};
