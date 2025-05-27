import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    floor?: string;
    apartment?: string;
    postalCode: string;
    cityName: string;
    countryId: string;
    countryName?: string;
    areaCode: string;
    phone: string;
  };

  // Methods
  setAddress: (address: State["address"]) => void;
  clearAddress: () => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        streetName: "",
        streetNumber: "",
        floor: "",
        apartment: "",
        postalCode: "",
        cityName: "",
        countryId: "",
        countryName: "",
        areaCode: "",
        phone: "",
      },

      setAddress: (address) => {
        set({ address });
      },

      clearAddress: () => {
        set({ address: {} as State["address"] });
      },
    }),
    {
      name: "billing-address",
    }
  )
);
