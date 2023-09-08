import axios from "axios";
import { BASE_API_URL } from "../config/apiRoutes";

export function getAPIClient(baseURL?: string) {
  const api = axios.create({ baseURL: baseURL ?? BASE_API_URL });

  api.interceptors.request.use((config) => {
    return config;
  });

  return api;
}