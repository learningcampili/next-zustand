"use client";

import BillingAddressCard from "@/components/address/BillingAddressCard";
import ShippingAddressCard from "@/components/address/ShippingAddressCard";
import Button from "@/components/button/Button";
import SumaryOrder from "@/components/order/SumaryOrder";

import { useCartStore } from "@/store/cart-store";
import { FaCartShopping } from "react-icons/fa6";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="container mx-auto flex flex-col w-full min-h-custom justify-start p-4  ">
      <div className=" mx-auto px-4 py-8 w-full ">
        <h1 className="text-3xl  text-center  pb-5">Confirmación de órden</h1>
        <hr style={{ marginBottom: "3rem" }} />

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-10">
            <FaCartShopping size={100} className="text-white" />
            <p className="text-2xl text-center text-slate-400">
              El carrito esta vacio.
            </p>
            <Button href="/" title="Volver" variant="primary" size="md" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-20 mt-5">
              <div className="md:col-span-3 space-y-8 ">
                <BillingAddressCard />
                <ShippingAddressCard />
              </div>
              <div className="md:col-span-2 ">
                <SumaryOrder />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
