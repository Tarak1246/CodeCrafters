const pino = require('pino');

const loggingMiddleware = (req, res, next) => {
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii")
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // // Create a writable stream to the log file
  // const logFile = fs.createWriteStream('../../../logs/logfile.log', { flags: 'a' });

  // // Create a pino logger with the writable stream as a destination
  // const logger = pino({ level: 'info' }, logFile);
  // // Log the response
  // logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

module.exports = loggingMiddleware;
