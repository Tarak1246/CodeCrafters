// Interceptor file
import axios from 'axios';

function setupInterceptors(isLoggedIn,token) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });

  // function checkToken() {
  //   const token = document.cookie.split(';').find(c => c.startsWith('jwt='));
  //   console.log("tokennnnnnnnnnnn",token)
  //   return token;
  // }

  // Request interceptor with access to isLoggedIn
  instance.interceptors.request.use(
    (config) => {
      const token1 = token;
      if (token1 && isLoggedIn) { // Use isLoggedIn here
        config.headers.Authorization = `Bearer ${token1}`;
      }
      console.log(config)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance; // Return the instance for use in components
}

export default setupInterceptors;