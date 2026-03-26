import axios from 'axios';

export const userApi = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 10000,
});

export const doctorApi = axios.create({
  baseURL: 'http://localhost:5002/api',
  timeout: 10000,
});

export const appointmentApi = axios.create({
  baseURL: 'http://localhost:5003/api',
  timeout: 10000,
});