const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token stored in cookies and attach authenticated user context to request
 */
const authMiddleware = (req, res, next) => {
  // Extract token from request cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  try {
    // Verify JWT signature using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user payload to request object
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;

