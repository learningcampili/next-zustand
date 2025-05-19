export interface Country {
  id: string;
  code: string;
  name: string;
  phoneCode: string;
  active: string;
}

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
