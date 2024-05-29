import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_URL;
export const baseApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
