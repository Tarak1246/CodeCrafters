// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

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

export const getContracts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v2/getContracts`);
    return response.data;
  } catch (error) {
    throw new Error(`Error user register: ${error.message}`);
  }
};

//add all api services here only