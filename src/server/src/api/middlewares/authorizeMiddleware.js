/**
 * @file authorizeMiddleware.js
 * @description Middleware for verifying JWT authentication tokens and attaching user data to the request object.
 * @author @Tarak1246
 * @date March 13, 2024
 */

const jwtUtils = require("../../utils/jwtUtils");

/**
 * Authenticates a request using a provided JWT token.
 * @param {express.Request} req The incoming request object.
 * @param {express.Response} res The outgoing response object.
 * @param {Function} next The next middleware function in the chain.
 * @returns {Promise<void>} Resolves if authentication is successful or rejects with an error.
 * @throws {Error} If there's an error retrieving user data from the service.
 */
const authorizeMiddleware = async (req, res, next) => {
  // Extract token from Authorization header, handling optional chaining
  const token = req.headers.authorization?.split(" ")[1];
  //check token exist or not
  if (!token) {
    res.status(401).json({ data: "Unauthorized" });
  }
  // Create a new Promise to handle JWT verification
  try {
    // Verify the token using jwtUtils.verifyToken
    const decoded = await jwtUtils.verifyToken(token);

    // Log successful verification
    console.log("Token verification successful");

    // Attach decoded user data to request object
    req.user = decoded.user;

    // Continue middleware chain if verification succeeds
    next();
  } catch (error) {
    // Handle errors during verification
    console.error("Error verifying token:", error);

    if (error.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ status: 401, data: "Session expired! Login again" });
    } else {
      res.status(401).json({ status: 401, data: "Invalid token" });
    }
  }
};

module.exports = authorizeMiddleware;
