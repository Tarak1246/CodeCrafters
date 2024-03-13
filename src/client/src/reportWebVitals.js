/**
 * Reports web vitals metrics using the `onPerfEntry` function (if provided).
 * 
 * This function is intended to be used with the `reportWebVitals` function from React Testing Library.
 * 
 * @param {Function} onPerfEntry - A callback function provided by the test runner to handle performance entries.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    /**
     * Asynchronously imports the web-vitals library to avoid unnecessary bundle size.
     */
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      /**
       * Calls web-vitals metrics measurement functions and passes the `onPerfEntry` callback.
       */
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
