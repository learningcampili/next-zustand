import React from "react";
import Button from "../button/Button";
import { formatNumber } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import MiniCart from "../cart/MiniCart";

const SumaryOrder = () => {
  const { getSummaryInformation } = useCartStore();
  const { subTotal, total, itemsInCart } = getSummaryInformation();

  return (
    <div className="bg-gray-800 text-white  rounded-lg p-5">
      <MiniCart />
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
      <div className="flex flex-wrap justify-evenly items center gap-4 mt-10">
        <Button href="/" title="Cancelar" variant="danger" size="md" />
        <Button
          href="/checkout/payment"
          title="Confirmar"
          variant="primary"
          size="md"
        />
      </div>
    </div>
  );
};

export default SumaryOrder;
