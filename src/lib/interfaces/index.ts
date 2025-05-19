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
