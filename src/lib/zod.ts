import { TypeOf, z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  streetName: z.string().min(1, "La dirección es requerida"),
  streetNumber: z.string().min(1, "El número de la dirección es requerido"),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  postalCode: z.string().min(1, "El código postal es requerido"),
  cityName: z.string().min(1, "La ciudad es requerida"),
  areaCode: z.string(),
  phone: z.string().min(1, "El teléfono es requerido"),
  countryId: z.string().min(1, "El país es requerido"),
  countryName: z.string().min(1, "El país es requerido"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  streetName: z.string().min(1, "La dirección es requerida"),
  streetNumber: z.string().min(1, "El número de la dirección es requerido"),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  postalCode: z.string().min(1, "El código postal es requerido"),
  cityName: z.string().min(1, "La ciudad es requerida"),
  areaCode: z.string(),
  phone: z.string().min(1, "El teléfono es requerido"),
  countryId: z.string().min(1, "El país es requerido"),
  countryName: z.string().min(1, "El país es requerido"),
});

export type ShippingAddressFormValues = z.infer<typeof shippingAddressSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("Ingrese un email válido"),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida"),
});

export type LoginType = TypeOf<typeof loginSchema>;

export const userSchema = z.object({
  id: z
    .string()
    .uuid({ message: "El ID es obligatorio para actualizar" })
    .optional(),
  email: z
    .string({ required_error: "El email es requerido" })
    .email("Ingrese un email válido"),
  // password: string({ required_error: "La contraseña es requerida" })
  //   .min(6, "La contraseña debe ser de al menos 6 caracteres")
  //   .max(50, "La contraseña debe ser de menos de 50 caracteres"),
  firstName: z
    .string({ required_error: "El nombre es requerido" })
    .min(2, "El nombre debe ser de al menos 2 caracteres")
    .max(50, "el nombre debe ser de menos de 50 caracteres"),
  lastName: z
    .string({ required_error: "El apellido es requerido" })
    .min(2, "El apellido debe ser de al menos 2 caracteres")
    .max(50, "El apellido debe ser de menos de 50 caracteres"),
});

export const updateUserSchema = userSchema
  .partial()
  .extend({
    id: z.string().uuid({ message: "El ID es obligatorio para actualizar" }),
    password: z
      .string()
      .min(6, "La contraseña debe ser de al menos 6 caracteres")
      .max(15, "La contraseña debe ser de menos de 15 caracteres")
      .optional()
      .or(z.literal("")), // Allows empty string as valid input
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type UserType = TypeOf<typeof userSchema>;
export type UpdateUserType = TypeOf<typeof updateUserSchema>;
