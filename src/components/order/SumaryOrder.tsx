"use client";

import React, { useState } from "react";
import Button from "../button/Button";
import { formatNumber } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import MiniCart from "../cart/MiniCart";
import { useAddressStore } from "@/store/address/address-store";
import { useShippingAddressStore } from "@/store/address/shipping-address-store";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/order-action";

const SumaryOrder = () => {
  const cart = useCartStore((state) => state.cart);
  const { getSummaryInformation } = useCartStore();
  const { subTotal, total, itemsInCart } = getSummaryInformation();
  const orderAddress = useAddressStore((state) => state.address);
  const shippingAddress = useShippingAddressStore((state) => state.address);

  const clearShippingAddress = useShippingAddressStore(
    (state) => state.clearAddress
  );

  const clearOrderAddress = useAddressStore((state) => state.clearAddress);
  const { clearCart } = useCartStore();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));

    delete orderAddress.countryName;
    delete shippingAddress.countryName;

    const resp = await createOrder({
      items: productsToOrder,
      orderAddress: orderAddress,
      shippingAddress: shippingAddress,
    });

    console.log("en sumary", resp);

    if (!resp.ok) {
      setErrorMessage(resp.error);
      setIsPlacingOrder(false);
      return;
    }

    clearCart();
    clearShippingAddress();
    clearOrderAddress();
    router.replace("/orders/" + resp.data.order?.id);
  };

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
          onClick={handlePlaceOrder}
          title={isPlacingOrder ? "Confirmando Orden ..." : "Confirmar Orden "}
          variant="primary"
          size="md"
          disabled={isPlacingOrder}
        />
      </div>

      <div className="flex justify-center items-center text-xl font-semibold  text-white p-2 rounded-lg my-2">
        <p className="text-red-500 text-sm">{errorMessage}</p>
      </div>
    </div>
  );
};

export default SumaryOrder;
