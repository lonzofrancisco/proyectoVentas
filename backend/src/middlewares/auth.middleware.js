const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // userId, businessId, role, businessName, businessSlug
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Middleware para verificar que el usuario sea owner
const requireOwner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: "Acceso denegado. Solo owners pueden acceder." });
  }
  next();
};

module.exports.requireOwner = requireOwner;