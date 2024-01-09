const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { User } = require("../models");
// const ROLES = require("../config/roles.js");

// const User = db.user;
// const Role = db.role;

// * Verify Token

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.user = decoded;
    next();
  });
};

// * Check Role

const checkRole = (roleName) => {
  return (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      
      // Role.find(
      //   {
      //     _id: user.role,
      //   },
      //   (err, roles) => {
      //     if (err) {
      //       return res.status(500).json({ message: err });
      //     }

      //     const hasRole = roles.some((role) => role.name === roleName);
          if (user.role === roleName) {
            next();
          } else {
            res.status(403).json({ message: `Require ${roleName} Role!` });
          }
      //   }
      // );
    });
  };
};

const authJwt = {
  verifyToken,
  // isAdmin: checkRole("admin"),
  // isCompany: checkRole("company"),
  // isEmployee: checkRole("employee"),
  isAdmin: checkRole("ADMIN"),
  isCompany: checkRole("COMPANY"),
  isEmployee: checkRole("EMPLOYEE"),
};

module.exports = authJwt;
