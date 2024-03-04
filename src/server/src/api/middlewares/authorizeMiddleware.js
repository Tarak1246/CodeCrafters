const jwtUtils = require("../../utils/jwtUtils");

const authorizeMiddleware = async (req, res, next) => {
  // const token = req.header('Authorization');
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from request header

  console.log("tokennnnnnn", token);
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
      res.status(401).json({ status: 401, data: "Session expired! Login again" });
    } else {
      res.status(401).json({ status: 401, data: "Invalid token" });
    }
  }
};

module.exports = authorizeMiddleware;
