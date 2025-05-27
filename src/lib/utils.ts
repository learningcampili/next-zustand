export const sleep = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

export const formatNumber = (number: number) => {
  const str = number.toString();
  let [integerPart, decimalPart] = str.split(".");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (decimalPart) {
    decimalPart = "," + decimalPart;
  } else {
    decimalPart = ",00";
  }

  return integerPart + (decimalPart || "");
};

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const elipsisString = (phrase: string, limit: number) => {
  if (phrase.length > limit) {
    return phrase.slice(0, limit) + "...";
  } else {
    return phrase;
  }
};

export const capitalizeFirstLetter = (text: string) => {
  if (!text || typeof text !== "string") {
    return ""; // Return an empty string for invalid input
  }

  // Trim the string to remove leading/trailing whitespace
  const trimmedString = text.trim();

  // Capitalize the first letter and concatenate with the rest of the string
  return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
};

export const capitalizeFirstLetterOfEachWord = (text: string) => {
  if (!text || typeof text !== "string") {
    return ""; // Return an empty string for invalid input
  }

  return text
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
