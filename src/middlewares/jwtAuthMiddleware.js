const JWT = require("../lib/jwt");
const jwt = new JWT();

const userService = require("../user/userService");

require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const { authorization } = req.cookies;

    if (!authorization) return next();

    const payload = jwt.verify(authorization, process.env["secret-key"]);

    const user = await userService.findOneByUserId(payload.userId);
    user["user_pw"] = null;

    req.user = user;

    next();
  } catch (e) {
    res.clearCookie("authorization");
    next("4444");
  }
};
