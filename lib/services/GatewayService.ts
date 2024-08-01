import {
  CarsResponse,
  LoginPayload,
  Pagination,
  ShipmentResponse,
  UserIdentity,
} from "../types/common";
import instance from "./base";

class GatewayService {
  public async login(loginPayload: LoginPayload): Promise<UserIdentity> {
    try {
      const { data } = await instance.post(`/auth/user/login`, loginPayload);
      return data;
    } catch (error) {
      console.error("[login] Error", error);
      throw new Error(`[login] Error while logging in`);
    }
  }

  public async getCars(pagination: Pagination): Promise<CarsResponse> {
    try {
      const { page, limit } = pagination;
      const { data } = await instance.get(`/cars?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      console.error("[getCars] Error", error);
      throw new Error(`[getCars] Error while fetching cars`);
    }
  }

  public async getBookings(pagination: Pagination): Promise<ShipmentResponse> {
    try {
      const { page, limit } = pagination;
      const { data } = await instance.get(
        `/shipments?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      console.error("[getBookings] Error", error);
      throw new Error(`[getBookings] Error while fetching shipments`);
    }
  }
}

const gatewayService = new GatewayService();

export default gatewayService;
