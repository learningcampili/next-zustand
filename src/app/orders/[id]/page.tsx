// import { getOrderById } from "@/actions/order-actions";
// import React from "react";
// import { clsx } from "clsx";
// import { redirect } from "next/navigation";
// import { currencyFormat } from "@/lib/utils";
// import { CreditCard } from "lucide-react";
// import Image from "next/image";
// import { getCountryById } from "@/actions/country-actions";
// import Button from "@/components/button/Button";

import { getOrderById, OrderItems } from "@/actions/order-action";
import Button from "@/components/button/Button";
import ContinueButton from "@/components/order/ContinueButton";
import { currencyFormat } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import { FiCreditCard } from "react-icons/fi";

// import { getorderAddress } from "@/actions/address-actions";
// import ContinuarButton from "@/components/mercadopago/ContinuarButton";
// import { getUserById } from "@/lib/user";

interface Props {
  params: {
    id: string;
  };
}

const OrderDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const { order } = await getOrderById(id);

  if (!order) {
    return <div>No se encontro la orden</div>;
  }

  //   const user = await getUserById(order.user.id);

  // //   const orderAddress = await getorderAddress(order.user.id);
  //   console.log("************ orderAddress **************");
  //   console.log(orderAddress);

  //   const itemsMp = order.OrderItem.map((item) => {
  //     return {
  //       id: item.id,
  //       title: item.product.name,
  //       unit_price: item.price,
  //       quantity: item.quantity,
  //       currency_id: "ARS",
  //     };
  //   });

  //   const dataMp = {
  //     orderId: order.id,
  //     items: itemsMp,
  //     payer: {
  //       name: orderAddress?.firstName!,
  //       surname: orderAddress?.lastName!,
  //       email: user?.email,
  //       phone: {
  //         area_code: orderAddress?.areaCode,
  //         number: orderAddress?.phone,
  //       },
  //       identification: {
  //         type: user?.documentType,
  //         number: user?.documentNumber,
  //       },
  //       address: {
  //         zip_code: orderAddress?.postalCode!,
  //         street_name: orderAddress?.streetName!,
  //         street_number: orderAddress?.streetNumber!,
  //       },
  //     },
  //     shipments: {
  //       cost: 100,
  //       receiver_address: {
  //         street_name: order?.OrderAddress?.streetName!,
  //         street_number: order?.OrderAddress?.streetNumber!,
  //         zip_code: order?.OrderAddress?.postalCode!,
  //         floor: order?.OrderAddress?.floor!,
  //         apartment: order?.OrderAddress?.apartment!,
  //         city_name: order?.OrderAddress?.cityName!,
  //         country_name: order?.OrderAddress?.countryName!,
  //       },
  //     },
  //   };

  //   console.log("**************** dataMp ******************");
  //   console.log(dataMp);
  //   console.log("*****************************************");

  //   if (!ok) {
  //     redirect("/");
  //   }

  //   const address = order!.OrderAddress;
  //   const country = await getCountryById(address!.countryId);

  // return <pre>{JSON.stringify(order, null, 2)}</pre>;

  return (
    <div className="flex justify-center items-center sm:px-0 container mx-auto p-2">
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Carrito */}
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-center text-3xl mb-2">
              {" "}
              {`Orden #${id.split("-").at(-1)}`}{" "}
            </h1>
            <Button
              variant={order?.isPaid ? "success" : "danger"}
              size="full"
              className="flex justify-start items-center gap-5 cursor-default mb-5"
            >
              <FiCreditCard size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="text-xs">
                {order?.isPaid ? "Pagada" : "No pagada"}
              </span>
            </Button>

            {/* Items */}
            {order &&
              order!.orderItems.map((item: OrderItems) => (
                <div key={item.product.slug} className="flex mb-5">
                  {item.product.type === "SHIPPING" && (
                    <div className="mr-5 rounded border-2 border-gray-700 ">
                      <CiDeliveryTruck size={100} />
                    </div>
                  )}
                  {item.product.imageUrl && (
                    <Image
                      src={`${item.product.imageUrl}`}
                      width={100}
                      height={100}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                      alt={item.product.name}
                      className="mr-5 rounded"
                    />
                  )}

                  <div>
                    <p>{item.product.name}</p>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                    <p className="font-bold">
                      Subtotal: {currencyFormat(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-gray-800 w-full rounded-xl shadow-xl p-5">
            <div>
              <h2 className="text-lg sm:text-xl mb-2 underline">
                Dirección del comprador
              </h2>
              <div className="mb-5 ">
                <p className="">
                  {order.orderAddress.firstName} {order.orderAddress.lastName}
                </p>
                <p>
                  {order.orderAddress!.streetName}{" "}
                  {order.orderAddress!.streetNumber} {order.orderAddress!.floor}{" "}
                  {order.orderAddress!.apartment}
                </p>

                <p>CP: {order.orderAddress!.postalCode}</p>
                <p>
                  {order.orderAddress!.cityName},{" "}
                  {order.orderAddress!.country.name}
                </p>
                <p>
                  Tel:{" "}
                  <span className="font-bold ml-2">
                    {order.orderAddress!.areaCode}
                    {order.orderAddress!.phone}
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />
              <div>
                <h2 className="text-lg sm:text-xl mb-2 underline">
                  Dirección de entrega
                </h2>
                <div className="mb-5 ">
                  <p>
                    {order.shippingAddress?.firstName}{" "}
                    {order.shippingAddress!.lastName}
                  </p>
                  <p>
                    {order.shippingAddress!.streetName}{" "}
                    {order.shippingAddress!.streetNumber}{" "}
                    {order.shippingAddress!.floor}{" "}
                    {order.shippingAddress!.apartment}
                  </p>

                  <p>CP: {order.shippingAddress!.postalCode}</p>
                  <p>
                    {order.shippingAddress!.cityName},{" "}
                    {order.shippingAddress!.country.name}
                  </p>
                  <p>
                    Tel:{" "}
                    <span className="font-bold ml-2">
                      {order.shippingAddress!.areaCode}
                      {order.shippingAddress!.phone}
                    </span>
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />
              </div>
            </div>
            <h2 className="text-lg sm:text-xl mb-2 underline">
              Resumen de orden
            </h2>

            <div className="grid grid-cols-2">
              <span>Cantidad de productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Gastos de envío</span>
              <span className="text-right">
                {currencyFormat(order!.shippingCost)}
              </span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order!.isPaid,
                    "bg-green-700": order!.isPaid,
                  }
                )}
              >
                <FiCreditCard size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">
                  {order?.isPaid ? "Pagada" : "No pagada"}
                </span>
              </div>
            </div>

            {/* {!order.isPaid && <ContinuarButton dataMp={dataMp} />} */}

            {!order.isPaid && <ContinueButton orderId={order.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
