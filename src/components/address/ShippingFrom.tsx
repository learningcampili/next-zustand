"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingAddressFormValues, shippingAddressSchema } from "@/lib/zod";
import { Country } from "@/lib/interfaces";
import Button from "../button/Button";

import { useShippingAddressStore } from "@/store/address/shipping-address-store";
import { useRouter } from "next/navigation";

interface Props {
  countries: Country[];
}

// Tipo derivado del esquema

export const ShippingAddressForm = ({ countries }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const setAddress = useShippingAddressStore((state) => state.setAddress);

  const router = useRouter();
  // Configuración de react-hook-form con resolver de Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ShippingAddressFormValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      streetName: "",
      streetNumber: "",
      floor: "",
      apartment: "",
      postalCode: "",
      cityName: "",
      countryId: "",
      countryName: "",
      phone: "",
      areaCode: "",
    },
  });

  const selectedCountryId = watch("countryId");

  useEffect(() => {
    const selectedCountry = countries.find(
      (country) => country.id === selectedCountryId
    );

    if (selectedCountry) {
      setValue("areaCode", selectedCountry.phoneCode);
      setValue("countryName", selectedCountry.name); // actualiza el campo con el phoneCode
    } else {
      setValue("areaCode", ""); // limpia si no hay país seleccionado
    }
  }, [selectedCountryId, countries, setValue]);

  // Función para manejar el envío del formulario
  const onSubmit = async (data: ShippingAddressFormValues) => {
    setAddress(data);
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitMessage("");

    try {
      // Aquí iría la lógica para enviar los datos a tu API
      console.log("Datos del formulario:", data);

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      setSubmitMessage("Tu dirección ha sido guardada correctamente.");
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitSuccess(false);
      setSubmitMessage("Ocurrió un error al guardar la dirección.");
    } finally {
      setIsSubmitting(false);
      router.push("/checkout/confirm-order");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-800 my-2">
      <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-xl  text-center font-semibold text-gray-100">
          Información para el envío
        </h2>
        {/* <p className="text-sm text-gray-400">Ingresa los datos del comprador</p> */}
      </div>

      {submitSuccess !== null && (
        <div
          className={`px-6 py-3 ${
            submitSuccess
              ? "bg-green-900 text-green-300"
              : "bg-red-900 text-red-300"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                placeholder="Ingresa tu nombre"
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-500 `}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Apellido <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                placeholder="Ingresa tu apellido"
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-500 `}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="streetName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Calle <span className="text-red-500">*</span>
            </label>
            <input
              id="streetName"
              type="text"
              {...register("streetName")}
              placeholder="Nombre de la calle"
              className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-500`}
            />
            {errors.streetName && (
              <p className="mt-1 text-xs text-red-400">
                {errors.streetName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="streetNumber"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Número <span className="text-red-500">*</span>
              </label>
              <input
                id="streetNumber"
                type="text"
                {...register("streetNumber")}
                placeholder="Número"
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-500 `}
              />
              {errors.streetNumber && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.streetNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="floor"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Piso
              </label>
              <input
                id="floor"
                type="text"
                {...register("floor")}
                placeholder="Piso (opcional)"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-600 text-gray-100 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="apartment"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Departamento
              </label>
              <input
                id="apartment"
                type="text"
                {...register("apartment")}
                placeholder="Depto. (opcional)"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-600 text-gray-100 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Código Postal <span className="text-red-500">*</span>
              </label>
              <input
                id="postalCode"
                type="text"
                {...register("postalCode")}
                placeholder="Código postal"
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-500`}
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="cityName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Ciudad <span className="text-red-500">*</span>
              </label>
              <input
                id="cityName"
                type="text"
                {...register("cityName")}
                placeholder="Ciudad"
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-500`}
              />
              {errors.cityName && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.cityName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="countryId"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              País <span className="text-red-500">*</span>
            </label>
            <select
              id="countryId"
              {...register("countryId")}
              className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100`}
            >
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countryId && (
              <p className="mt-1 text-xs text-red-400">
                {errors.countryId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="areaCode"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Código de Área
              </label>
              <input
                id="areaCode"
                type="text"
                {...register("areaCode")}
                placeholder="Código de área (opcional)"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-600 text-gray-100 placeholder-gray-500"
                disabled={true}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                placeholder="Número de teléfono"
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-700 flex justify-end space-x-3">
          <Button
            title="Cancelar"
            type="button"
            disabled={isSubmitting}
            variant="secondary"
            href="/cart"
          />

          <Button
            title={isSubmitting ? "Guardando..." : "Guardar dirección"}
            type="submit"
            disabled={isSubmitting}
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
};
