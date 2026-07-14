const jwt = require('jsonwebtoken');

const protect = (roles = []) => {
  return (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        // Decodes token to get id, role, etc.
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = decoded;

        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access denied: Unauthorized role' });
        }

        return next();
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Not authorized, token invalid' });
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
};

module.exports = { protect };
