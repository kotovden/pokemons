import axios from 'axios';

const API = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});
API.interceptors.response.use(
  (response: any) => response,
  (error: any) => Promise.reject(error),
);

export default API;
