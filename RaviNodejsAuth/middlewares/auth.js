const jwt = require('jsonwebtoken');
const config = require('../config/config');
const errorHandler = require('../utils/errorHandler');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(errorHandler(401, 'Not authorized to access this route'));
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return next(errorHandler(401, 'Not authorized to access this route'));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        errorHandler(403, `User role ${req.user.role} is not authorized to access this route`)
      );
    }
    next();
  };
};