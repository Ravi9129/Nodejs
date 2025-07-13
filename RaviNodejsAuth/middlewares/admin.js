const errorHandler = require('../utils/errorHandler');

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