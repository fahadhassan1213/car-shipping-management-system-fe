import axios from "axios";
import { getAccessToken } from "../helpers/getUserIdentity";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const updatedConfig = config;
    const token = getAccessToken();
    if (token) {
      updatedConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    return updatedConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const rawMessage =
      (error.response &&
        error.response.data &&
        (error.response.data.message ||
          error.response.data.title ||
          error.response.data)) ||
      "something_went_wrong";

    let message =
      typeof rawMessage === "string" ? rawMessage : rawMessage.Message;

    if (message !== "something_went_wrong") {
      const splitMessage = message.split(";");
      if (splitMessage.length > 1) {
        message = splitMessage[0];
      }
    }

    const errorObj = {
      message: message,
      status: (error.response && error.response.status) || 500,
    };

    return Promise.reject(errorObj);
  }
);

export default instance;
