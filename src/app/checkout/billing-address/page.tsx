// import { getUserAddress } from "@/actions/address-actions";
// import { getUserServer } from "@/actions/auth-actions";
// import { redirect } from "next/navigation";

const BillingAddress = async () => {
  //   const user = await getUserServer();
  //   if (!user) {
  //     redirect(`/login`);
  //   }

  //const userAddress = (await getUserAddress(user?.id!)) ?? undefined;

  return (
    <div className="flex flex-col w-full min-h-custom justify-start p-4 ">
      <div className="flex flex-col justify-center items-center   ">
        <h1>Billing Address</h1>
      </div>
    </div>
  );
};

export default BillingAddress;
