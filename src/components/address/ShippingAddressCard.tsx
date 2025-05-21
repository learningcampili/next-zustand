import { useShippingAddressStore } from "@/store/address/shipping-address-store";
import React from "react";

const ShippingAddressCard = () => {
  const shippingAddress = useShippingAddressStore((state) => state.address);
  return (
    <div className="bg-gray-800 text-white rounded-lg ">
      <h1 className="text-center text-xl font-bold p-2">
        Dirección de entrega
      </h1>
      <hr className="border-gray-700" />

      <div className="flex flex-col items-left justify-center w-full h-full  gap-2 p-5 ">
        <p>
          {shippingAddress.firstName} {shippingAddress.lastName}
        </p>
        <p>
          {shippingAddress.streetName},{shippingAddress.streetNumber}{" "}
          {shippingAddress.floor} {shippingAddress.apartment}
        </p>
        <p>CP: {shippingAddress.postalCode}</p>
        <p>{shippingAddress.cityName}</p>
        <p>{shippingAddress.countryName}</p>
      </div>
    </div>
  );
};

export default ShippingAddressCard;
