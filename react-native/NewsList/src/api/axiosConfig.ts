import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = '7e01de3bf9cb480e9ba924c07ef0a9c1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: API_KEY,
  },
});

export default api;
