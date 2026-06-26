import axios from "axios";

const API = axios.create({
  baseURL: "${import.meta.env.VITE_API_URL}/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProducts = () => API.get("/products");
export const createOrder = (data) => API.post("/orders", data);
export const getUserOrders = (userId) => API.get(`/orders/${userId}`);
