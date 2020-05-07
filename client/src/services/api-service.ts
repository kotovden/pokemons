import axios from 'axios';

const API = axios.create({
    baseURL: `https://pokeapi.co/api/v2/`
});
API.interceptors.response.use(function (response:any) {
    return response;
}, function (error:any) {
    return Promise.reject(error);
});

export default API