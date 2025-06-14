import { listCountries } from "@/actions/country-actions";
import { BillingAddressForm } from "@/components/address/BillingForm";

const BillingAddressPage = async () => {
  const countries = await listCountries();

  if (!countries) {
    return <div>No se pudo cargar los países</div>;
  }

  return (
    <div>
      <BillingAddressForm countries={countries} />
    </div>
  );
};

export default BillingAddressPage;
