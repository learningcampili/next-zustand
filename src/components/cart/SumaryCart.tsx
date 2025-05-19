import React from "react";
import Button from "../button/Button";
import { formatNumber } from "@/lib/utils";
import { useCartStore } from "@/store/cart--store";

const SumaryCart = () => {
  const { getSummaryInformation } = useCartStore();
  const { subTotal, total, itemsInCart } = getSummaryInformation();

  return (
    <div className="bg-gray-800 text-white  rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4">Resumen</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Total Items:</span>
          <span>{itemsInCart}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${formatNumber(subTotal)}</span>
        </div>
        {/* <div className="flex justify-between">
          <span>Iva 21%:</span>
          <span>${formatNumber(tax)}</span>
        </div> */}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-xl font-semibold">
          <span>Total:</span>
          <span>${formatNumber(total)}</span>
        </div>
      </div>
      <Button
        href="/checkout/billing-address"
        title="Checkout"
        variant="primary"
        size="full"
      />
    </div>
  );
};

export default SumaryCart;
