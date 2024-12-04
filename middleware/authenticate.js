const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
      const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
      req.user = decoded;
      next();
  } catch (err) {
      console.error("Authentication error:", err.message);
      res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = authenticate;