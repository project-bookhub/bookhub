const userService = require("./userService");

exports.getSignUp = (req, res) => {
  res.render("signup");
};

exports.postSignUp = async (req, res, next) => {
  try {
    const data = req.body;

    await userService.postSignUp(data);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await userService.postLogin(data);

    if (!result.isLogin) return res.redirect("/");

    res.cookie(
      "authorization",
      result.data,
      (maxAge = 60 * 10),
      (domain = "127.0.0.1"),
      (path = "/"),
    );
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};
