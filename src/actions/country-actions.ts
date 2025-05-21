import { Country } from "@/lib/interfaces";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:3001/api";

export const listCountries = async (): Promise<Country[]> => {
  const response = await fetch(`${API_BASE_URL}/countries?active=true`);
  if (!response.ok) {
    throw new Error("Countries not found");
  }
  const countries = await response.json();
  return countries;
};

export const getCountryById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/countries/${id}`);
  if (!response.ok) {
    throw new Error("Countries not found");
  }
  const country = await response.json();

  return country;
};
