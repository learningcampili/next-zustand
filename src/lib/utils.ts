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

export const elipsisString = (phrase: string, limit: number) => {
  if (phrase.length > limit) {
    return phrase.slice(0, limit) + "...";
  } else {
    return phrase;
  }
};
