import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true, // Inclure les cookies dans les requêtes
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default AxiosInstance;
