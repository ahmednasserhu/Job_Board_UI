import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8002/api/",
});

export default axiosInstance;
