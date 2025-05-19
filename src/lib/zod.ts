import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  streetName: z.string().min(1, "La dirección es requerida"),
  streetNumber: z.string().min(1, "El número de la dirección es requerido"),
  floor: z.string().optional().nullable(),
  apartment: z.string().optional().nullable(),
  postalCode: z.string().min(1, "El código postal es requerido"),
  cityName: z.string().min(1, "La ciudad es requerida"),
  countryId: z.string().min(1, "El país es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  areaCode: z.string().optional().nullable(),
  rememberAddress: z.boolean().optional(),
});
