import { useAddressStore } from "@/store/address/address-store";
import React from "react";

const BillingAddressCard = () => {
  const billingAddress = useAddressStore((state) => state.address);
  return (
    <div className="bg-gray-800 text-white rounded-lg ">
      <h1 className="text-center text-xl font-bold p-2">Dirección Comprador</h1>
      <hr className="border-gray-700" />

      <div className="flex flex-col items-left justify-center w-full h-full  gap-2 p-5 ">
        <p>
          {billingAddress.firstName} {billingAddress.lastName}
        </p>
        <p>
          {billingAddress.streetName},{billingAddress.streetNumber}{" "}
          {billingAddress.floor} {billingAddress.apartment}
        </p>
        <p>CP: {billingAddress.postalCode}</p>
        <p>{billingAddress.cityName}</p>
        <p>{billingAddress.countryName}</p>
      </div>
    </div>
  );
};

export default BillingAddressCard;
