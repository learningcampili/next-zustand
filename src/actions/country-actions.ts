export const listCountries = async () => {
  const response = await fetch("http://localhost:3001/api/countries");
  const countries = await response.json();

  if (!countries) {
    throw new Error("No countries found");
  }
  return countries;
};

export const getCountryById = async (id: string) => {
  const response = await fetch(`http://localhost:3001/api/countries/${id}`);
  const country = await response.json();

  if (!country) {
    throw new Error("Country not found");
  }

  return country;
};
