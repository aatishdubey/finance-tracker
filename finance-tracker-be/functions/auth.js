const admin = require("../firebase");

// Verify the authentication token
function authenticateToken(req, res, next) {
  const authToken = req.headers.authorization.split('Bearer ')[1];

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(authToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Unauthorized" });
    });
}

module.exports = authenticateToken;
