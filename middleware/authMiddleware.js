const jwt = require("jsonwebtoken");
const User = require("../model/User");
const UnauthenticatedError = require("../errors/unauthenticated");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        // console.log(decoded);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkuser = (req, res, next) => {
  // const token = req.cookies.jwt;
  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   if (!payload) {
  //     res.redirect("/login");
  //   }
  //   req.user = { userID: payload.userID, email: payload.email };
  //   next();
  // } catch (error) {
  //   console.log(error);
  //   throw new UnauthenticatedError("Authentication Error");
  // }

  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        // console.log(decoded, "decodedsss");
        let user = await User.findById(decoded.userID);
        // console.log(user, "userrrr");
        req.user = { userID: user._id };
        // console.log(users, "userssss");
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkuser };
