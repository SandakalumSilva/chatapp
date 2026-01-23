import axios from 'axios';
import axios from './../../node_modules/axios/lib/axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api/" : "/api/",
  withCredentials: true,
});