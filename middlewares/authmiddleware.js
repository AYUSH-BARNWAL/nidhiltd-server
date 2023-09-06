const jwt = require("jsonwebtoken");
const JWT_SECRET = "nidhil";

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1] ||
      req.cookies.token ||
      req.body.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = await jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      if (decoded.exp * 1000 <= Date.now()) {
        // Token is expired
        console.error("Token is expired");
        return res.status(401).json({ message: "Token expired" });
      }
      req.user = decoded; // Attach user data to the request
      console.log("token verified: ", decoded);
      next();
    } catch (error) {
      console.error("Token Verification Error:", error);
      res.status(401).json({
        message: "Invalid token",
        error: error,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = authenticate;
