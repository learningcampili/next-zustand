import { listCountries } from "@/actions/country-actions";
import { ShippingAddressForm } from "@/components/address/ShippingFrom";

const ShippimgAddressPage = async () => {
  const countries = await listCountries();

  if (!countries) {
    return <div>No se pudo cargar los países</div>;
  }

  return (
    <div>
      <ShippingAddressForm countries={countries} />
    </div>
  );
};

export default ShippimgAddressPage;
