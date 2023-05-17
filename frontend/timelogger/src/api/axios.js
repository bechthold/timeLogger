import axios from "axios";
import { getItem } from "@/helpers/persistanceStorage";

axios.defaults.baseURL = "http://192.168.0.9:3000";

axios.interceptors.request.use((config) => {
  const token = getItem("accessToken");
  const authorizisationToken = token ? `Token ${token}` : "";
  config.headers.Authorization = authorizisationToken;
  return config;
});

export default axios;
