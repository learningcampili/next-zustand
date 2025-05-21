export interface Address {
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  floor?: string | null;
  apartment?: string | null;
  postalCode: string;
  cityName: string;
  countryId: string;
  // countryName: string;
  areaCode: string;
  phone: string;
  rememberAddress?: boolean;
}

export interface OrdersAddress {
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  floor?: string | null;
  apartment?: string | null;
  postalCode: string;
  cityName: string;
  countryId: string;
  // countryName: string;
  areaCode: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  type: string;
  imageUrl: null;
  isDeleted: boolean;
  isActive: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

export interface BillingAddress {
  firstName: string; // Prisma: @map("name")
  lastName: string; // Prisma: @map("surname")
  streetName: string; // Prisma: @map("street_name")
  streetNumber: number; // Prisma: @map("street_number")
  floor?: number;
  apartment?: string;
  postalCode: string; // Prisma: @map("zip_code")
  cityName: string; // Prisma: @map("city_name")
  countryId: string;
  areaCode: string; // Prisma: @map("area_code")
  phone: number;
}

export interface Country {
  id: string;
  code: string;
  name: string;
  phoneCode: string;
  active: boolean;
}
