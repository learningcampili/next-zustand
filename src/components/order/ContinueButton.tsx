"use client";

import { useState } from "react";
//import { Wallet } from "@mercadopago/sdk-react";

import Button from "../button/Button";
import { createPreference } from "@/actions/order-action";
import { redirect } from "next/navigation";

// interface Props {
//   orderId: string;
// }

interface Props {
  orderId: string;
}

const ContinueButton = ({ orderId }: Props) => {
  //   useEffect(() => {
  //     initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!, {
  //       locale: "es-AR",
  //     });
  //   }, []);

  const [isLoading, setisLoading] = useState(false);
  //   const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const handleBuy = async () => {
    console.log("****** handleBuy ******");
    setisLoading(true);
    const url = await createPreference(orderId);

    console.log("continueButton", url);
    setisLoading(false);

    redirect(url);
  };

  return (
    <>
      <Button
        type="button"
        variant="primary"
        onClick={handleBuy}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Pagando" : "Pagar"}
      </Button>

      {/* {buttonUrl && (
        <Button
          title="Pagar con Mercado Pago"
          variant="secondary"
          size="full"
          href={buttonUrl}
        />
      )} */}

      {/* {preferenceId && <Wallet initialization={{ preferenceId }} />} */}
    </>
  );
};

export default ContinueButton;
