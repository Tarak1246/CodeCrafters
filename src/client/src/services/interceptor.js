// Interceptor file
const authInterceptor = config => {
  const token = localStorage.getItem('jwtToken'); // Replace with your token storage mechanism
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export default authInterceptor;