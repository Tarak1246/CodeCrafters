/**
 * @module interceptor
 * @description This module defines an authentication interceptor for Axios API requests.
 * @author @Tarak1246
 */

/**
 * @function authInterceptor
 * @description Interceptor function for Axios requests.
 * @param {object} config - The Axios request configuration object.
 * @returns {object} The modified request configuration object with added authentication headers, if applicable.
 */
const authInterceptor = (config) => {
  /**
   * Retrieve the stored JWT token from local storage.
   * @note Adjust the token storage mechanism as needed.
   */
  const token = localStorage.getItem('jwtToken');

  // Attach the token to the Authorization header if available
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export default authInterceptor;