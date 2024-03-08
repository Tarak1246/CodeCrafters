// api.js
import axios from 'axios';
import authInterceptor from './interceptor';

axios.interceptors.request.use(authInterceptor);

const BASE_URL = 'http://localhost:3001';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v/getUsers`);
    return response.data;
  } catch (error) {
    throw new Error(`Error user login: ${error.message}`);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/v1/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error user login: ${error.message}`);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/v/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error user register: ${error.message}`);
  }
};

export const getDashboardData = async () => {
  try {
    const response = await axios.get(`/v2/getDashboardData`);
    return response.data;
  } catch (error) {
    throw new Error(`Error user register: ${error.message}`);
  }
};

export const getLoggedinUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/v2/getLoggedinUserData/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error user register: ${error.message}`);
  }
};

export const updateUserData = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/v2/updateUserData`,data);
    return response.data;
  } catch (error) {
    throw new Error(`Error user edit: ${error.message}`);
  }
};

export const updateUserPrivileges = async (id,data) => {
  try {
    const response = await axios.put(`${BASE_URL}/v2/updateUserPrivileges/${id}`,data);
    return response.data;
  } catch (error) {
    throw new Error(`Error user edit: ${error.message}`);
  }
};

//add all api services here only