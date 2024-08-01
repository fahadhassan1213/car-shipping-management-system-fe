export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
export enum ShippingStatus {
  PENDING = "PENDING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
}

export type User = {
  id: number;
  email: string;
  name: string;
  roles: {
    role: {
      name: UserRole;
    };
  }[];
};

export type UserIdentity = {
  access_token?: string;
  user: User;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type Pagination = {
  page: number;
  limit: number;
};

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  createdAt: string;
};

export type CarsResponse = {
  data: Car[];
  total: number;
  page: number;
  limit: number;
};

export type Shipment = {
  id: string;
  carId: string;
  userId: number;
  pickupLocation: string;
  deliveryLocation: string;
  shippingDate: string;
  specialInstructions: string;
  status: ShippingStatus;
  createdAt: string;
  user: User;
};

export type ShipmentResponse = {
  data: Shipment[];
  total: number;
  page: number;
  limit: number;
};
