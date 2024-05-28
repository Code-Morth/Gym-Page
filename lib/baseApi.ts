import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const baseApi = axios.create({
  baseURL,
});
