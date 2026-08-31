import axios from "axios";

const BASE_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://food-server-sigma-five.vercel.app";

const instanceAxios = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

export default instanceAxios;
