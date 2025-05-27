"use server";
// import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import moment from "moment";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookieStore = cookies();
  const data = (await cookieStore).get(name);

  return data?.value;
};

// helpers.ts

export const convertToDDMMYYYY = async (
  isoDateString: string
): Promise<string> => {
  const date = await moment(isoDateString);

  // Verificamos si la fecha es válida
  if (!date.isValid()) {
    throw new Error("Fecha no válida");
  }

  return date.format("YYYY-MM-DD"); // Devuelve la fecha en formato dd/mm/aaaa
};

export const convertToISO = async (dateString: string): Promise<string> => {
  // Suponemos que dateString está en formato dd/mm/aaaa
  const date = await moment(dateString, "YYYY-MM-DD");

  // Verificamos si la fecha es válida
  if (!date.isValid()) {
    throw new Error("Fecha no válida");
  }

  return date.toISOString(); // Devuelve la fecha en formato ISO 8601
};

export const getRole = async () => {
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

  const { id, role } = data;

  return {
    id,
    role,
  };
};
